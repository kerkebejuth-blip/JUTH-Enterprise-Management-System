Write-Host ""
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host " JUTH Enterprise Architecture Audit"
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

$ProjectRoot = Resolve-Path "$PSScriptRoot\..\..\.."
$Src = Join-Path $ProjectRoot "apps\staff-portal\src"

$LogFolder = Join-Path $ProjectRoot "deployment\logs"

if (!(Test-Path $LogFolder)) {
    New-Item -ItemType Directory -Path $LogFolder | Out-Null
}

$Report = Join-Path $LogFolder "Architecture-Audit.txt"

"JUTH ENTERPRISE ARCHITECTURE AUDIT" | Set-Content $Report
"Generated: $(Get-Date)" | Add-Content $Report
"" | Add-Content $Report

Write-Host "Scanning folders..."

Get-ChildItem $Src -Directory |
Sort-Object Name |
ForEach-Object {

    Write-Host " - $($_.Name)"

    Add-Content $Report "================================="
    Add-Content $Report $_.FullName

    tree $_.FullName /F | Add-Content $Report

    Add-Content $Report ""
}

Write-Host ""
Write-Host "Searching for duplicate layouts..."

Get-ChildItem $Src -Recurse -Include *.tsx |
Select-String "MainLayout|Sidebar|Topbar|Router|ProtectedRoute|PatientWorkspaceLayout" |
Out-File (Join-Path $LogFolder "Duplicate-References.txt")

Write-Host ""
Write-Host "Searching imports..."

Get-ChildItem $Src -Recurse -Include *.ts,*.tsx |
Select-String "^import " |
Out-File (Join-Path $LogFolder "Imports.txt")

Write-Host ""
Write-Host "Audit completed." -ForegroundColor Green
Write-Host ""
Write-Host "Reports saved to:"
Write-Host $LogFolder
