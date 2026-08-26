# collect_dlls.ps1 - 递归收集可执行文件所需的运行时 DLL，保证构建目录可移植运行。
# 用法：powershell -ExecutionPolicy Bypass -File collect_dlls.ps1 -BuildDir ./build

param(
    [string]$BuildDir = ".",
    [string]$MingwBin = "C:\msys64\mingw64\bin"
)

$ErrorActionPreference = "Continue"
$buildDir = (Resolve-Path $BuildDir).Path

$systemDlls = @(
    'KERNEL32', 'msvcrt', 'WS2_32', 'USER32', 'GDI32', 'ADVAPI32', 'SHELL32',
    'OLE32', 'OLEAUT32', 'dbghelp', 'WINMM', 'CRYPT32', 'Secur32', 'bcrypt',
    'ntdll', 'SHLWAPI', 'SETUPAPI', 'AVICAP32', 'USERENV', 'AVRT', 'ncrypt',
    'gdiplus', 'DWrite', 'USP10', 'OPENGL32', 'd3d11', 'dxgi', 'dwmapi',
    'uxtheme', 'msimg32', 'imm32', 'version', 'wintrust', 'oleacc', 'msasn1',
    'MF', 'MFPlat', 'MFReadWrite',
    'netapi32', 'iphlpapi', 'dnsapi', 'winhttp', 'wldap32', 'mpr', 'netutils',
    'samlib', 'wtsapi32', 'propsys', 'shcore', 'cfgmgr32', 'powrprof',
    'kernelbase', 'cryptbase', 'sspicli', 'rpcrt4', 'combase', 'sechost',
    'profapi', 'mswsock', 'ws2help', 'wsock32', 'api-ms-'
)

function Test-SystemDll($name) {
    foreach ($sys in $systemDlls) {
        if ($name -like "$sys*") { return $true }
    }
    return $false
}

$exe = Get-ChildItem -Path "$buildDir\*.exe" | Select-Object -First 1
if (-not $exe) {
    Write-Error "No exe found in $buildDir"
    exit 1
}

$objdump = Join-Path $MingwBin "objdump.exe"
if (-not (Test-Path $objdump)) {
    Write-Error "objdump not found at $objdump"
    exit 1
}

Write-Output "=== DLL Dependency Collector ==="
Write-Output "Build dir: $buildDir"
Write-Output "MinGW bin: $MingwBin"
Write-Output "Exe: $($exe.Name)"
Write-Output ""

$queue = [System.Collections.Generic.Queue[string]]::new()
$queue.Enqueue($exe.Name)
$checked = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$unresolved = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$copied = 0

while ($queue.Count -gt 0) {
    $current = $queue.Dequeue()
    if (-not $checked.Add($current)) { continue }

    $fullPath = Join-Path $buildDir $current
    if (-not (Test-Path $fullPath)) { continue }

    $output = & $objdump -p $fullPath 2>$null
    foreach ($line in $output) {
        if ($line -match 'DLL Name:\s+(\S+)') {
            $dep = $Matches[1]
            if (Test-SystemDll $dep) { continue }
            if ($checked.Contains($dep)) { continue }

            $depPath = Join-Path $buildDir $dep
            if (-not (Test-Path $depPath)) {
                $srcPath = Join-Path $MingwBin $dep
                if (Test-Path $srcPath) {
                    Copy-Item $srcPath $buildDir -Force
                    Write-Output "  + $dep"
                    $copied++
                    $queue.Enqueue($dep)
                } else {
                    $unresolved.Add($dep) | Out-Null
                }
            } else {
                $queue.Enqueue($dep)
            }
        }
    }
}

Write-Output ""
Write-Output "=== Done! Copied $copied DLLs ==="
if ($unresolved.Count -gt 0) {
    Write-Error ("Unresolved runtime DLLs: " + (($unresolved | Sort-Object) -join ", "))
    exit 2
}
Write-Output "Runtime dependency validation passed."
