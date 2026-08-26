Option Explicit

Const AppUrl = "http://127.0.0.1:8080/"
Const HealthUrl = "http://127.0.0.1:8080/api/system/status"

Dim shell, fileSystem, scriptDir, appRoot, executable, launcher, logFile, pageFile, configFile
Dim retry, statusCode
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")
scriptDir = fileSystem.GetParentFolderName(WScript.ScriptFullName)
appRoot = scriptDir
' The installer places this script at app root; source runs it from packaging.
If LCase(fileSystem.GetFileName(scriptDir)) = "packaging" Then
    appRoot = fileSystem.GetParentFolderName(scriptDir)
End If
executable = fileSystem.BuildPath(appRoot, "build\ManualGripper.exe")
launcher = fileSystem.BuildPath(scriptDir, "StartUMI.cmd")
logFile = fileSystem.BuildPath(appRoot, "startup.log")
pageFile = fileSystem.BuildPath(appRoot, "frontend\index.html")
configFile = fileSystem.BuildPath(appRoot, "config.json")

If Not fileSystem.FileExists(executable) Or _
   Not fileSystem.FileExists(launcher) Or _
   Not fileSystem.FileExists(pageFile) Or _
   Not fileSystem.FileExists(configFile) Then
    MsgBox "Application files are incomplete. The backend, frontend, or configuration file is missing." & vbCrLf & vbCrLf & _
           "Install directory:" & vbCrLf & appRoot & vbCrLf & vbCrLf & _
           "Please reinstall the current release package.", 16, "UMI Data Capture Platform"
    WScript.Quit 1
End If

' Reuse a healthy backend. If ManualGripper.exe exists but does not expose the
' health endpoint, it is a stale/old instance and may still own camera or COM handles.
statusCode = GetHealthStatus()
If statusCode <> 200 Then
    If IsAnyBackendRunning() Then
        StopStaleBackends
        For retry = 1 To 50
            WScript.Sleep 200
            If Not IsAnyBackendRunning() Then Exit For
        Next
    End If

    ' A remaining HTTP response means another program owns port 8080.
    If GetServerStatus() <> 0 Then
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
        statusCode = GetHealthStatus()
        If statusCode = 200 Then Exit For
        If statusCode = -1 Then
            ShowFailure "The backend returned HTTP " & statusCode & " but could not serve the control page." & vbCrLf & _
                        "The frontend directory may be damaged. Reinstall this package."
            WScript.Quit 4
        End If
        If retry Mod 3 = 0 And Not IsBackendRunning() Then Exit For
    Next
End If

If GetHealthStatus() <> 200 Or GetServerStatus() <> 200 Then
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
    Dim request, exitCode
    GetServerStatus = 0
    Set request = CreateObject("WinHttp.WinHttpRequest.5.1")
    request.SetTimeouts 500, 500, 500, 500
    request.Open "GET", AppUrl, False
    request.Send
    If Err.Number = 0 Then GetServerStatus = request.Status
    Err.Clear
    On Error GoTo 0
End Function

Function GetHealthStatus()
    On Error Resume Next
    Dim request, responseText
    GetHealthStatus = 0
    Set request = CreateObject("WinHttp.WinHttpRequest.5.1")
    request.SetTimeouts 500, 500, 500, 500
    request.Open "GET", HealthUrl, False
    request.Send
    If Err.Number = 0 Then
        responseText = request.ResponseText
        If request.Status = 200 And InStr(1, responseText, "umi-data-capture-platform", vbTextCompare) > 0 Then
            GetHealthStatus = 200
        Else
            GetHealthStatus = -1
        End If
    End If
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

Function IsAnyBackendRunning()
    On Error Resume Next
    Dim processList
    IsAnyBackendRunning = False
    Set processList = GetObject("winmgmts:\\.\root\cimv2").ExecQuery( _
        "SELECT ProcessId FROM Win32_Process WHERE Name='ManualGripper.exe'")
    If Err.Number = 0 Then IsAnyBackendRunning = (processList.Count > 0)
    Err.Clear
    On Error GoTo 0
End Function

Sub StopStaleBackends()
    On Error Resume Next
    Dim request

    ' Newer backends can release SDK and serial handles gracefully.
    Set request = CreateObject("WinHttp.WinHttpRequest.5.1")
    request.SetTimeouts 500, 500, 500, 500
    request.Open "POST", "http://127.0.0.1:8080/api/system/shutdown", False
    request.Send ""
    Err.Clear
    WScript.Sleep 1500

    ' An older or hung build cannot process the shutdown API. Terminating the
    ' remaining backend releases all Windows process-owned handles without rebooting.
    exitCode = shell.Run("taskkill.exe /IM ManualGripper.exe /F", 0, True)
    Err.Clear
    On Error GoTo 0
End Sub

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
