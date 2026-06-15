param(
    [string]$Output = "linux_ubuntu2204_port.zip"
)

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PortRoot = Resolve-Path (Join-Path $ScriptDir "..")
$Parent = Split-Path -Parent $PortRoot
$ZipPath = Join-Path $Parent $Output

if (Test-Path $ZipPath) {
    Remove-Item -LiteralPath $ZipPath -Force
}

Compress-Archive -Path $PortRoot -DestinationPath $ZipPath -Force
Write-Host "已生成压缩包: $ZipPath"
