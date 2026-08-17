Option Explicit

Const AppUrl = "http://localhost:8080/index_old.html"

Dim shell, fileSystem, appRoot, executable, launcher, logFile, retry
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")
appRoot = fileSystem.GetParentFolderName(WScript.ScriptFullName)
executable = fileSystem.BuildPath(appRoot, "build\ManualGripper.exe")
launcher = fileSystem.BuildPath(appRoot, "StartUMI.cmd")
logFile = fileSystem.BuildPath(appRoot, "startup.log")

If Not fileSystem.FileExists(executable) Or Not fileSystem.FileExists(launcher) Then
    MsgBox "Application files are incomplete. Please install version 4.1.1 or later again.", 16, "UMI Data Capture Platform"
    WScript.Quit 1
End If

' Reuse an existing backend when the desktop shortcut is clicked repeatedly.
If Not IsServerReady() Then
    If Not IsBackendRunning() Then
        shell.CurrentDirectory = appRoot
        shell.Run Chr(34) & launcher & Chr(34), 0, False
    End If

    ' Device discovery can be slow on a new PC while Windows initializes drivers.
    For retry = 1 To 300
        WScript.Sleep 1000
        If IsServerReady() Then Exit For
        If retry Mod 3 = 0 And Not IsBackendRunning() Then Exit For
    Next
End If

If Not IsServerReady() Then
    If fileSystem.FileExists(logFile) Then
        shell.Run "notepad.exe " & Chr(34) & logFile & Chr(34), 1, False
    End If
    If IsBackendRunning() Then
        MsgBox "The backend is still detecting devices. startup.log has been opened. Wait for detection to finish, then click the desktop shortcut again.", 48, "UMI Data Capture Platform"
    Else
        MsgBox "The backend stopped before the web page became ready. startup.log has been opened. Check the last error and install the required hardware driver.", 16, "UMI Data Capture Platform"
    End If
    WScript.Quit 2
End If

OpenInEdge AppUrl

Function IsServerReady()
    On Error Resume Next
    Dim request
    Set request = CreateObject("WinHttp.WinHttpRequest.5.1")
    request.SetTimeouts 500, 500, 500, 500
    request.Open "GET", AppUrl, False
    request.Send
    ' A 404 response may come from another program already occupying port 8080.
    ' Only the packaged control page returning HTTP 200 means UMI is ready.
    IsServerReady = (Err.Number = 0 And request.Status = 200)
    Err.Clear
    On Error GoTo 0
End Function

Function IsBackendRunning()
    On Error Resume Next
    Dim processList
    Set processList = GetObject("winmgmts:\\.\root\cimv2").ExecQuery( _
        "SELECT ProcessId FROM Win32_Process WHERE Name='ManualGripper.exe'")
    IsBackendRunning = (Err.Number = 0 And processList.Count > 0)
    Err.Clear
    On Error GoTo 0
End Function

Sub OpenInEdge(url)
    Dim edgePath
    edgePath = shell.ExpandEnvironmentStrings("%ProgramFiles(x86)%") & "\Microsoft\Edge\Application\msedge.exe"
    If Not fileSystem.FileExists(edgePath) Then
        edgePath = shell.ExpandEnvironmentStrings("%ProgramFiles%") & "\Microsoft\Edge\Application\msedge.exe"
    End If

    If fileSystem.FileExists(edgePath) Then
        shell.Run Chr(34) & edgePath & Chr(34) & " " & Chr(34) & url & Chr(34), 1, False
    Else
        shell.Run url, 1, False
    End If
End Sub
