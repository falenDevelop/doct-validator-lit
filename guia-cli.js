/* Carga guia-cli-componentes.md, la convierte a HTML y genera el índice del sidebar. */
const GUIA_MD = 'guia-cli-componentes.md';

function slugificar(texto) {
  return texto.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

function construirIndice(contenido) {
  const toc = document.getElementById('toc');
  contenido.querySelectorAll('h2').forEach(h => {
    h.id = slugificar(h.textContent);
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    toc.append(a);
  });
}

function activarResaltado(contenido) {
  if (!window.hljs) return;
  contenido.querySelectorAll('pre code').forEach(c => hljs.highlightElement(c));
}

async function cargarGuia() {
  const contenido = document.getElementById('content');
  try {
    const r = await fetch(GUIA_MD);
    if (!r.ok) throw new Error('No existe ' + GUIA_MD);
    contenido.innerHTML = marked.parse(await r.text());
    construirIndice(contenido);
    activarResaltado(contenido);
  } catch (e) {
    contenido.innerHTML = '<div class="empty"><strong>No se pudo cargar la guía.</strong><br>' + e.message +
      '<br><br>Abre la carpeta con un servidor local, por ejemplo <code>npx serve</code> o <code>python -m http.server</code>.</div>';
  }
}

const side = document.getElementById('sidebar');
document.getElementById('menuBtn').addEventListener('click', () => side.classList.toggle('open'));
document.getElementById('nav').addEventListener('click', () => side.classList.remove('open'));

cargarGuia();
