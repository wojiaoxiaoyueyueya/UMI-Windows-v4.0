@echo off
set base_dir=%~dp0
%base_dir:~0,2%
pushd %base_dir%

set wintemp=%SYSTEMROOT%\temp\MvSDKInstall
mkdir %wintemp% 2>nul
set _LOG_FILE=%wintemp%\MvU3VDriverLog.log

echo. >> %_LOG_FILE%
echo [%date% %time%] >> %_LOG_FILE%
echo %cd% >> %_LOG_FILE%

echo driver is installing , please wait for a few minutes ... >> %_LOG_FILE%
certutil.exe -f -addstore "TrustedPublisher" mvu3v.cer 1>nul 2>&1
certutil.exe -f -addstore "TrustedPublisher" mvu3v_Microsoft.cer 1>nul 2>&1
xdevcon.exe rescan >> %_LOG_FILE%
@ping 127.0.0.1 -n 3 >nul
dpinst.exe /F /S >> %_LOG_FILE%
cd.>Flag.ini
@ping 127.0.0.1 -n 2 >nul
echo driver install ok >> %_LOG_FILE%
echo. >> %_LOG_FILE%
