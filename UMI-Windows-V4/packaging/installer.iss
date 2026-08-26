#ifndef AppVersion
  #define AppVersion "4.3.1"
#endif

#define AppName "UMI 数据采集平台"
#define AppPublisher "卓誉科技机器人"
#define AppExeName "ManualGripper.exe"

[Setup]
AppId={{D7426C64-F52F-41D8-9C57-77CEB8C89AA6}
AppName={#AppName}
AppVersion={#AppVersion}
AppVerName={#AppName} {#AppVersion}
AppPublisher={#AppPublisher}
DefaultDirName=D:\UMIDataCapturePlatform
UsePreviousAppDir=no
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
PrivilegesRequired=admin
PrivilegesRequiredOverridesAllowed=commandline
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
OutputDir=..\dist
OutputBaseFilename=UMI-Data-Capture-Platform-{#AppVersion}-Setup
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
CloseApplications=yes
RestartApplications=no
UninstallDisplayIcon={app}\build\{#AppExeName}
VersionInfoVersion={#AppVersion}
VersionInfoCompany={#AppPublisher}
VersionInfoDescription={#AppName}
VersionInfoProductName={#AppName}

[Files]
Source: "stage\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Dirs]
Name: "{app}"; Permissions: users-modify
Name: "{app}\data_capture"; Permissions: users-modify
Name: "{app}\data_converted"; Permissions: users-modify

[Icons]
Name: "{autoprograms}\{#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"
Name: "{autoprograms}\退出 {#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StopUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"
Name: "{autodesktop}\{#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"
Name: "{autodesktop}\退出 {#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StopUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"

[Run]
Filename: "{cmd}"; Parameters: "/C taskkill /IM {#AppExeName} /F >nul 2>&1"; StatusMsg: "正在关闭旧版后台服务..."; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\hikvision_usb3\mvu3v.inf"" /install"; StatusMsg: "正在安装海康 USB3 Vision 驱动..."; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\gcan_wdm\USBCANWDM.INF"" /install"; StatusMsg: "正在安装 GCAN USB-CAN 驱动..."; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\gcan_canfd\USBCANFD.inf"" /install"; StatusMsg: "正在安装 GCAN CAN-FD 驱动..."; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\ch341\CH341SER.INF"" /install"; StatusMsg: "正在安装 CH341 串口驱动..."; Flags: runhidden waituntilterminated
Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; Description: "启动 {#AppName}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "{cmd}"; Parameters: "/C taskkill /IM {#AppExeName} /F >nul 2>&1"; Flags: runhidden; RunOnceId: "StopUMIDataCapturePlatform"

[Code]
function IsSystemDrivePath(const Path: String): Boolean;
begin
  Result := CompareText(ExtractFileDrive(Path), 'C:') = 0;
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  Result := True;
  if (CurPageID = wpSelectDir) and IsSystemDrivePath(WizardDirValue) then
  begin
    MsgBox('本项目不允许安装到 C 盘。请选择 D、E、F 等非系统盘。', mbError, MB_OK);
    Result := False;
  end;
end;

function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  Result := '';
  if IsSystemDrivePath(ExpandConstant('{app}')) then
    Result := '本项目不允许安装到 C 盘。请返回并选择 D、E、F 等非系统盘。';
end;
