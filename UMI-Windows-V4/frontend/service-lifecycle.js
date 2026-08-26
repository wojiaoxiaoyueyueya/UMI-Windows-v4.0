// service-lifecycle.js - 网页与本地后台的生命周期联动
// 最后一个平台页面关闭后释放客户端租约，让后台安全关闭设备并退出进程。
(function() {
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;

    var clientId = '';
    var heartbeatTimer = null;
    var released = false;
    var body = '';

    function createClientId() {
        clientId = 'page-' + Date.now().toString(36) + '-'
            + Math.random().toString(36).slice(2) + '-'
            + Math.random().toString(36).slice(2);
        body = JSON.stringify({ clientId: clientId });
    }

    function sendHeartbeat() {
        released = false;
        fetch('/api/system/client/heartbeat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            cache: 'no-store',
            keepalive: true
        }).catch(function() {
            // 主页面已有统一的服务连接状态提示，这里避免重复弹窗。
        });
    }

    function releaseClient() {
        if (released) return;
        released = true;
        if (heartbeatTimer) {
            window.clearInterval(heartbeatTimer);
            heartbeatTimer = null;
        }
        if (navigator.sendBeacon && navigator.sendBeacon(
                '/api/system/client/release',
                new Blob([body], { type: 'application/json' })
            )) {
            return;
        }
        fetch('/api/system/client/release', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            keepalive: true
        }).catch(function() {});
    }

    createClientId();
    sendHeartbeat();
    heartbeatTimer = window.setInterval(sendHeartbeat, 5000);

    // pagehide 同时覆盖关闭标签页、关闭浏览器、刷新和站内跳转。
    // 后端保留短暂宽限期，因此刷新或切换平台页面不会误关服务。
    window.addEventListener('pagehide', releaseClient);
    // 某些 Chromium 壳在关闭最后一个窗口时不会可靠触发 pagehide，
    // beforeunload 作为补充；releaseClient 本身是幂等的，不会重复释放。
    window.addEventListener('beforeunload', releaseClient);
    window.addEventListener('pageshow', function() {
        if (released) {
            createClientId();
            sendHeartbeat();
            heartbeatTimer = window.setInterval(sendHeartbeat, 5000);
        }
    });
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) sendHeartbeat();
    });

    window.addEventListener('unload', releaseClient);
})();
