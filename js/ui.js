const root = document.documentElement;
const body = document.body;

document.querySelectorAll('[data-nav-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const stability = localStorage.getItem('sv-stability') === 'true';
root.classList.toggle('stability', stability);
document.querySelectorAll('[data-stability]').forEach(button => {
  button.setAttribute('aria-pressed', String(stability));
  button.addEventListener('click', () => {
    const enabled = !root.classList.contains('stability');
    root.classList.toggle('stability', enabled);
    localStorage.setItem('sv-stability', String(enabled));
    button.setAttribute('aria-pressed', String(enabled));
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') body.classList.remove('nav-open');
  if (event.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
    const search = document.querySelector('[data-global-search]');
    if (search) { event.preventDefault(); search.focus(); }
  }
});

const clocks=document.querySelectorAll('[data-clock]');
if(clocks.length){const tick=()=>clocks.forEach(clock=>clock.textContent=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date()));tick();setInterval(tick,1000)}
