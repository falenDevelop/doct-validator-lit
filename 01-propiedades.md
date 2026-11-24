---
id: 1
title: Propiedades
intro: Reglas para static get properties().
---

## a) Comentarios
No debe haber comentarios // dentro de static get properties(). La documentación se escribe con JSDoc.

```javascript incorrecto
// Display name.
name: {
  type: String,
},
```

```javascript correcto
/**
 * Display name.
 * @type {String}
 * @default ''
 */
name: {
  type: String,
},
```

## b) Públicas antes de privadas
Primero las propiedades públicas y después las privadas (las que empiezan con _).

```javascript incorrecto
_amount: { type: Number, state: true },
amount: { type: Number },
```

```javascript correcto
amount: { type: Number },
_amount: { type: Number, state: true },
```

## c) Orden alfabético de públicas
Las propiedades públicas van ordenadas alfabéticamente: amount, name, status.

```javascript incorrecto
status: { type: String },
amount: { type: Number },
```

```javascript correcto
amount: { type: Number },
status: { type: String },
```

## d) Orden alfabético de privadas
Las privadas se ordenan alfabéticamente dentro de su grupo: _amount, _name, _title.

```javascript incorrecto
_title: { type: String, state: true },
_amount: { type: Number, state: true },
_name: { type: String, state: true },
```

```javascript correcto
_amount: { type: Number, state: true },
_name: { type: String, state: true },
_title: { type: String, state: true },
```

## e) Formato en varias líneas
Cada propiedad se declara en varias líneas, con sus atributos separados.

```javascript incorrecto
name: { type: String },
```

```javascript correcto
name: {
  type: String,
},
```

## f) Documentación
Todas las propiedades llevan un bloque JSDoc /** ... */ con descripción. Un comentario /* ... */ no lo sustituye.

```javascript incorrecto
/* Display name. */
name: {
  type: String,
},
```

```javascript correcto
/**
 * Display name.
 * @type {String}
 * @default ''
 */
name: {
  type: String,
},
```

## g) Tipo documentado
El JSDoc incluye @type con el tipo entre llaves y sin espacios interiores. Permitidos: String, Array, Object, Boolean y Number.

```javascript incorrecto
/**
 * Display name.
 * @type String
 */
```

```javascript correcto
/**
 * Display name.
 * @type {String}
 */
```

## h) Valor por defecto documentado
El JSDoc incluye @default después de @type. Valores: String '', Array [], Object {}, Boolean false, Number 0. No se usan null ni undefined.

```javascript incorrecto
/**
 * Display name.
 * @default 'John'
 * @type {String}
 */
```

```javascript correcto
/**
 * Display name.
 * @type {String}
 * @default ''
 */
```

## i) Correspondencia del tipo
El @type del JSDoc coincide con el type de la propiedad, y @default corresponde a ese tipo.

```javascript incorrecto
/**
 * Amount.
 * @type {String}
 * @default ''
 */
amount: {
  type: Number,
},
```

```javascript correcto
/**
 * Amount.
 * @type {Number}
 * @default 0
 */
amount: {
  type: Number,
},
```

## j) Tipo obligatorio
Todas las propiedades, públicas y privadas, declaran type.

```javascript incorrecto
name: {},
```

```javascript correcto
name: {
  type: String,
},
```

## k) Array y Object públicos
Las propiedades públicas de tipo Array u Object incluyen attribute: false.

```javascript incorrecto
items: {
  type: Array,
},
```

```javascript correcto
items: {
  type: Array,
  attribute: false,
},
```

## l) Atributos con nombres compuestos
Las propiedades públicas de tipo String o Boolean con nombres compuestos en camelCase declaran explícitamente el atributo HTML en kebab-case. No se exige para Number, Array u Object. Ejemplo: userName usa attribute: 'user-name'.

```javascript incorrecto
userName: {
  type: String,
  attribute: 'userName',
},
```

```javascript correcto
userName: {
  type: String,
  attribute: 'user-name',
},
```

## m) Atributos redundantes
No se declara attribute cuando es igual al nombre de una propiedad pública sin mayúsculas y que no es Array/Object.

```javascript incorrecto
amount: {
  type: Number,
  attribute: 'amount',
},
```

```javascript correcto
amount: {
  type: Number,
},
```

## n) Documentación de privadas
Además de descripción, @type y @default, el JSDoc de una privada incluye @private.

```javascript incorrecto
/**
 * Internal amount.
 * @type {Number}
 * @default 0
 */
```

```javascript correcto
/**
 * Internal amount.
 * @private
 * @type {Number}
 * @default 0
 */
```

## o) Estado privado
Todas las propiedades privadas incluyen state: true.

```javascript incorrecto
_amount: {
  type: Number,
},
```

```javascript correcto
_amount: {
  type: Number,
  state: true,
},
```

## p) Nombres reservados
Las propiedades del componente no reutilizan nombres que colisionen con propiedades nativas de HTML, DOM o JavaScript, como title, heading o style. Se elige un nombre específico para el componente.

```javascript incorrecto
title: {
  type: String,
},
```

```javascript correcto
cardTitle: {
  type: String,
},
```
