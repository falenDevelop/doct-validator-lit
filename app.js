/* Carga index.json y cada .md; luego dibuja la página (iniciar). */
let SECTIONS = [];

function reglaNode(texto) {
  const p = document.createElement('p');
  p.className = 'rule';
  texto.split(/(`[^`]+`)/).forEach(t => {
    if (t.length > 2 && t[0] === '`' && t.endsWith('`')) {
      const c = document.createElement('code'); c.textContent = t.slice(1, -1); p.append(c);
    } else p.append(document.createTextNode(t));
  });
  return p;
}

function mostrarError(msg) {
  const d = document.createElement('div');
  d.className = 'empty';
  d.innerHTML = '<strong>No se pudo cargar el contenido.</strong><br>' + msg +
    '<br><br>Abre la carpeta con un servidor local, por ejemplo:<br><code>npx serve</code> o <code>python -m http.server</code>, ' +
    'o usa la extensión Live Server de VS Code.';
  document.getElementById('content').append(d);
}

async function cargar() {
  try {
    const lista = await (await fetch('index.json')).json();
    const textos = await Promise.all(lista.map(async f => {
      const r = await fetch(f);
      if (!r.ok) throw new Error('No existe ' + f);
      return r.text();
    }));
    SECTIONS = textos.map(parsearSeccion);
    iniciar();
  } catch (e) {
    mostrarError(e.message);
  }
}

function iniciar() {
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; };

  function codeBlock(kind, code, lang) {
    const box = el('div', 'ex ' + kind);
    const bar = el('div', 'ex-bar');
    bar.append(el('span', '', kind === 'bad' ? 'Incorrecto' : 'Correcto'));
    const btn = el('button', 'copy', 'Copiar');
    btn.type = 'button';
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(code); btn.textContent = 'Copiado'; btn.classList.add('ok'); }
      catch (e) { btn.textContent = 'No se pudo'; }
      setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('ok'); }, 1500);
    });
    bar.append(btn);
    const pre = el('pre'), c = el('code', 'language-' + (lang || 'javascript'));
    c.textContent = code;
    pre.append(c); box.append(bar, pre);
    if (window.hljs) hljs.highlightElement(c);
    return box;
  }

  function itemNode(sec, it) {
    const art = el('article', 'item' + (it.bad || it.good ? '' : ' no-code'));
    art.id = 'c-' + sec.id + it.id;
    art.dataset.search = (sec.title + ' ' + it.title + ' ' + it.rule).toLowerCase();
    const head = el('div', 'item-head');
    head.append(el('span', 'item-id', it.id), el('h3', '', it.title));
    art.append(head, reglaNode(it.rule));
    if (it.bad || it.good) {
      const grid = el('div', 'examples');
      if (it.bad) grid.append(codeBlock('bad', it.bad, it.lang));
      if (it.good) grid.append(codeBlock('good', it.good, it.lang));
      art.append(grid);
    }
    return art;
  }

  const nav = $('#nav'), content = $('#content');
  SECTIONS.forEach(sec => {
    const a = el('a'); a.href = '#s-' + sec.id;
    a.append(el('b', '', sec.id), document.createTextNode(sec.title));
    nav.append(a); sec.link = a;

    const s = el('section', 'sec'); s.id = 's-' + sec.id;
    const h = el('div', 'sec-head'); h.append(el('span', 'num', sec.id), el('h2', '', sec.title));
    s.append(h);
    if (sec.intro) s.append(el('p', 'sec-sub', sec.intro));
    sec.items.forEach(it => { s.append(itemNode(sec, it)); });
    content.append(s); sec.node = s;
  });

  $('#search').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    let shown = 0;
    SECTIONS.forEach(sec => {
      let any = 0;
      sec.node.querySelectorAll('.item').forEach(i => {
        const ok = !q || i.dataset.search.includes(q);
        i.hidden = !ok; if (ok) any++;
      });
      sec.node.hidden = !any; sec.link.classList.toggle('hidden', !any); shown += any;
    });
    $('#empty').hidden = shown > 0;
  });

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  }), { rootMargin: '-80px 0px -70% 0px' });
  SECTIONS.forEach(s => io.observe(s.node));

  const side = $('#sidebar');
  $('#menuBtn').addEventListener('click', () => side.classList.toggle('open'));
  nav.addEventListener('click', () => side.classList.remove('open'));
}

cargar();
