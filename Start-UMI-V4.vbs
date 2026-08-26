Option Explicit

Dim shell, fileSystem, rootDir, launcher
Set shell = CreateObject("WScript.Shell")
Set fileSystem = CreateObject("Scripting.FileSystemObject")

rootDir = fileSystem.GetParentFolderName(WScript.ScriptFullName)
launcher = fileSystem.BuildPath(rootDir, "UMI-Windows-V4\packaging\StartUMI.vbs")

If Not fileSystem.FileExists(launcher) Then
    MsgBox "UMI-Windows-V4 launcher was not found:" & vbCrLf & launcher, 16, "UMI Data Capture Platform"
    WScript.Quit 1
End If

shell.Run "wscript.exe " & Chr(34) & launcher & Chr(34), 1, False
