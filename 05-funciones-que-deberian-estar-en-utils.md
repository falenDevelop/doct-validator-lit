---
id: 5
title: Funciones que deberían estar en utils
intro: Lógica que no depende de la instancia.
---

## a) Lógica sin estado de instancia
Métodos que no usan this ni generan HTML se ubican en utils/ o, si transforman datos, en mapper/.

```javascript incorrecto
formatName(name) {
  return name.trim();
}
```

```javascript correcto
// utils/format-name.js
export function formatName(name) {
  return name.trim();
}
```

## b) HTML sin estado de instancia
Los métodos que generan HTML sin usar this deberían ser estáticos, no moverse a utils/.

```javascript incorrecto
emptyMessage() {
  return html`<p>No results</p>`;
}
```

```javascript correcto
static emptyMessage() {
  return html`<p>No results</p>`;
}
```

## c) Excepciones
Se exceptúan constructor, render y los métodos especiales de Lit (connectedCallback, disconnectedCallback, attributeChangedCallback, adoptedCallback, firstUpdated, updated, update, willUpdate, shouldUpdate, createRenderRoot, getUpdateComplete). No aplica a utils/, node_modules/, *.test.js ni *.css.js.
