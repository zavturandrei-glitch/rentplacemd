param([string]$VercelScope = '')
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath ([System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..')))
if ($VercelScope -and $VercelScope -notmatch '^[A-Za-z0-9][A-Za-z0-9_-]*$') { throw 'Invalid scope.' }
$inspectionName = '.env.events.remote-check.' + [guid]::NewGuid().ToString('N')
$inspectionPath = Join-Path (Get-Location).Path $inspectionName
$inspectionCreated = $false
$inspectionStage = 'prepare-private-file'
try {
  & git check-ignore --quiet $inspectionName
  if ($LASTEXITCODE -ne 0) { throw 'Temporary path must be ignored.' }
  New-Item -ItemType File -Path $inspectionPath -ErrorAction Stop | Out-Null
  $inspectionCreated = $true
  $inspectionIdentity = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
  $inspectionAcl = [System.Security.AccessControl.FileSecurity]::new()
  $inspectionAcl.SetOwner($inspectionIdentity)
  $inspectionAcl.SetAccessRuleProtection($true, $false)
  $inspectionAcl.AddAccessRule([System.Security.AccessControl.FileSystemAccessRule]::new($inspectionIdentity, 'FullControl', 'Allow'))
  Set-Acl -LiteralPath $inspectionPath -AclObject $inspectionAcl
  $inspectionArgs = @('--yes','vercel@65.7.0','env','pull',$inspectionName,'--environment=preview','--project=rentplacemd','--yes')
  if ($VercelScope) { $inspectionArgs += @('--scope',$VercelScope) }
  $inspectionStage = 'pull-preview'
  $ErrorActionPreference = 'Continue'
  & npx @inspectionArgs *> $null
  $inspectionExit = $LASTEXITCODE
  $ErrorActionPreference = 'Stop'
  if ($inspectionExit -ne 0) { throw 'Preview export failed. Details suppressed.' }
  $inspectionStage = 'verify-private-acl'
  $inspectionReadAcl = Get-Acl -LiteralPath $inspectionPath
  $inspectionRules = $inspectionReadAcl.GetAccessRules($true,$true,[System.Security.Principal.SecurityIdentifier])
  if (-not $inspectionReadAcl.AreAccessRulesProtected -or @($inspectionRules | Where-Object { $_.AccessControlType -eq 'Allow' -and $_.IdentityReference.Value -ne $inspectionIdentity.Value }).Count) { throw 'Private ACL changed.' }
  $inspectionStage = 'inspect-safe-metadata'
  & node scripts/inspect-vercel-preview-env.mjs $inspectionName
  if ($LASTEXITCODE -ne 0) { throw 'Inspection failed. Details suppressed.' }
} catch {
  Write-Output ('{"inspectionFailed":true,"deploymentAllowed":false,"detailsSuppressed":true,"stage":"' + $inspectionStage + '"}')
  exit 1
} finally {
  # Delete only the exact file created by this invocation, never the owner's local env.
  if ($inspectionCreated -and (Test-Path -LiteralPath $inspectionPath)) { Remove-Item -LiteralPath $inspectionPath -Force }
}
