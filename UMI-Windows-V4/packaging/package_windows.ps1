# Build a self-contained Windows x64 installer.
param(
    [string]$Version = "",
    [string]$BuildDir = "",
    [string]$MingwBin = "C:\msys64\mingw64\bin",
    [string]$PythonVersion = "3.11.9"
)

$ErrorActionPreference = "Stop"

$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
$versionFile = Join-Path $projectRoot "VERSION"
if (-not [System.IO.File]::Exists($versionFile)) { throw "Missing VERSION file: $versionFile" }
$projectVersion = [System.IO.File]::ReadAllText($versionFile).Trim()
if ([string]::IsNullOrWhiteSpace($projectVersion)) { throw "VERSION file is empty: $versionFile" }
if ([string]::IsNullOrWhiteSpace($Version)) {
    $Version = $projectVersion
} elseif ($Version -ne $projectVersion) {
    throw "Installer version '$Version' does not match project VERSION '$projectVersion'"
}
if ([string]::IsNullOrWhiteSpace($BuildDir)) {
    $BuildDir = Join-Path $projectRoot "build"
}
$BuildDir = [System.IO.Path]::GetFullPath($BuildDir)
$stageRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "stage"))
$cacheRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "cache"))
$distRoot = [System.IO.Path]::GetFullPath((Join-Path $projectRoot "dist"))
$stageBuild = Join-Path $stageRoot "build"

function Reset-StageDirectory {
    $packagingRoot = [System.IO.Path]::GetFullPath($PSScriptRoot).TrimEnd('\') + '\'
    if (-not $stageRoot.StartsWith($packagingRoot, [System.StringComparison]::OrdinalIgnoreCase) -or
        [System.IO.Path]::GetFileName($stageRoot) -ne "stage") {
        throw "Unsafe staging path: $stageRoot"
    }
    if ([System.IO.Directory]::Exists($stageRoot)) {
        [System.IO.Directory]::Delete($stageRoot, $true)
    }
    [System.IO.Directory]::CreateDirectory($stageBuild) | Out-Null
}

function Test-SystemDll([string]$Name) {
    $systemPrefixes = @(
        "api-ms-", "ext-ms-", "KERNEL32", "KERNELBASE", "ntdll", "msvcrt", "ucrtbase",
        "WS2_32", "USER32", "GDI32", "ADVAPI32", "SHELL32", "OLE32", "OLEAUT32",
        "COMDLG32", "COMCTL32", "CRYPT32", "bcrypt", "Secur32", "SHLWAPI", "SETUPAPI",
        "WINMM", "AVICAP32", "VERSION", "WINTRUST", "RPCRT4", "COMBASE", "IMM32",
        "DWMAPI", "UXTHEME", "OPENGL32", "DWRITE", "DNSAPI", "IPHLPAPI", "WINHTTP",
        "WLDAP32", "USERENV", "AVRT", "PROPSYS", "SHCORE", "CFGMGR32", "POWRPROF",
        "WINSPOOL", "WSOCK32", "d3d11", "dxgi", "dbghelp", "MF", "MFReadWrite", "MFPlat",
        "MSIMG32", "ncrypt", "gdiplus", "USP10", "PSAPI", "mscoree"
    )
    foreach ($prefix in $systemPrefixes) {
        if ($Name.StartsWith($prefix, [System.StringComparison]::OrdinalIgnoreCase)) { return $true }
    }
    return $false
}

function Copy-RuntimeFile([string]$Source, [System.Collections.Generic.Queue[string]]$Queue) {
    if (-not [System.IO.File]::Exists($Source)) { return }
    $destination = Join-Path $stageBuild ([System.IO.Path]::GetFileName($Source))
    if (-not [System.IO.File]::Exists($destination)) {
        Copy-Item -LiteralPath $Source -Destination $destination
    }
    $Queue.Enqueue($destination)
}

function Find-Dependency([string]$Name) {
    foreach ($directory in @($stageBuild, $BuildDir, $MingwBin)) {
        $candidate = Join-Path $directory $Name
        if ([System.IO.File]::Exists($candidate)) { return $candidate }
    }
    return $null
}

function Copy-ApplicationRuntime {
    $executable = Join-Path $BuildDir "ManualGripper.exe"
    $objdump = Join-Path $MingwBin "objdump.exe"
    if (-not [System.IO.File]::Exists($executable)) { throw "Missing executable: $executable" }
    if (-not [System.IO.File]::Exists($objdump)) { throw "Missing objdump: $objdump" }

    $queue = [System.Collections.Generic.Queue[string]]::new()
    $checked = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
    Copy-RuntimeFile $executable $queue

    # SDK libraries loaded through LoadLibrary must be seeded explicitly.
    # Only deploy DLLs here: MVS GenTL .cti producers are version-coupled to a
    # full MVS installation and can conflict with the direct camera SDK.
    foreach ($relativeDir in @(
        "lib\hikvision\runtime\win64",
        "lib\orbbec\lib\win64",
        "lib\gcan"
    )) {
        $sdkDir = Join-Path $projectRoot $relativeDir
        if ([System.IO.Directory]::Exists($sdkDir)) {
            Get-ChildItem -LiteralPath $sdkDir -File -Filter "*.dll" | ForEach-Object {
                Copy-RuntimeFile $_.FullName $queue
            }
        }
    }

    while ($queue.Count -gt 0) {
        $current = $queue.Dequeue()
        $currentName = [System.IO.Path]::GetFileName($current)
        if (-not $checked.Add($currentName)) { continue }

        $output = & $objdump -p $current 2>$null
        foreach ($line in $output) {
            if ($line -notmatch "DLL Name:\s+(\S+)") { continue }
            $dependencyName = $Matches[1]
            if (Test-SystemDll $dependencyName) { continue }
            if ($checked.Contains($dependencyName)) { continue }
            $dependency = Find-Dependency $dependencyName
            if ($null -eq $dependency) {
                Write-Warning "Runtime dependency was not found: $dependencyName (required by $currentName)"
                continue
            }
            Copy-RuntimeFile $dependency $queue
        }
    }
}

function Copy-ProjectAssets {
    foreach ($directory in @("frontend", "docs")) {
        Copy-Item -LiteralPath (Join-Path $projectRoot $directory) -Destination (Join-Path $stageRoot $directory) -Recurse
    }
    $stageTools = Join-Path $stageRoot "tools"
    [System.IO.Directory]::CreateDirectory($stageTools) | Out-Null
    foreach ($tool in @("convert_to_hdf5.py", "convert_to_lerobot.py", "convert_to_rlds.py")) {
        Copy-Item -LiteralPath (Join-Path $projectRoot "tools\$tool") -Destination $stageTools
    }
    foreach ($file in @("config.json", "requirements.txt", "README.md", "CHANGELOG.md", "VERSION")) {
        Copy-Item -LiteralPath (Join-Path $projectRoot $file) -Destination (Join-Path $stageRoot $file)
    }
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot "StartUMI.vbs") -Destination $stageRoot
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot "StopUMI.vbs") -Destination $stageRoot
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot "StartUMI.cmd") -Destination $stageRoot
    Copy-Item -LiteralPath (Join-Path $PSScriptRoot "README-install.txt") -Destination $stageRoot
    $driversRoot = Join-Path $stageRoot "drivers"
    [System.IO.Directory]::CreateDirectory($driversRoot) | Out-Null
    foreach ($driver in @(
        @{ Source = "lib\hikvision\drivers\usb3"; Destination = "hikvision_usb3" },
        @{ Source = "lib\gcan\drivers\wdm"; Destination = "gcan_wdm" },
        @{ Source = "lib\gcan\drivers\canfd"; Destination = "gcan_canfd" },
        @{ Source = "lib\serial\drivers\ch341"; Destination = "ch341" }
    )) {
        $source = Join-Path $projectRoot $driver.Source
        if (-not [System.IO.Directory]::Exists($source)) {
            throw "Required driver package is missing: $source"
        }
        Copy-Item -LiteralPath $source -Destination (Join-Path $driversRoot $driver.Destination) -Recurse
    }
    [System.IO.Directory]::CreateDirectory((Join-Path $stageRoot "data_capture")) | Out-Null
    [System.IO.Directory]::CreateDirectory((Join-Path $stageRoot "data_converted")) | Out-Null
}

function Find-HostPythonWithPip {
    $versionParts = $PythonVersion.Split('.')
    $majorMinor = if ($versionParts.Count -ge 2) {
        $versionParts[0] + "." + $versionParts[1]
    } else {
        "3"
    }

    $pyLauncher = Get-Command "py.exe" -ErrorAction SilentlyContinue
    if ($pyLauncher) {
        $probeOutput = & $pyLauncher.Source "-$majorMinor" -m pip --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            return [pscustomobject]@{
                Executable = $pyLauncher.Source
                PrefixArguments = @("-$majorMinor")
                Description = "py -$majorMinor"
            }
        }
    }

    foreach ($candidate in @(Get-Command "python.exe" -All -ErrorAction SilentlyContinue)) {
        $probeOutput = & $candidate.Source -m pip --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            return [pscustomobject]@{
                Executable = $candidate.Source
                PrefixArguments = @()
                Description = $candidate.Source
            }
        }
    }
    throw "Python $majorMinor with pip was not found. Install Python and enable the Windows py launcher."
}

function Install-EmbeddedPython {
    [System.IO.Directory]::CreateDirectory($cacheRoot) | Out-Null
    $archiveName = "python-$PythonVersion-embed-amd64.zip"
    $archivePath = Join-Path $cacheRoot $archiveName
    $downloadUrl = "https://www.python.org/ftp/python/$PythonVersion/$archiveName"
    if (-not [System.IO.File]::Exists($archivePath)) {
        Write-Output "Downloading embedded Python $PythonVersion..."
        Invoke-WebRequest -Uri $downloadUrl -OutFile $archivePath
    }

    $pythonRoot = Join-Path $stageRoot "runtime\python"
    [System.IO.Directory]::CreateDirectory($pythonRoot) | Out-Null
    Expand-Archive -LiteralPath $archivePath -DestinationPath $pythonRoot -Force

    $sitePackages = Join-Path $pythonRoot "Lib\site-packages"
    [System.IO.Directory]::CreateDirectory($sitePackages) | Out-Null
    $pthFile = Get-ChildItem -LiteralPath $pythonRoot -File -Filter "python*._pth" | Select-Object -First 1
    if ($null -eq $pthFile) { throw "Embedded Python path file was not found" }
    @(
        "python311.zip",
        ".",
        "Lib\site-packages",
        "import site"
    ) | Set-Content -LiteralPath $pthFile.FullName -Encoding Ascii

    $pipArguments = @($hostPython.PrefixArguments) + @(
        "-m", "pip", "install", "--disable-pip-version-check", "--no-compile", "--upgrade",
        "--target", $sitePackages, "-r", (Join-Path $projectRoot "requirements.txt")
    )
    & $hostPython.Executable @pipArguments
    if ($LASTEXITCODE -ne 0) { throw "Failed to install embedded Python dependencies" }

    & (Join-Path $pythonRoot "python.exe") -c "import numpy, pyarrow, h5py; print('Embedded Python dependencies OK')"
    if ($LASTEXITCODE -ne 0) { throw "Embedded Python validation failed" }

    # 运行时只执行数据转换，不需要第三方包的测试源码、缓存和字节码。
    # 清理这些文件可显著减小安装包，同时保留包本身、许可证和二进制扩展。
    $sitePackagesFullPath = [System.IO.Path]::GetFullPath($sitePackages).TrimEnd('\') + '\'
    $unusedDirectories = @(
        Get-ChildItem -LiteralPath $sitePackages -Directory -Recurse -Force |
            Where-Object { $_.Name -in @("tests", "test", "__pycache__") } |
            Sort-Object { $_.FullName.Length } -Descending
    )
    foreach ($directory in $unusedDirectories) {
        $directoryFullPath = [System.IO.Path]::GetFullPath($directory.FullName)
        if (-not $directoryFullPath.StartsWith($sitePackagesFullPath, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Refusing to clean a Python directory outside site-packages: $directoryFullPath"
        }
        if ([System.IO.Directory]::Exists($directoryFullPath)) {
            [System.IO.Directory]::Delete($directoryFullPath, $true)
        }
    }
    Get-ChildItem -LiteralPath $sitePackages -File -Recurse -Filter "*.pyc" -Force |
        ForEach-Object { [System.IO.File]::Delete($_.FullName) }

    $remainingUnusedDirectories = @(
        Get-ChildItem -LiteralPath $sitePackages -Directory -Recurse -Force |
            Where-Object { $_.Name -in @("tests", "test", "__pycache__") }
    )
    if ($remainingUnusedDirectories.Count -ne 0) {
        throw "Embedded Python cleanup failed: $($remainingUnusedDirectories.Count) test/cache directories remain"
    }
}

function Find-InnoCompiler {
    $command = Get-Command "ISCC.exe" -ErrorAction SilentlyContinue
    if ($command) { return $command.Source }
    foreach ($candidate in @(
        "$env:LOCALAPPDATA\Programs\Inno Setup 6\ISCC.exe",
        "$env:ProgramFiles(x86)\Inno Setup 6\ISCC.exe",
        "$env:ProgramFiles\Inno Setup 6\ISCC.exe"
    )) {
        if ([System.IO.File]::Exists($candidate)) { return $candidate }
    }
    throw "Inno Setup 6 was not found. Install: winget install --id JRSoftware.InnoSetup -e"
}

$hostPython = Find-HostPythonWithPip
Write-Output ("Host Python for packaging: {0}" -f $hostPython.Description)

Reset-StageDirectory
Copy-ApplicationRuntime
Copy-ProjectAssets
Install-EmbeddedPython
[System.IO.Directory]::CreateDirectory($distRoot) | Out-Null

$requiredStageFiles = @(
    "build\ManualGripper.exe",
    "StopUMI.vbs",
    "build\MvCameraControl.dll",
    "build\MvUsb3vTL.dll",
    "build\ippi.dll",
    "build\OrbbecSDK.dll",
    "drivers\hikvision_usb3\mvu3v.inf",
    "drivers\gcan_wdm\USBCANWDM.INF",
    "drivers\gcan_canfd\USBCANFD.inf",
    "drivers\ch341\CH341SER.INF",
    "runtime\python\python.exe",
    "tools\convert_to_rlds.py",
    "frontend\trajectory3d.bundle.js",
    "frontend\assets\models\umi-gripper.glb",
    "frontend\lib\three\three.module.min.js",
    "frontend\lib\three\LICENSE"
)
foreach ($relativePath in $requiredStageFiles) {
    $requiredPath = Join-Path $stageRoot $relativePath
    if (-not [System.IO.File]::Exists($requiredPath)) {
        throw "Required package file is missing: $requiredPath"
    }
}

$stageFiles = Get-ChildItem -LiteralPath $stageRoot -Recurse -File
Write-Output ("Staging files: {0}, size: {1:N1} MiB" -f $stageFiles.Count, (($stageFiles | Measure-Object Length -Sum).Sum / 1MB))

$iscc = Find-InnoCompiler
& $iscc "/DAppVersion=$Version" (Join-Path $PSScriptRoot "installer.iss")
if ($LASTEXITCODE -ne 0) { throw "Inno Setup compilation failed" }

$installer = Join-Path $distRoot "UMI-Data-Capture-Platform-$Version-Setup.exe"
if (-not [System.IO.File]::Exists($installer)) { throw "Installer was not generated: $installer" }
Write-Output ("Installer ready: {0} ({1:N1} MiB)" -f $installer, ((Get-Item -LiteralPath $installer).Length / 1MB))
