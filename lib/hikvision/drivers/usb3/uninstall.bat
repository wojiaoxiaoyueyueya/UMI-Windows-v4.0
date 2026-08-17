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

dpinst.exe /U mvu3v.inf /S >> %_LOG_FILE%
echo delete file >> %_LOG_FILE%
del Flag.ini
@ping 127.0.0.1 -n 2 >nul
echo driver uninstall ok >> %_LOG_FILE%
echo. >> %_LOG_FILE%
