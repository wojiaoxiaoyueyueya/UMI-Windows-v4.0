#ifndef AppVersion
  #define AppVersion "4.0.0"
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
DefaultDirName={localappdata}\UMIDataCapturePlatform
DefaultGroupName={#AppName}
DisableProgramGroupPage=yes
PrivilegesRequired=lowest
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
Name: "{app}\data_capture"
Name: "{app}\data_converted"

[Icons]
Name: "{autoprograms}\{#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"
Name: "{autodesktop}\{#AppName}"; Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; WorkingDir: "{app}"; IconFilename: "{app}\build\{#AppExeName}"

[Run]
Filename: "{sys}\wscript.exe"; Parameters: """{app}\StartUMI.vbs"""; Description: "启动 {#AppName}"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "{cmd}"; Parameters: "/C taskkill /IM {#AppExeName} /F >nul 2>&1"; Flags: runhidden; RunOnceId: "StopUMIDataCapturePlatform"
