import * as THREE from './lib/three/three.module.min.js';
import { OrbitControls } from './lib/three/addons/controls/OrbitControls.js';
import { GLTFLoader } from './lib/three/addons/loaders/GLTFLoader.js';

const COLORS = {
    left: new THREE.Color(0x2563eb),
    right: new THREE.Color(0xef6c4d)
};
const START_OFFSETS = {
    left: new THREE.Vector3(-0.11, 0, 0),
    right: new THREE.Vector3(0.11, 0, 0)
};
const MODEL_MAX_SIZE_M = 0.09;
// STEP 几何的两侧夹指初始间距约 107.8 mm，每侧移动 53.5 mm 后机械端面闭合。
const MODEL_JAW_TRAVEL = 53.5;
const FALLBACK_JAW_TRAVEL_M = 0.062;
const JAW_NODES = {
    negative: ['NAUO7', 'NAUO8', 'NAUO9', 'NAUO22', 'NAUO23'],
    positive: ['NAUO4', 'NAUO5', 'NAUO10', 'NAUO16', 'NAUO21']
};
const DEMO_MODE = new URLSearchParams(window.location.search).get('poseDemo') === '1';

let active = false;
let initialized = false;
let pollTimer = null;
let animationFrame = 0;
let renderer = null;
let scene = null;
let camera = null;
let controls = null;
let grid = null;
let resizeObserver = null;
let modelTemplate = null;
let modelLoadPromise = null;
let trailLimit = 600;
let showModels = true;
let showPointCloud = false;
let positionDisplayScale = 3;
let previousConnectedCount = 0;

const handViews = {
    left: createHandView('left'),
    right: createHandView('right')
};

function createHandView(side) {
    return {
        side,
        anchor: null,
        modelRoot: null,
        cameraRig: null,
        cameraHousing: null,
        cameraFrustum: null,
        visualPoints: null,
        jawNodes: [],
        trail: [],
        trailLine: null,
        lastSample: 0,
        lastTrailTime: 0,
        connected: false,
        valid: false,
        closure: 0,
        targetPosition: START_OFFSETS[side].clone(),
        targetQuaternion: new THREE.Quaternion(),
        poseInitialized: false
    };
}

function byId(id) {
    return document.getElementById(id);
}

function initScene() {
    if (initialized) return;
    const viewport = byId('trajectoryViewport');
    if (!viewport) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fa);
    scene.fog = new THREE.Fog(0xf5f7fa, 2.8, 7.5);

    camera = new THREE.PerspectiveCamera(42, 1, 0.01, 20);
    camera.position.set(0.88, 0.56, 1.02);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute('aria-label', '左右手夹爪三维位姿轨迹');
    viewport.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.screenSpacePanning = true;
    controls.minDistance = 0.08;
    controls.maxDistance = 5;
    controls.target.set(0, 0.03, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x718096, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(1.8, 2.4, 1.4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xbfd7ff, 1.2);
    fillLight.position.set(-1.8, 0.7, -1.2);
    scene.add(fillLight);

    grid = new THREE.GridHelper(3.2, 32, 0x9aa7b5, 0xd8dee7);
    grid.position.y = -0.18;
    grid.material.opacity = 0.58;
    grid.material.transparent = true;
    scene.add(grid);

    const axes = new THREE.AxesHelper(0.22);
    axes.position.set(0, -0.175, 0);
    scene.add(axes);

    ['left', 'right'].forEach(function(side) {
        const view = handViews[side];
        view.anchor = new THREE.Group();
        view.anchor.visible = false;
        scene.add(view.anchor);
        installCameraRig(view);

        const geometry = new THREE.BufferGeometry().setFromPoints([START_OFFSETS[side].clone()]);
        const material = new THREE.LineBasicMaterial({
            color: COLORS[side],
            transparent: true,
            opacity: 0.95,
            depthTest: false,
            depthWrite: false
        });
        view.trailLine = new THREE.Line(geometry, material);
        view.trailLine.frustumCulled = false;
        view.trailLine.renderOrder = 50;
        view.trailLine.visible = false;
        scene.add(view.trailLine);
    });

    resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(viewport);
    bindControls();
    loadModel();
    resizeRenderer();
    initialized = true;
}

function bindControls() {
    const trailSlider = byId('trajectoryTrailLength');
    const trailValue = byId('trajectoryTrailLengthValue');
    if (trailSlider) {
        trailSlider.addEventListener('input', function() {
            trailLimit = Math.max(100, Number(this.value) || 600);
            if (trailValue) trailValue.textContent = String(trailLimit);
            trimTrails();
        });
    }
    const positionScaleSlider = byId('trajectoryPositionScale');
    const positionScaleValue = byId('trajectoryPositionScaleValue');
    if (positionScaleSlider) {
        positionScaleSlider.addEventListener('input', function() {
            positionDisplayScale = THREE.MathUtils.clamp(Number(this.value) || 3, 1, 8);
            if (positionScaleValue) positionScaleValue.textContent = formatScale(positionDisplayScale);
            clearTrails();
            window.setTimeout(fitView, 40);
        });
    }
    const gridToggle = byId('trajectoryGridToggle');
    if (gridToggle) gridToggle.addEventListener('change', function() {
        if (grid) grid.visible = this.checked;
    });
    const modelToggle = byId('trajectoryModelToggle');
    if (modelToggle) modelToggle.addEventListener('change', function() {
        showModels = this.checked;
        ['left', 'right'].forEach(function(side) {
            refreshHandVisibility(handViews[side]);
        });
    });
    const pointCloudToggle = byId('trajectoryPointCloudToggle');
    if (pointCloudToggle) pointCloudToggle.addEventListener('change', function() {
        showPointCloud = this.checked;
        ['left', 'right'].forEach(function(side) {
            refreshHandVisibility(handViews[side]);
        });
        window.setTimeout(fitView, 40);
    });
    const fitButton = byId('trajectoryFitBtn');
    if (fitButton) fitButton.addEventListener('click', fitView);
    const resetButton = byId('trajectoryResetBtn');
    if (resetButton) resetButton.addEventListener('click', resetTrajectory);
}

function installCameraRig(view) {
    if (!view.anchor || view.cameraRig) return;
    const rig = new THREE.Group();
    // CAD 导出的 GLB 缺少鱼眼相机节点，因此在夹爪顶部补一个随位姿同步的相机组件。
    rig.position.set(0, 0.038, 0.026);

    const housing = new THREE.Group();
    const shell = new THREE.Mesh(
        new THREE.BoxGeometry(0.032, 0.022, 0.026),
        new THREE.MeshStandardMaterial({ color: 0x222a35, metalness: 0.28, roughness: 0.52 })
    );
    shell.castShadow = true;
    housing.add(shell);
    const lens = new THREE.Mesh(
        new THREE.SphereGeometry(0.009, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.62),
        new THREE.MeshStandardMaterial({ color: 0x101827, metalness: 0.5, roughness: 0.2 })
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.016;
    housing.add(lens);
    rig.add(housing);

    const nearZ = 0.035;
    const farZ = 0.40;
    const nearX = 0.018;
    const nearY = 0.011;
    const farX = 0.20;
    const farY = 0.12;
    const corners = [
        new THREE.Vector3(-nearX, -nearY, nearZ),
        new THREE.Vector3(nearX, -nearY, nearZ),
        new THREE.Vector3(nearX, nearY, nearZ),
        new THREE.Vector3(-nearX, nearY, nearZ),
        new THREE.Vector3(-farX, -farY, farZ),
        new THREE.Vector3(farX, -farY, farZ),
        new THREE.Vector3(farX, farY, farZ),
        new THREE.Vector3(-farX, farY, farZ)
    ];
    const linePoints = [];
    [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4],
     [0, 4], [1, 5], [2, 6], [3, 7]].forEach(function(pair) {
        linePoints.push(corners[pair[0]], corners[pair[1]]);
    });
    const frustum = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(linePoints),
        new THREE.LineBasicMaterial({ color: COLORS[view.side], transparent: true, opacity: 0.26 })
    );
    frustum.visible = false;
    rig.add(frustum);

    const points = new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({
            color: COLORS[view.side],
            size: 0.006,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.92,
            depthWrite: false
        })
    );
    points.visible = false;
    points.frustumCulled = false;
    rig.add(points);

    view.anchor.add(rig);
    view.cameraRig = rig;
    view.cameraHousing = housing;
    view.cameraFrustum = frustum;
    view.visualPoints = points;
}

function resizeRenderer() {
    const viewport = byId('trajectoryViewport');
    if (!renderer || !camera || !viewport) return;
    const width = Math.max(1, viewport.clientWidth);
    const height = Math.max(1, viewport.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function loadModel() {
    if (modelLoadPromise) return modelLoadPromise;
    modelLoadPromise = new Promise(function(resolve) {
        new GLTFLoader().load('/assets/models/umi-gripper.glb', function(gltf) {
            modelTemplate = gltf.scene;
            ['left', 'right'].forEach(installHandModel);
            resolve(true);
        }, undefined, function(error) {
            console.error('[空间位姿] 夹爪模型加载失败', error);
            ['left', 'right'].forEach(installFallbackModel);
            resolve(false);
        });
    });
    return modelLoadPromise;
}

function installHandModel(side) {
    const view = handViews[side];
    if (!view.anchor || !modelTemplate || view.modelRoot) return;

    const normalizer = new THREE.Group();
    const model = modelTemplate.clone(true);
    const materialMap = new Map();
    model.traverse(function(object) {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const sourceMaterials = Array.isArray(object.material) ? object.material : [object.material];
        const cloned = sourceMaterials.map(function(material) {
            if (!materialMap.has(material.uuid)) {
                const copy = material.clone();
                if (copy.color) copy.color.lerp(COLORS[side], 0.16);
                if ('metalness' in copy) copy.metalness = Math.max(0.25, copy.metalness || 0);
                if ('roughness' in copy) copy.roughness = Math.max(0.35, copy.roughness || 0.5);
                materialMap.set(material.uuid, copy);
            }
            return materialMap.get(material.uuid);
        });
        object.material = Array.isArray(object.material) ? cloned : cloned[0];
    });

    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z, 1);
    model.position.sub(center);
    normalizer.scale.setScalar(MODEL_MAX_SIZE_M / maxDimension);
    normalizer.add(model);
    view.anchor.add(normalizer);
    view.modelRoot = normalizer;

    JAW_NODES.negative.forEach(function(name) { registerJawNode(view, model, name, 1); });
    JAW_NODES.positive.forEach(function(name) { registerJawNode(view, model, name, -1); });
    colorJawNodes(view, COLORS[side]);
    setJawClosure(view, view.closure);
}

function registerJawNode(view, model, name, direction) {
    const node = model.getObjectByName(name);
    if (!node) return;
    view.jawNodes.push({ node, baseX: node.position.x, direction });
}

function colorJawNodes(view, color) {
    view.jawNodes.forEach(function(entry) {
        entry.node.traverse(function(object) {
            if (!object.isMesh) return;
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(function(material) {
                if (material.color) material.color.lerp(color, 0.58);
            });
        });
    });
}

function installFallbackModel(side) {
    const view = handViews[side];
    if (!view.anchor || view.modelRoot) return;
    const group = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x4b5563, metalness: 0.35, roughness: 0.5 });
    const jawMaterial = new THREE.MeshStandardMaterial({ color: COLORS[side], metalness: 0.25, roughness: 0.45 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.17, 0.065), bodyMaterial);
    body.position.y = -0.07;
    group.add(body);
    [-1, 1].forEach(function(direction) {
        const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.105, 0.035), jawMaterial);
        jaw.position.set(direction * 0.075, 0.055, 0);
        group.add(jaw);
        view.jawNodes.push({ node: jaw, baseX: jaw.position.x, direction: -direction, fallback: true });
    });
    view.anchor.add(group);
    view.modelRoot = group;
    setJawClosure(view, view.closure);
}

function setJawClosure(view, closure) {
    const rawClosure = THREE.MathUtils.clamp(Number(closure) || 0, 0, 1);
    // 新版磁编码在机械端点通常保留约 2%~6% 余量，将有效区间映射到完整行程。
    view.closure = THREE.MathUtils.clamp((rawClosure - 0.02) / 0.92, 0, 1);
    view.jawNodes.forEach(function(entry) {
        const travel = entry.fallback ? FALLBACK_JAW_TRAVEL_M : MODEL_JAW_TRAVEL;
        entry.node.position.x = entry.baseX + entry.direction * travel * view.closure;
    });
}

function fitView() {
    if (!camera || !controls) return;
    const bounds = new THREE.Box3();
    let hasContent = false;
    ['left', 'right'].forEach(function(side) {
        const view = handViews[side];
        if (!view.connected || !view.valid || !view.anchor) return;
        bounds.expandByPoint(view.anchor.position);
        view.trail.forEach(function(point) { bounds.expandByPoint(point); });
        if (showModels && view.modelRoot) bounds.expandByObject(view.modelRoot);
        if (showPointCloud && view.visualPoints && view.visualPoints.visible) {
            bounds.expandByObject(view.visualPoints);
        }
        hasContent = true;
    });

    if (!hasContent || bounds.isEmpty()) {
        bounds.set(
            new THREE.Vector3(-0.24, -0.12, -0.18),
            new THREE.Vector3(0.24, 0.18, 0.18)
        );
    }
    bounds.expandByScalar(0.035);

    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * Math.max(camera.aspect, 0.1));
    const fitHeightDistance = size.y / (2 * Math.tan(verticalFov / 2));
    const fitWidthDistance = size.x / (2 * Math.tan(horizontalFov / 2));
    const distance = Math.max(fitHeightDistance, fitWidthDistance, 0.16) + size.z * 0.65;
    const direction = camera.position.clone().sub(controls.target);
    if (direction.lengthSq() < 0.000001) direction.set(0.75, 0.48, 1);
    direction.normalize();

    controls.target.copy(center);
    camera.position.copy(center).add(direction.multiplyScalar(distance * 1.18));
    camera.near = Math.max(0.002, distance / 100);
    camera.far = Math.max(10, distance * 20);
    camera.updateProjectionMatrix();
    controls.update();
}

function resetTrajectory() {
    clearTrails();
    fetch('/api/hand-poses/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ side: 'all' })
    }).catch(function() {});
}

function clearTrails() {
    ['left', 'right'].forEach(function(side) {
        const view = handViews[side];
        view.trail = [];
        view.lastSample = 0;
        view.lastTrailTime = 0;
        updateTrailGeometry(view);
    });
}

function trimTrails() {
    ['left', 'right'].forEach(function(side) {
        const view = handViews[side];
        if (view.trail.length > trailLimit) view.trail.splice(0, view.trail.length - trailLimit);
        updateTrailGeometry(view);
    });
}

async function pollPoses() {
    if (!active) return;
    if (DEMO_MODE) {
        updateFromPayload(createDemoPayload());
        return;
    }
    try {
        const response = await fetch('/api/hand-poses', { cache: 'no-store' });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        updateFromPayload(data);
    } catch (error) {
        updateOverall(false, '服务未连接');
    }
}

// 仅在地址带 ?poseDemo=1 时启用，便于无硬件电脑检查三维模型、轨迹和闭合动画。
function createDemoPayload() {
    const seconds = performance.now() / 1000;
    function hand(phase) {
        const yaw = Math.sin(seconds * 0.55 + phase) * 0.35;
        const halfYaw = yaw * 0.5;
        return {
            connected: true,
            cameraConnected: true,
            hasImu: true,
            hasVisual: true,
            valid: true,
            timestampUs: Math.round(performance.now() * 1000),
            sampleCount: Math.round(performance.now()),
            position: [
                Math.sin(seconds * 0.7 + phase) * 0.11,
                0.05 + Math.sin(seconds * 0.9 + phase) * 0.035,
                Math.cos(seconds * 0.7 + phase) * 0.09
            ],
            quaternion: [0, Math.sin(halfYaw), 0, Math.cos(halfYaw)],
            euler: [0, yaw * 180 / Math.PI, 0],
            closure: (Math.sin(seconds * 1.3 + phase) + 1) * 0.5,
            quality: 0.91,
            visualFeatures: 126,
            visualPointCloud: Array.from({ length: 72 }, function(_, index) {
                const depth = 0.10 + (index % 18) / 17 * 0.30;
                const angle = index * 2.399963;
                return [Math.cos(angle) * depth * 0.32, Math.sin(angle) * depth * 0.20, depth];
            }),
            stationary: false,
            originRelocalized: false,
            mode: 'visual_imu'
        };
    }
    return {
        enabled: true,
        cooperative: { available: true, active: false, mode: 'dual_hand_zupt' },
        hands: { left: hand(0), right: hand(Math.PI) }
    };
}

function updateFromPayload(payload) {
    const hands = payload && payload.hands ? payload.hands : {};
    const left = hands.left || {};
    const right = hands.right || {};
    updateHand('left', left);
    updateHand('right', right);
    const count = Number(Boolean(left.connected)) + Number(Boolean(right.connected));
    updateOverall(count > 0, count > 0 ? ('跟踪中 · ' + count + ' 个夹爪') : '等待设备');
    const cooperative = payload && payload.cooperative ? payload.cooperative : {};
    setText(
        'trajectoryCooperativeState',
        cooperative.active ? '协同稳态' : (cooperative.available ? '双手就绪' : '等待双手')
    );
    const frameLabel = byId('trajectoryFrameLabel');
    if (frameLabel) frameLabel.textContent = count > 0 ? '各手相对于本次启动或重置位置' : '等待跟踪数据';
    const empty = byId('trajectoryEmpty');
    if (empty) empty.classList.toggle('hidden', Boolean(left.connected || right.connected));
    if (count > 0 && previousConnectedCount === 0) {
        loadModel().then(function() { window.setTimeout(fitView, 60); });
    }
    previousConnectedCount = count;
}

function updateHand(side, pose) {
    const view = handViews[side];
    const connected = Boolean(pose.connected);
    const valid = connected && Boolean(pose.valid);
    view.connected = connected;
    view.valid = valid;

    const prefix = side === 'left' ? 'trajectoryLeft' : 'trajectoryRight';
    setText(prefix + 'Mode', modeLabel(pose.mode, connected));
    setText(prefix + 'Camera', connected ? (pose.cameraConnected ? '在线' : '未接入') : '--');
    setText(prefix + 'Imu', connected ? (pose.hasImu ? '在线' : '等待') : '--');
    setText(prefix + 'Features', connected ? String(Number(pose.visualFeatures) || 0) : '--');
    setText(prefix + 'Quality', connected ? Math.round((Number(pose.quality) || 0) * 100) + '%' : '--');
    setText(prefix + 'Badge', connected ? (side === 'left' ? '左手 ' : '右手 ') + modeLabel(pose.mode, true) : (side === 'left' ? '左手未接入' : '右手未接入'));

    const status = byId(prefix + 'Status');
    if (status) status.classList.toggle('disconnected', !connected);
    const badge = byId(prefix + 'Badge');
    if (badge) badge.classList.toggle('online', connected);
    const readout = byId(prefix + 'Readout');
    if (readout) readout.classList.toggle('hidden', !connected);

    if (!view.anchor) return;
    if (!valid) {
        refreshHandVisibility(view);
        view.poseInitialized = false;
        if (view.trailLine) view.trailLine.visible = false;
        return;
    }

    const position = new THREE.Vector3(
        finiteNumber(pose.position && pose.position[0]),
        finiteNumber(pose.position && pose.position[1]),
        finiteNumber(pose.position && pose.position[2])
    );
    const worldPosition = START_OFFSETS[side].clone().addScaledVector(position, positionDisplayScale);
    view.targetPosition.copy(worldPosition);

    const q = pose.quaternion || [0, 0, 0, 1];
    view.targetQuaternion.set(
        finiteNumber(q[0]), finiteNumber(q[1]), finiteNumber(q[2]), finiteNumber(q[3], 1)
    ).normalize();
    if (!view.poseInitialized) {
        view.anchor.position.copy(view.targetPosition);
        view.anchor.quaternion.copy(view.targetQuaternion);
        view.poseInitialized = true;
    }
    updateVisualPointCloud(view, pose.visualPointCloud, Boolean(pose.cameraConnected));
    refreshHandVisibility(view);
    setJawClosure(view, pose.closure);
    appendTrail(
        view, worldPosition, Number(pose.sampleCount) || 0,
        Number(pose.timestampUs) || 0, Boolean(pose.stationary)
    );

    const euler = pose.euler || [0, 0, 0];
    setText(prefix + 'Position', position.x.toFixed(3) + ' / ' + position.y.toFixed(3) + ' / ' + position.z.toFixed(3));
    setText(prefix + 'Rotation', finiteNumber(euler[0]).toFixed(1) + '° / ' + finiteNumber(euler[1]).toFixed(1) + '° / ' + finiteNumber(euler[2]).toFixed(1) + '°');
    setText(prefix + 'Closure', '闭合 ' + Math.round(view.closure * 100) + '%');
}

function updateVisualPointCloud(view, cloud, cameraConnected) {
    if (!view.visualPoints) return;
    const positions = [];
    if (Array.isArray(cloud)) {
        cloud.forEach(function(point) {
            if (!Array.isArray(point) || point.length < 3) return;
            positions.push(finiteNumber(point[0]), finiteNumber(point[1]), finiteNumber(point[2]));
        });
    }
    view.visualPoints.geometry.dispose();
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    view.visualPoints.geometry = geometry;
    view.visualPoints.userData.hasPoints = positions.length >= 3;
    view.visualPoints.userData.cameraConnected = cameraConnected;
}

function refreshHandVisibility(view) {
    if (!view.anchor) return;
    const online = view.connected && view.valid;
    const hasPoints = Boolean(view.visualPoints && view.visualPoints.userData.hasPoints);
    const cameraConnected = Boolean(view.visualPoints && view.visualPoints.userData.cameraConnected);
    view.anchor.visible = online && (showModels || showPointCloud);
    if (view.modelRoot) view.modelRoot.visible = showModels;
    if (view.cameraHousing) view.cameraHousing.visible = showModels;
    if (view.cameraFrustum) view.cameraFrustum.visible = online && showPointCloud && cameraConnected;
    if (view.visualPoints) view.visualPoints.visible = online && showPointCloud && cameraConnected && hasPoints;
}

function appendTrail(view, point, sample, timestampUs, stationary) {
    if (sample && sample === view.lastSample) return;
    const previous = view.trail.length ? view.trail[view.trail.length - 1] : null;
    if (stationary && previous) return;
    const enoughMovement = !previous || previous.distanceToSquared(point) >= 0.000009;
    const enoughTime = timestampUs && timestampUs - view.lastTrailTime >= 500000;
    if (!enoughMovement && !enoughTime) return;
    view.lastSample = sample;
    view.lastTrailTime = timestampUs;
    view.trail.push(point.clone());
    if (view.trail.length > trailLimit) view.trail.splice(0, view.trail.length - trailLimit);
    updateTrailGeometry(view);
}

function updateTrailGeometry(view) {
    if (!view.trailLine) return;
    const points = view.trail.length > 0 ? view.trail : [START_OFFSETS[view.side].clone()];
    view.trailLine.geometry.dispose();
    view.trailLine.geometry = new THREE.BufferGeometry().setFromPoints(points);
    view.trailLine.visible = view.connected && view.valid && view.trail.length > 1;
}

function updateOverall(online, text) {
    setText('trajectoryOverallState', text);
    const dot = byId('trajectoryLiveDot');
    if (dot) dot.classList.toggle('online', online);
}

function setText(id, value) {
    const element = byId(id);
    if (element) element.textContent = value;
}

function finiteNumber(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : (fallback === undefined ? 0 : fallback);
}

function formatScale(value) {
    return (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)) + '×';
}

function modeLabel(mode, connected) {
    if (!connected) return '未接入';
    if (mode === 'visual_imu_anchor') return '原点重定位';
    if (mode === 'visual_imu_cooperative') return '双手协同';
    if (mode === 'visual_imu') return '视觉 + IMU';
    if (mode === 'imu') return 'IMU';
    if (mode === 'initializing') return '初始化';
    return '等待数据';
}

function animate() {
    if (!active || !renderer || !scene || !camera) return;
    ['left', 'right'].forEach(function(side) {
        const view = handViews[side];
        if (!view.anchor || !view.poseInitialized) return;
        view.anchor.position.lerp(view.targetPosition, 0.18);
        view.anchor.quaternion.slerp(view.targetQuaternion, 0.16);
    });
    controls.update();
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(animate);
}

function enter() {
    initScene();
    active = true;
    resizeRenderer();
    pollPoses();
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(pollPoses, 100);
    if (!animationFrame) animate();
}

function leave() {
    active = false;
    if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
    }
}

window.handTrajectory3d = { enter, leave, clear: clearTrails, fit: fitView };
