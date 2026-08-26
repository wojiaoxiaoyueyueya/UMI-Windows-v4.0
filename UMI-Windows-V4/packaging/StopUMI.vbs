Option Explicit

Dim ws, request, retry, taskResult
Set ws = CreateObject("WScript.Shell")

' Ask the backend to release camera, serial, and CAN handles first.
On Error Resume Next
Set request = CreateObject("WinHttp.WinHttpRequest.5.1")
request.SetTimeouts 500, 500, 500, 500
request.Open "POST", "http://127.0.0.1:8080/api/system/shutdown", False
request.Send ""
Err.Clear

For retry = 1 To 50
    WScript.Sleep 200
    If Not IsBackendRunning() Then
        Exit For
    End If
Next

' Older or unresponsive builds cannot handle the API, so remove leftovers last.
If IsBackendRunning() Then
    taskResult = ws.Run("taskkill.exe /IM ManualGripper.exe /F", 0, True)
End If

If IsBackendRunning() Then
    MsgBox "The backend is still running. Restart Windows before reconnecting devices.", 48, "UMI Data Capture Platform"
Else
    MsgBox "The backend has stopped and all devices were released.", 64, "UMI Data Capture Platform"
End If

Function IsBackendRunning()
    On Error Resume Next
    Dim items
    IsBackendRunning = False
    Set items = GetObject("winmgmts:\\.\root\cimv2").ExecQuery( _
        "SELECT ProcessId FROM Win32_Process WHERE Name='ManualGripper.exe'")
    If Err.Number = 0 Then IsBackendRunning = (items.Count > 0)
    Err.Clear
End Function
