---
id: 9
title: Documentación de la clase
intro: JSDoc de la clase exportada.
---

## a) JSDoc
La clase exportada tiene un bloque JSDoc /** ... */ encima.

```javascript incorrecto
export class UserCard extends LitElement {}
```

```javascript correcto
/**
 * Displays a user card.
 */
export class UserCard extends LitElement {}
```

## b) Badge
El JSDoc incluye el badge ![Lit component](https://img.shields.io/badge/Lit-component-blue.svg).

```javascript correcto
/**
 * ![Lit component](https://img.shields.io/badge/Lit-component-blue.svg)
 * Displays a user card.
 */
```

## c) Descripción
La clase tiene una descripción; se recomienda escribirla en inglés.

```javascript incorrecto
/**
 * @customElement user-card
 * @LitElement
 */
```

```javascript correcto
/**
 * Displays the user's card information.
 * @customElement user-card
 * @LitElement
 */
```

## d) Ejemplo de uso
El JSDoc incluye Example: y un bloque html con el nombre del componente definido en is().

```javascript incorrecto
/**
 * Example:
 * html
 * <other-card></other-card>
 */
```

```javascript correcto
/**
 * Example:
 * html
 * <user-card></user-card>
 */
```

## e) Etiquetas obligatorias
Se incluyen @customElement, @LitElement y @appliesMixin.

```javascript incorrecto
/**
 * Displays a user card.
 * @customElement user-card
 */
```

```javascript correcto
/**
 * Displays a user card.
 * @customElement user-card
 * @LitElement
 * @appliesMixin FeatureMixin
 */
```

## f) Eventos
La cantidad de @fires en el JSDoc de clase coincide con los nombres de evento distintos documentados con @event en el archivo. Cada entrada sigue @fires {propiedad} nombre-evento - Descripción o @fires {propiedad, otraPropiedad} nombre-evento - Descripción.

```javascript incorrecto
/** @fires amount-changed */   // clase
/** @event amount-changed */
/** @event card-selected */
```

```javascript correcto
/**
 * @fires {amount} amount-changed - Amount changed.
 * @fires {card, position} card-selected - Card selected.
 */
```

## g) Orden recomendado
Badge, descripción, ejemplo, @customElement, @LitElement, @appliesMixin y @fires. Es una recomendación, no una regla obligatoria.
