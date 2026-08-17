Option Explicit

Const AppUrl = "http://localhost:8080/index_old.html"

Dim shell, fileSystem, appRoot, executable, retry
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")
appRoot = fileSystem.GetParentFolderName(WScript.ScriptFullName)
executable = fileSystem.BuildPath(appRoot, "build\ManualGripper.exe")

If Not fileSystem.FileExists(executable) Then
    MsgBox "ManualGripper.exe was not found. Please reinstall the application.", 16, "UMI Data Capture Platform"
    WScript.Quit 1
End If

' Reuse an existing backend when the desktop shortcut is clicked repeatedly.
If Not IsServerReady() Then
    shell.CurrentDirectory = fileSystem.BuildPath(appRoot, "build")
    shell.Run Chr(34) & executable & Chr(34), 0, False

    For retry = 1 To 120
        WScript.Sleep 500
        If IsServerReady() Then Exit For
    Next
End If

If Not IsServerReady() Then
    MsgBox "The service did not start within 60 seconds. Check device connections and reinstall if needed.", 16, "UMI Data Capture Platform"
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
    IsServerReady = (Err.Number = 0 And request.Status >= 200 And request.Status < 500)
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
