---
id: 8
title: Métodos, getters y orden de la clase
intro: JSDoc de métodos y orden de secciones.
---

## a) Documentación
Métodos y getters llevan JSDoc con descripción. Se exceptúan constructor, render, getters estáticos especiales y ciclo de vida exceptuado.

```javascript incorrecto
reset() {
  this.amount = 0;
}
```

```javascript correcto
/**
 * Resets the amount.
 */
reset() {
  this.amount = 0;
}
```

## b) Parámetros
Los métodos con parámetros incluyen @param.

```javascript incorrecto
/**
 * Updates the amount.
 */
setAmount(amount) {}
```

```javascript correcto
/**
 * Updates the amount.
 * @param {Number} amount New amount.
 */
setAmount(amount) {}
```

## c) Privacidad
Los métodos cuyo nombre empieza con _ incluyen @private (no aplica a getters privados).

```javascript incorrecto
/**
 * Resets the amount.
 */
_reset() {}
```

```javascript correcto
/**
 * Resets the amount.
 * @private
 */
_reset() {}
```

## d) Eventos
Los métodos que emiten eventos incluyen @event en su JSDoc.

```javascript incorrecto
/**
 * Notifies that the amount changed.
 */
notifyChange() {
  this.dispatchEvent(new CustomEvent('amount-changed'));
}
```

```javascript correcto
/**
 * Notifies that the amount changed.
 * @event amount-changed
 */
notifyChange() {
  this.dispatchEvent(new CustomEvent('amount-changed'));
}
```

## e) Retorno HTML
Los métodos privados que retornan HTML incluyen @returns {TemplateResult} (no aplica a getters).

```javascript incorrecto
/**
 * Renders the title.
 * @private
 */
_titleTemplate() {
  return html`<h1>${this.title}</h1>`;
}
```

```javascript correcto
/**
 * Renders the title.
 * @private
 * @returns {TemplateResult}
 */
_titleTemplate() {
  return html`<h1>${this.title}</h1>`;
}
```

## f) Orden de secciones
1) static get is(). 2) scopedElements. 3) properties. 4) constructor. 5) Ciclo de vida. 6) Métodos públicos. 7) Getters públicos. 8) Privados que no retornan HTML. 9) Privados que retornan HTML. 10) static get styles(). 11) render().

```javascript incorrecto
class Feature extends LitElement {
  render() {}
  reset() {}
  static get properties() {}
}
```

```javascript correcto
class Feature extends LitElement {
  static get properties() {}
  reset() {}
  render() {}
}
```

## g) Excepciones de ciclo de vida
No siguen el orden: connectedCallback, disconnectedCallback, updated, firstUpdated, attributeChangedCallback, adoptedCallback, requestUpdate, performUpdate, scheduleUpdate y getUpdateComplete.

## h) Nombres duplicados
No se redefinen métodos o getters con el mismo nombre.

```javascript incorrecto
reset() { this.amount = 0; }
reset() { this.name = ''; }
```

```javascript correcto
reset() {
  this.amount = 0;
  this.name = '';
}
```

## i) Contenido duplicado
No se repiten definiciones idénticas de métodos o getters.
