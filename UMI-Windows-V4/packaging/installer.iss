#ifndef AppVersion
  #define AppVersion "4.3.2"
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
UsePreviousAppDir=yes
DisableDirPage=no
CreateAppDir=yes
AllowRootDirectory=no
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
PrivilegesRequired=admin
PrivilegesRequiredOverridesAllowed=commandline
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
OutputDir=..\..
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

[Languages]
Name: "chinesesimplified"; MessagesFile: ".\languages\ChineseSimplified.isl"
Name: "english"; MessagesFile: "compiler:Default.isl"

[CustomMessages]
chinesesimplified.StopOldService=正在关闭旧版后台服务...
english.StopOldService=Closing the previous background service...
chinesesimplified.InstallHikvisionDriver=正在安装海康 USB3 Vision 驱动...
english.InstallHikvisionDriver=Installing the Hikvision USB3 Vision driver...
chinesesimplified.InstallGcanDriver=正在安装 GCAN USB-CAN 驱动...
english.InstallGcanDriver=Installing the GCAN USB-CAN driver...
chinesesimplified.InstallGcanFdDriver=正在安装 GCAN CAN-FD 驱动...
english.InstallGcanFdDriver=Installing the GCAN CAN-FD driver...
chinesesimplified.InstallSerialDriver=正在安装 CH341 串口驱动...
english.InstallSerialDriver=Installing the CH341 serial driver...
chinesesimplified.StartApp=启动 UMI 数据采集平台
english.StartApp=Launch UMI Data Capture Platform
chinesesimplified.SystemDriveRejected=本项目不允许安装到 C 盘。请选择 D、E、F 等非系统盘，并可在目录选择窗口中新建文件夹。
english.SystemDriveRejected=This application cannot be installed on drive C. Select drive D, E, F, or another non-system drive. You can create a new folder in the directory browser.

[Files]
Source: "stage\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Dirs]
Name: "{app}"; Permissions: users-modify
Name: "{app}\data_capture"; Permissions: users-modify
Name: "{app}\data_converted"; Permissions: users-modify

[Icons]
Name: "{autoprograms}\{#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"
Name: "{autodesktop}\{#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"

[Run]
Filename: "{cmd}"; Parameters: "/C taskkill /IM {#AppExeName} /F >nul 2>&1"; StatusMsg: "{cm:StopOldService}"; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\hikvision_usb3\mvu3v.inf"" /install"; StatusMsg: "{cm:InstallHikvisionDriver}"; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\gcan_wdm\USBCANWDM.INF"" /install"; StatusMsg: "{cm:InstallGcanDriver}"; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\gcan_canfd\USBCANFD.inf"" /install"; StatusMsg: "{cm:InstallGcanFdDriver}"; Flags: runhidden waituntilterminated
Filename: "{sys}\pnputil.exe"; Parameters: "/add-driver ""{app}\drivers\ch341\CH341SER.INF"" /install"; StatusMsg: "{cm:InstallSerialDriver}"; Flags: runhidden waituntilterminated
Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; Description: "{cm:StartApp}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "{sys}\wscript.exe"; Parameters: """{app}\StopUMI.vbs"""; Flags: runhidden waituntilterminated; RunOnceId: "ReleaseUMIDataCaptureDevices"
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
    MsgBox(ExpandConstant('{cm:SystemDriveRejected}'), mbError, MB_OK);
    Result := False;
  end;
end;

function PrepareToInstall(var NeedsRestart: Boolean): String;
begin
  Result := '';
  if IsSystemDrivePath(ExpandConstant('{app}')) then
    Result := ExpandConstant('{cm:SystemDriveRejected}');
end;
