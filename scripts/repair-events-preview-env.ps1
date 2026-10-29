$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath ([System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..')))
$repairPath = Join-Path (Get-Location).Path '.env.events.preview.local'
try {
  & git check-ignore --quiet .env.events.preview.local
  if ($LASTEXITCODE -ne 0) { throw 'File must be Git ignored.' }
  $repairAcl = Get-Acl -LiteralPath $repairPath
  $repairIdentity = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
  $repairRules = $repairAcl.GetAccessRules($true,$true,[System.Security.Principal.SecurityIdentifier])
  if (-not $repairAcl.AreAccessRulesProtected -or @($repairRules | Where-Object { $_.AccessControlType -eq 'Allow' -and $_.IdentityReference.Value -ne $repairIdentity.Value }).Count) { throw 'Private ACL required.' }
  $repairClipboard = Get-Clipboard -Raw
  if (-not $repairClipboard) { throw 'Empty clipboard.' }
  # Pass the secret through redirected stdin, never command arguments, env or stdout.
  $repairStart = [System.Diagnostics.ProcessStartInfo]::new()
  $repairStart.FileName = (Get-Command node -ErrorAction Stop).Source
  $repairStart.Arguments = 'scripts/repair-events-preview-env.mjs'
  $repairStart.WorkingDirectory = (Get-Location).Path
  $repairStart.UseShellExecute = $false
  $repairStart.CreateNoWindow = $true
  $repairStart.RedirectStandardInput = $true
  $repairStart.RedirectStandardOutput = $true
  $repairStart.RedirectStandardError = $true
  $repairProcess = [System.Diagnostics.Process]::Start($repairStart)
  $repairProcess.StandardInput.Write($repairClipboard)
  $repairProcess.StandardInput.Close()
  $repairClipboard = $null
  $repairOutput = $repairProcess.StandardOutput.ReadToEnd()
  $repairError = $repairProcess.StandardError.ReadToEnd()
  $repairProcess.WaitForExit()
  # Emit only parsed, expected safe fields from the helper.
  if ($repairProcess.ExitCode -ne 0) {
    $repairResult = $repairError | ConvertFrom-Json
    Write-Output ('Repair stopped; secret hidden. Stage: ' + $repairResult.stage)
    exit 1
  }
  $repairResult = $repairOutput | ConvertFrom-Json
  [ordered]@{saved=[bool]$repairResult.saved;branchVerified=[bool]$repairResult.branchVerified;readOnly=[bool]$repairResult.readOnly;schemaReady=[bool]$repairResult.schemaReady;otherVariablesUnchanged=[bool]$repairResult.otherVariablesUnchanged;accidentalPrefixRemoved=[bool]$repairResult.accidentalPrefixRemoved} | ConvertTo-Json
} catch {
  Write-Output 'Repair stopped. Clipboard and connection details suppressed.'
  exit 1
} finally {
  $repairClipboard = $null
}
