Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " JUTH Enterprise Architecture Cleanup"
Write-Host " Sprint 003A"
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$ProjectRoot = Resolve-Path "$PSScriptRoot\..\..\.."

Write-Host "Project Root:"
Write-Host $ProjectRoot
Write-Host ""

Write-Host "Checking Patient Workspace..."

$Module = Join-Path $ProjectRoot "apps\staff-portal\src\modules\patient-workspace"

if(Test-Path $Module)
{
    Write-Host "? Patient Workspace Found" -ForegroundColor Green
}
else
{
    Write-Host "Patient Workspace Missing" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Architecture cleanup initialized." -ForegroundColor Green
