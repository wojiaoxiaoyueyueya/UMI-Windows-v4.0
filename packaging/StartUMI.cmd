@echo off
setlocal

set "APP_ROOT=%~dp0"
set "LOG_FILE=%APP_ROOT%startup.log"
set "APP_EXE=%APP_ROOT%build\ManualGripper.exe"

chcp 65001 >nul
>"%LOG_FILE%" echo [%date% %time%] Starting UMI Data Capture Platform
>>"%LOG_FILE%" echo Application: %APP_EXE%
>>"%LOG_FILE%" echo Working directory: %APP_ROOT%build
>>"%LOG_FILE%" echo.

cd /d "%APP_ROOT%build"
"%APP_EXE%" >>"%LOG_FILE%" 2>&1
set "APP_EXIT_CODE=%ERRORLEVEL%"

>>"%LOG_FILE%" echo.
>>"%LOG_FILE%" echo [%date% %time%] Backend exited with code %APP_EXIT_CODE%
exit /b %APP_EXIT_CODE%
