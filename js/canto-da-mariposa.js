(function () {
  const data = window.SV_CANTO_DA_MARIPOSA;
  if (!data) return;
  const el = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const meta = [
    ['Designação anterior', data.formerTitle], ['Identificador', data.identifier], ['Local', data.location],
    ['Estado', data.status], ['Nível de ameaça', data.threatLevel], ['Nível de acesso', data.accessLevel],
    ['Agentes mobilizados', data.mobilized], ['Baixas confirmadas', data.casualties], ['Reclassificação', data.reclassifiedAt]
  ];
  el('operation-meta').innerHTML = meta.map(([key,value]) => `<div><dt>${escape(key)}</dt><dd>${escape(value)}</dd></div>`).join('');
  el('operation-states').innerHTML = data.states.map(state => `<div class="state-item"><span>${escape(state)}</span></div>`).join('');
  el('operation-timeline').innerHTML = data.timeline.map(([date,text]) => `<li><time>${escape(date)}</time><p>${escape(text)}</p></li>`).join('');
  el('operation-agents').innerHTML = data.agents.map((agent,index) => `<article class="agent-card"><span class="agent-number">ALPHA-${String(index + 1).padStart(2,'0')}</span><h3>${escape(agent.name)}</h3><p>${escape(agent.role)}</p><dl><div><dt>Estado</dt><dd>${escape(agent.state)}</dd></div><div><dt>Última localização</dt><dd>${escape(agent.location)}</dd></div><div><dt>Registro</dt><dd>${escape(agent.record)}</dd></div></dl></article>`).join('');
  el('operation-files').innerHTML = data.files.map(row => { const access=row[6],action=row[7] ? `<a href="${escape(row[7])}">Abrir registro</a>` : `<span class="${access === 'Bloqueado' ? 'access-blocked' : 'access-partial'}">${escape(access)}</span>`; return `<tr>${row.slice(0,6).map(value => `<td>${escape(value)}</td>`).join('')}<td>${action}</td></tr>`; }).join('');
  el('operation-places').innerHTML = data.places.map(([name,detail],index) => `<div><button class="record-button" type="button" aria-expanded="false" aria-controls="place-${index}"><strong>${escape(name)}</strong><span>abrir registro</span></button><p class="record-detail" id="place-${index}" hidden>${escape(detail)}</p></div>`).join('');
  document.querySelectorAll('.record-button').forEach(button => button.addEventListener('click', () => { const open=button.getAttribute('aria-expanded')==='true'; button.setAttribute('aria-expanded',String(!open)); document.getElementById(button.getAttribute('aria-controls')).hidden=open; button.querySelector('span').textContent=open?'abrir registro':'fechar registro'; }));
  el('operation-evidence').innerHTML = data.evidence.map(([id,description,origin,condition,risk,detail],index) => `<article class="evidence-card"><b>EVIDÊNCIA ${escape(id)}</b><p>${escape(description)}</p><small>Origem: ${escape(origin)}</small><small>Condição: ${escape(condition)}</small><small>Risco: ${escape(risk)}</small><button class="evidence-toggle" type="button" aria-expanded="false" aria-controls="evidence-${index}">Examinar detalhes</button><p id="evidence-${index}" class="evidence-detail" hidden>${escape(detail)}</p></article>`).join('');
  document.querySelectorAll('.evidence-toggle').forEach(button => button.addEventListener('click', () => { const open=button.getAttribute('aria-expanded')==='true'; button.setAttribute('aria-expanded',String(!open)); document.getElementById(button.getAttribute('aria-controls')).hidden=open; button.textContent=open?'Examinar detalhes':'Ocultar detalhes'; }));
  el('operation-classified').innerHTML = data.classified.map(([title,state]) => `<article class="classified-card" aria-label="${escape(title)}: ${escape(state)}"><h3>${escape(title)}</h3><strong>▣ ${escape(state)}</strong></article>`).join('');
  el('copy-id').addEventListener('click', async () => { try { await navigator.clipboard.writeText(data.identifier); el('copy-status').textContent='IDENTIFICADOR COPIADO: '+data.identifier; } catch (_) { el('copy-status').textContent='IDENTIFICADOR: '+data.identifier; } });
})();
