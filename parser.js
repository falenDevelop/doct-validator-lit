/*
 * Convierte un archivo .md en una sección {id, title, intro, items}.
 * Formato: ver _plantilla.md
 */
function parsearSeccion(texto) {
  const lineas = texto.replace(/\r/g, '').split('\n');
  const sec = { id: '', title: '', intro: '', items: [] };
  let i = 0;

  if (lineas[0].trim() === '---') {
    for (i = 1; i < lineas.length && lineas[i].trim() !== '---'; i++) {
      const m = lineas[i].match(/^(\w+):\s*(.*)$/);
      if (m) sec[m[1]] = m[2].trim();
    }
    i++;
  }

  let item = null, fence = null;
  const cerrar = () => { if (item) { item.rule = item.reglaLineas.join('\n').trim(); delete item.reglaLineas; sec.items.push(item); } };

  for (; i < lineas.length; i++) {
    const l = lineas[i];
    if (fence) {
      if (l.trim() === '```') {
        if (fence.kind) item[fence.kind] = fence.code.join('\n');
        if (fence.lang) item.lang = fence.lang;
        fence = null;
      } else fence.code.push(l);
      continue;
    }
    const h = l.match(/^##\s+([A-Za-z0-9]+)\)\s*(.+)$/);
    if (h) { cerrar(); item = { id: h[1], title: h[2].trim(), rule: '', bad: '', good: '', lang: 'javascript', reglaLineas: [] }; continue; }
    const f = l.match(/^```(\S*)\s*(\S*)/);
    if (f && item) {
      const kind = { incorrecto: 'bad', correcto: 'good' }[f[2]] || '';
      fence = { lang: f[1], kind, code: [] };
      continue;
    }
    if (item) item.reglaLineas.push(l);
  }
  cerrar();
  return sec;
}
if (typeof module !== 'undefined') module.exports = { parsearSeccion };
