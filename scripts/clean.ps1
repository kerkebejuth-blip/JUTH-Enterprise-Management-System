$ErrorActionPreference = "Stop"

$workspace = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")).Path
$targets = @(
  ".turbo",
  "apps/staff-portal/dist",
  "apps/staff-portal/.turbo",
  "apps/patient-portal/.turbo",
  "packages/api/dist",
  "packages/api/.turbo",
  "packages/auth/.turbo",
  "packages/config/.turbo",
  "packages/hooks/.turbo",
  "packages/types/dist",
  "packages/types/.turbo",
  "packages/ui/dist",
  "packages/ui/.turbo",
  "packages/utils/.turbo",
  "services/hos-api/dist",
  "services/hos-api/.turbo",
  "services/hos-api/coverage"
)

foreach ($target in $targets) {
  $resolved = Resolve-Path -LiteralPath (Join-Path $workspace $target) -ErrorAction SilentlyContinue

  if ($null -eq $resolved) {
    continue
  }

  foreach ($path in $resolved) {
    if ($path.Path -eq $workspace -or -not $path.Path.StartsWith($workspace + [System.IO.Path]::DirectorySeparatorChar)) {
      throw "Refusing to remove path outside workspace: $($path.Path)"
    }

    Remove-Item -LiteralPath $path.Path -Recurse -Force
  }
}
