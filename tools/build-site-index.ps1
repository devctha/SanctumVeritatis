param([string]$Root=(Get-Location).Path)
$audit=Get-Content -Raw -Encoding UTF8 (Join-Path $Root 'audit-data.json')|ConvertFrom-Json
function Category($p){$s=($p.path+' '+$p.title).ToLowerInvariant();if($s-match '^sala-|sala results'){return 'room'};if($s-match'terminal'){return 'terminal'};if($s-match'log|transcri|conversa|chat|diario'){return 'transmission'};if($s-match'agente|alicia|belladonna|brayfog|equipe'){return 'agent'};if($s-match'entidade|bestiario|criatura'){return 'entity'};if($s-match'artefato|reliqu|objeto'){return 'artifact'};if($s-match'opera|setentrional|aurora|vivarium|revive'){return 'operation'};if($s-match'index|hub|intranet|arquivo'){return 'index'};return 'document'}
function Operation($p){$s=($p.path+' '+$p.title+' '+($p.keywords-join' ')).ToLowerInvariant();if($s-match'setentrional|são firmo'){return 'setentrional'};if($s-match'aurora'){return 'aurora-de-vidro'};if($s-match'sintech'){return 'sintech'};if($s-match'lotus|lótus'){return 'lotus'};if($s-match'valyria|vidraceiro|westeros'){return 'valyria'};if($s-match'draconia|known-world'){return 'draconia'};if($s-match'escarlate'){return 'conselho-escarlate'};if($s-match'ncm|veracruz'){return 'ncm'};return 'geral'}
$pages=foreach($p in $audit.pages){
 $full=Join-Path $Root $p.path;$raw=if($p.bytes){Get-Content -Raw -Encoding UTF8 $full}else{''};$plain=[Net.WebUtility]::HtmlDecode(($raw-replace'(?is)<script.*?</script>|<style.*?</style>',' '-replace'<[^>]+>',' '-replace'\s+',' ')).Trim();$cat=Category $p;$op=Operation $p;$secret=($p.markers -contains'senha/credencial')-or $p.path-match'(?i)restrit|secret|topsecret|enigma|conselho|sintech|setor';$legacy=$p.path-match'(?i)ordo|ordem|SALA Results|SAS Results';$broken=@($p.resolved|?{-not $_.exists -and $_.link});$status=if($p.bytes-eq 0){'incomplete'}elseif($broken.Count){'review'}elseif($secret){'restricted'}else{'active'};$access=if($secret){4}elseif($cat-in@('operation','agent','entity','artifact')){2}else{1}
 [ordered]@{id=($p.path-replace'[^a-zA-Z0-9]+','-').Trim('-').ToLowerInvariant();title=if($p.title){$p.title}else{$p.path};path=$p.path;url=$p.path;category=$cat;operation=$op;accessLevel=$access;status=$status;secret=$secret;legacy=$legacy;orphan=($p.incoming.Count-eq 0);incomplete=($p.bytes-eq 0);corrupted=($p.title+$p.path)-match'(?i)corromp|expurg|apagado|null';linksTo=@($p.resolved|?{$_.exists -and $_.target-match'\.html$'}|%{$_.target});linkedFrom=@($p.incoming);brokenLinks=@($broken|%{$_.link});markers=@($p.markers);tags=@($p.keywords);description=if($plain.Length-gt 260){$plain.Substring(0,260)+'…'}else{$plain};searchText=if($plain.Length-gt 3000){$plain.Substring(0,3000)}else{$plain}}
}
$result=[ordered]@{generated=(Get-Date).ToString('s');summary=[ordered]@{total=$pages.Count;operations=@($pages|Where-Object{$_.category -eq 'operation'}).Count;rooms=@($pages|Where-Object{$_.category -eq 'room'}).Count;secret=@($pages|Where-Object{$_.secret}).Count;orphan=@($pages|Where-Object{$_.orphan}).Count;broken=@($pages.brokenLinks).Count;restricted=@($pages|Where-Object{$_.accessLevel -ge 4}).Count;legacy=@($pages|Where-Object{$_.legacy}).Count;unclassified=@($pages|Where-Object{$_.category -eq 'document'}).Count};pages=$pages}
$data=Join-Path $Root 'data';New-Item -ItemType Directory -Force $data|Out-Null;$json=$result|ConvertTo-Json -Depth 8;Set-Content -Encoding UTF8 (Join-Path $data 'site-index.json') $json;Set-Content -Encoding UTF8 (Join-Path $data 'site-index.js') ("window.SV_SITE_INDEX = "+$json+";")
Write-Output "Indexadas $($pages.Count) páginas"







