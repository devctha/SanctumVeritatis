param([string]$Root = (Get-Location).Path)

$ErrorActionPreference = 'Stop'
$htmlFiles = Get-ChildItem -LiteralPath $Root -Recurse -File -Filter '*.html' | Where-Object { $_.FullName -notmatch '[\\/]docs[\\/]' }
$allFiles = Get-ChildItem -LiteralPath $Root -Recurse -File | Where-Object { $_.FullName -notmatch '[\\/]\.git[\\/]' -and $_.FullName -notmatch '[\\/]docs[\\/]' -and $_.FullName -notmatch '[\\/]tools[\\/]' -and $_.Name -ne 'audit-data.json' }

function Decode([string]$value) {
  if (-not $value) { return '' }
  return [Net.WebUtility]::HtmlDecode(($value -replace '<[^>]+>', ' ' -replace '\s+', ' ')).Trim()
}

function Relative([string]$base, [string]$target) {
  $basePath = [IO.Path]::GetFullPath($base).TrimEnd('\\')
  $targetPath = [IO.Path]::GetFullPath($target)
  if ($targetPath.StartsWith($basePath, [StringComparison]::OrdinalIgnoreCase)) {
    return $targetPath.Substring($basePath.Length).TrimStart('\\').Replace('\\','/')
  }
  return $targetPath.Replace('\\','/')
}

$pages = foreach ($file in $htmlFiles) {
  $relative = Relative $Root $file.FullName
  $raw = if ($file.Length) { Get-Content -Raw -Encoding UTF8 -LiteralPath $file.FullName } else { '' }
  $title = if ($raw -match '(?is)<title[^>]*>(.*?)</title>') { Decode $Matches[1] } else { '' }
  $h1 = if ($raw -match '(?is)<h1[^>]*>(.*?)</h1>') { Decode $Matches[1] } else { '' }
  $links = @([regex]::Matches($raw, '(?is)(?:href|src)\s*=\s*["'']([^"''#]+)') | ForEach-Object { $_.Groups[1].Value.Trim() } | Sort-Object -Unique)
  $outgoing = @($links | Where-Object { $_ -notmatch '^(?:https?:|mailto:|tel:|data:|javascript:)' })
  $resolved = foreach ($link in $outgoing) {
    $clean = ($link -split '[?#]')[0]
    if (-not $clean) { continue }
    $target = if ($clean.StartsWith('/')) { Join-Path $Root $clean.TrimStart('/') } else { Join-Path $file.DirectoryName $clean }
    [pscustomobject]@{ link=$link; exists=(Test-Path -LiteralPath $target); target=(Relative $Root $target) }
  }
  $markers = @()
  $tests = [ordered]@{
    'window.location'='window\.location|location\.(?:href|replace|assign)'
    'localStorage'='localStorage'
    'sessionStorage'='sessionStorage'
    'senha/credencial'='(?i)senha|password|credential|credencial|username|usu[aá]rio'
    'base64'='(?i)atob\s*\(|btoa\s*\(|base64'
    'oculto'='(?i)display\s*:\s*none|visibility\s*:\s*hidden|hidden\s*=|type\s*=\s*["'']hidden'
    'clique'='(?i)dblclick|ondblclick|onclick|addEventListener\s*\(\s*["''](?:click|dblclick)'
    'teclado'='(?i)keydown|keyup|keypress|accesskey'
    'parâmetro URL'='(?i)URLSearchParams|location\.search|location\.hash'
    'comentário'='<!--|/\*|(^|\s)//'
  }
  foreach ($item in $tests.GetEnumerator()) { if ($raw -match $item.Value) { $markers += $item.Key } }
  $keywords = @('Sanctum','Setentrional','Sintech','Aurora','Valyria','Draconia','Lótus','Lotus','Escarlate','NCM','Ordo','Ordem','SALA','SAS','São Firmo','Membrana') | Where-Object { $raw -match [regex]::Escape($_) }
  [pscustomobject]@{
    path=$relative; bytes=$file.Length; title=$title; h1=$h1; links=$links; resolved=$resolved
    markers=$markers; keywords=$keywords
  }
}

$incoming = @{}
foreach ($page in $pages) {
  foreach ($r in $page.resolved) {
    if ($r.exists -and $r.target -match '\.html$') {
      if (-not $incoming.ContainsKey($r.target)) { $incoming[$r.target] = @() }
      $incoming[$r.target] += $page.path
    }
  }
}
foreach ($page in $pages) {
  $page | Add-Member -NotePropertyName incoming -NotePropertyValue @($incoming[$page.path] | Sort-Object -Unique)
}

$assets = foreach ($file in $allFiles | Where-Object Extension -NotIn @('.html','.js')) {
  [pscustomobject]@{ path=(Relative $Root $file.FullName); bytes=$file.Length; extension=$file.Extension.ToLowerInvariant() }
}

$result = [pscustomobject]@{
  generated=(Get-Date).ToString('s'); root=$Root; pageCount=$pages.Count; fileCount=$allFiles.Count
  pages=$pages; assets=$assets
}
$out = Join-Path $Root 'audit-data.json'
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $out -Encoding utf8
Write-Output $out





