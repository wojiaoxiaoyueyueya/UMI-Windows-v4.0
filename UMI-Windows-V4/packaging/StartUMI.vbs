Option Explicit

Const AppUrl = "http://127.0.0.1:8080/"

Dim shell, fileSystem, appRoot, executable, launcher, logFile, pageFile, configFile
Dim retry, statusCode
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")
appRoot = fileSystem.GetParentFolderName(WScript.ScriptFullName)
executable = fileSystem.BuildPath(appRoot, "build\ManualGripper.exe")
launcher = fileSystem.BuildPath(appRoot, "StartUMI.cmd")
logFile = fileSystem.BuildPath(appRoot, "startup.log")
pageFile = fileSystem.BuildPath(appRoot, "frontend\index.html")
configFile = fileSystem.BuildPath(appRoot, "config.json")

If Not fileSystem.FileExists(executable) Or _
   Not fileSystem.FileExists(launcher) Or _
   Not fileSystem.FileExists(pageFile) Or _
   Not fileSystem.FileExists(configFile) Then
    MsgBox "Application files are incomplete. The backend, frontend, or configuration file is missing." & vbCrLf & vbCrLf & _
           "Install directory:" & vbCrLf & appRoot & vbCrLf & vbCrLf & _
           "Please install version 4.2.0 or later again.", 16, "UMI Data Capture Platform"
    WScript.Quit 1
End If

' Reuse an existing backend when the desktop shortcut is clicked repeatedly.
statusCode = GetServerStatus()
If statusCode <> 200 Then
    ' Any HTTP response here means another service owns port 8080 or the UMI
    ' backend cannot serve its packaged frontend. Do not wait silently.
    If statusCode <> 0 Then
        ShowFailure "Port 8080 returned HTTP " & statusCode & " instead of the UMI control page." & vbCrLf & _
                    "Close the program occupying port 8080, or reinstall this package."
        WScript.Quit 3
    End If

    If Not IsBackendRunning() Then
        shell.CurrentDirectory = appRoot
        shell.Run Chr(34) & launcher & Chr(34), 0, False
    End If

    ' Device discovery can be slow on a new PC while Windows initializes drivers.
    For retry = 1 To 300
        WScript.Sleep 1000
        statusCode = GetServerStatus()
        If statusCode = 200 Then Exit For
        If statusCode <> 0 Then
            ShowFailure "The backend returned HTTP " & statusCode & " but could not serve the control page." & vbCrLf & _
                        "The frontend directory may be damaged. Reinstall this package."
            WScript.Quit 4
        End If
        If retry Mod 3 = 0 And Not IsBackendRunning() Then Exit For
    Next
End If

If GetServerStatus() <> 200 Then
    If IsBackendRunning() Then
        ShowFailure "The backend is still detecting devices and the page is not ready." & vbCrLf & _
                    "Wait for detection to finish, then click the desktop shortcut again."
    Else
        ShowFailure "The backend stopped before the web page became ready." & vbCrLf & _
                    "Check the last line of startup.log."
    End If
    WScript.Quit 2
End If

OpenInEdge AppUrl

Function GetServerStatus()
    On Error Resume Next
    Dim request
    GetServerStatus = 0
    Set request = CreateObject("WinHttp.WinHttpRequest.5.1")
    request.SetTimeouts 500, 500, 500, 500
    request.Open "GET", AppUrl, False
    request.Send
    If Err.Number = 0 Then GetServerStatus = request.Status
    Err.Clear
    On Error GoTo 0
End Function

Function IsBackendRunning()
    On Error Resume Next
    Dim processList, processItem, processPath
    IsBackendRunning = False
    Set processList = GetObject("winmgmts:\\.\root\cimv2").ExecQuery( _
        "SELECT ExecutablePath FROM Win32_Process WHERE Name='ManualGripper.exe'")
    If Err.Number = 0 Then
        For Each processItem In processList
            processPath = processItem.ExecutablePath
            If Err.Number = 0 And StrComp(processPath, executable, vbTextCompare) = 0 Then
                IsBackendRunning = True
                Exit For
            End If
            Err.Clear
        Next
    End If
    Err.Clear
    On Error GoTo 0
End Function

Sub ShowFailure(message)
    If fileSystem.FileExists(logFile) Then
        shell.Run "notepad.exe " & Chr(34) & logFile & Chr(34), 1, False
        message = message & vbCrLf & vbCrLf & "startup.log has been opened."
    End If
    MsgBox message & vbCrLf & vbCrLf & "Install directory:" & vbCrLf & appRoot, 16, "UMI Data Capture Platform"
End Sub

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
