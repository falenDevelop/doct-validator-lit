---
id: 8
title: Métodos, getters y orden de la clase
intro: JSDoc de métodos y orden de secciones.
---

## a) Documentación
Métodos y getters llevan JSDoc con descripción. Se exceptúan is, constructor, properties, styles, render, init, reset y los métodos estándar del ciclo de vida.

```javascript incorrecto
/**
 * Resets the amount.
 */
reset() {
  this.amount = 0;
}
```

```javascript correcto
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
Los métodos que emiten eventos incluyen @event nombre-del-evento en su JSDoc.

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
 * Renders the card title.
 * @private
 */
_titleTemplate() {
  return html`<h1>${this.cardTitle}</h1>`;
}
```

```javascript correcto
/**
 * Renders the card title.
 * @private
 * @returns {TemplateResult}
 */
_titleTemplate() {
  return html`<h1>${this.cardTitle}</h1>`;
}
```

## f) Orden de secciones
1) static get is(). 2) scopedElements. 3) properties. 4) constructor. 5) Getters. 6) Métodos públicos. 7) Métodos privados. 8) Métodos que retornan HTML. 9) static get styles(). 10) render().

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

## j) Getters estáticos
Un getter que no utiliza this ni estado de instancia se declara con static.

```javascript incorrecto
get defaultAmount() {
  return 0;
}
```

```javascript correcto
static get defaultAmount() {
  return 0;
}
```

## k) Nombres descriptivos
Métodos, variables, getters y funciones usan nombres específicos que expresan su propósito; se evitan nombres genéricos como data, value, item o process.

## l) API pública de features
Una feature solo expone init y reset como métodos públicos. El resto de su comportamiento se encapsula en métodos privados o se comunica mediante eventos.

## m) Cantidad de parámetros
Los métodos aceptan como máximo tres parámetros. Cuando necesitan más datos, reciben un objeto.

```javascript incorrecto
updateUser(name, email, phone, address) {}
```

```javascript correcto
updateUser({ name, email, phone, address }) {}
```

## n) Nombre de funciones
Los métodos y funciones usan lowerCamelCase y siguen la estructura verbo + sustantivo, por ejemplo getUserData o saveForm.

## o) Prefijo de eventos
El nombre de cada evento comienza con el nombre del componente declarado en static get is().

```javascript incorrecto
static get is() {
  return 'membership-detail-panel';
}

this.dispatchEvent(new CustomEvent('detail-open'));
```

```javascript correcto
static get is() {
  return 'membership-detail-panel';
}

this.dispatchEvent(new CustomEvent('membership-detail-panel-detail-open'));
```

## p) Nombre del componente
Todo componente declara obligatoriamente static get is() y retorna su nombre en kebab-case.

```javascript incorrecto
export class MembershipDetailPanel extends LitElement {}
```

```javascript correcto
export class MembershipDetailPanel extends LitElement {
  static get is() {
    return 'membership-detail-panel';
  }
}
```

## q) Contexto de listeners imperativos
Al registrar un listener con addEventListener, se conserva el contexto de this mediante bind(this) o una función flecha.

```javascript incorrecto
button.addEventListener('click', this._onButtonClick);
```

```javascript correcto
button.addEventListener('click', this._onButtonClick.bind(this));
```
