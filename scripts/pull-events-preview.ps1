param([string]$VercelScope = '', [switch]$CreateTemplate)
$ErrorActionPreference = 'Stop'
$previewRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -LiteralPath $previewRoot
if ($VercelScope -and $VercelScope -notmatch '^[A-Za-z0-9][A-Za-z0-9_-]*$') { throw 'Некорректный идентификатор команды Vercel.' }
$previewDestination = Join-Path $previewRoot '.env.events.preview.local'
if (Test-Path -LiteralPath $previewDestination) { throw 'Preview-файл уже существует. Автоматическая перезапись запрещена.' }
& git check-ignore --quiet .env.events.preview.local
if ($LASTEXITCODE -ne 0) { throw 'Preview-файл не защищён .gitignore.' }

function New-PrivatePreviewFile([string]$Path) {
  New-Item -ItemType File -Path $Path -ErrorAction Stop | Out-Null
  if ($Path -eq $previewDestination) { $script:previewDestinationOwned = $true }
  if ($Path -eq $previewTemporary) { $script:previewTemporaryOwned = $true }
  $previewIdentity = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
  $previewAcl = [System.Security.AccessControl.FileSecurity]::new()
  $previewAcl.SetOwner($previewIdentity)
  $previewAcl.SetAccessRuleProtection($true, $false)
  $previewAcl.AddAccessRule([System.Security.AccessControl.FileSystemAccessRule]::new($previewIdentity, 'FullControl', 'Allow'))
  Set-Acl -LiteralPath $Path -AclObject $previewAcl
}

if ($CreateTemplate) {
  $previewDestinationOwned = $false
  try {
    New-PrivatePreviewFile $previewDestination
    @'
# Insert only the connection of an isolated Neon Preview branch in your own editor.
# Do not print this file or share it in chat. Do not use the Production branch.
NEON_DATABASE_URL=""
NEON_DATABASE_URL_UNPOOLED=""
EVENTS_DATABASE_URL=""
EVENTS_MIGRATION_DATABASE_URL=""
VERCEL_ENV="preview"
EVENTS_ALLOW_SHARED_DATABASE="false"
LEGACY_USE_NEON_DATABASE="false"
'@ | Set-Content -LiteralPath $previewDestination -Encoding utf8
    Write-Output '{"templateCreated":true,"containsSecrets":false,"file":".env.events.preview.local"}'
  } catch {
    if ($previewDestinationOwned -and (Test-Path -LiteralPath $previewDestination)) { Remove-Item -LiteralPath $previewDestination -Force }
    throw 'Не удалось подготовить приватный шаблон. Значения не выводились.'
  }
  return
}

& npx --yes vercel@65.7.0 whoami *> $null
if ($LASTEXITCODE -ne 0) { throw 'Сначала выполните npx --yes vercel@65.7.0 login в своём терминале. Коды и токены не присылайте.' }

$previewTemporaryName = '.env.events.preview.pending.' + [guid]::NewGuid().ToString('N')
$previewTemporary = Join-Path $previewRoot $previewTemporaryName
$previewSaved = $false
$previewDestinationOwned = $false
$previewTemporaryOwned = $false
try {
  New-PrivatePreviewFile $previewTemporary
  $previewArguments = @('--yes', 'vercel@65.7.0', 'env', 'pull', $previewTemporaryName, '--environment=preview', '--project=rentplacemd', '--yes')
  if ($VercelScope) { $previewArguments += @('--scope', $VercelScope) }
  # --yes only overwrites our freshly created empty private temporary file.
  & npx @previewArguments *> $null
  if ($LASTEXITCODE -ne 0) { throw 'Не удалось получить Preview. Проверьте вход, существующий проект rentplacemd и выбранную команду Vercel.' }
  # Verify the original private ACL survived the CLI write. Do not attempt to
  # copy audit/ownership metadata that may require SeSecurityPrivilege.
  $previewAcl = Get-Acl -LiteralPath $previewTemporary
  $previewIdentity = [System.Security.Principal.WindowsIdentity]::GetCurrent().User
  $previewRules = $previewAcl.GetAccessRules($true, $true, [System.Security.Principal.SecurityIdentifier])
  $previewUnexpectedAccess = @($previewRules | Where-Object { $_.AccessControlType -eq 'Allow' -and $_.IdentityReference.Value -ne $previewIdentity.Value })
  if (-not $previewAcl.AreAccessRulesProtected -or $previewUnexpectedAccess.Count -gt 0) { throw 'CLI изменил приватные права файла; выгрузка не будет сохранена.' }
  New-PrivatePreviewFile $previewDestination
  & node scripts/save-events-preview-env.mjs $previewTemporaryName
  if ($LASTEXITCODE -ne 0) { throw 'Проверка Preview-переменных не прошла; значения скрыты.' }
  $previewSaved = $true
} finally {
  # These are precisely named files created by this invocation, never user data.
  if ($previewTemporaryOwned -and (Test-Path -LiteralPath $previewTemporary)) { Remove-Item -LiteralPath $previewTemporary -Force }
  if ($previewDestinationOwned -and -not $previewSaved -and (Test-Path -LiteralPath $previewDestination)) { Remove-Item -LiteralPath $previewDestination -Force }
}
