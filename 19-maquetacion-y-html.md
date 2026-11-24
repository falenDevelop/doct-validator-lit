---
id: 19
title: Maquetación y HTML
intro: Semántica, estilos y composición del template.
---

## a) Contenedor principal
El render principal evita div genéricos como contenedor. Utiliza elementos semánticos o componentes adecuados al contexto.

```javascript incorrecto
render() {
  return html`<div>${this.content}</div>`;
}
```

```javascript correcto
render() {
  return html`<main>${this.content}</main>`;
}
```

## b) Iconos de acción
Un icono que ejecuta una acción al pulsarlo se implementa con bbva-type-link, no con un elemento genérico.

```html incorrecto
<span @click=${this.openDetails}>Open</span>
```

```html correcto
<bbva-type-link @click=${this.openDetails}>Open</bbva-type-link>
```

## c) Estilos inline
Los tags y componentes no usan el atributo style, tampoco para asignar variables BBVA. Los estilos se declaran en SCSS mediante clases o selectores.

```html incorrecto
<section style="color: var(--colorsPrimaryCoreLightened)"></section>
```

```html correcto
<section class="summary"></section>
```

## d) Extensión del render
El render se divide en métodos de template cuando incluye más de dos componentes básicos o varias secciones o contenedores.

```javascript correcto
render() {
  return html`
    ${this._headerTemplate()}
    ${this._contentTemplate()}
  `;
}
```

## e) IDs descriptivos
Los atributos id son descriptivos y semánticos; se evitan valores genéricos o únicamente numéricos.

```html incorrecto
<input id="1">
```

```html correcto
<input id="termAndCondCheck">
```
