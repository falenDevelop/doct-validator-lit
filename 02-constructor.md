---
id: 2
title: Constructor
intro: Inicialización de las propiedades declaradas.
---

## a) Inicialización
Las propiedades de static get properties() se inicializan en el constructor con this.nombre = valor.

```javascript incorrecto
constructor() {
  super();
}
```

```javascript correcto
constructor() {
  super();
  this.name = '';
}
```

## b) Valores iniciales
String: '' o "". Number: 0. Boolean: false. Array: []. Object: {} o una expresión con createRef().

```javascript incorrecto
this.active = true;
this.amount = 10;
this.data = null;
this.items = [1];
this.name = 'John';
```

```javascript correcto
this.active = false;
this.amount = 0;
this.data = {};
this.items = [];
this.name = '';
```

## c) Declaración de propiedades
Lo que se asigna en el constructor debe estar declarado en static get properties(), salvo las excepciones siguientes.

## d) Excepción config
config no necesita declararse ni inicializarse, y no está sujeta al orden de las asignaciones.

```javascript incorrecto
this.settings = {};
```

```javascript correcto
this._amount = 0;
this.config = {};
```

## e) Excepciones de BbvaWidgetDefaultsMixin
Con BbvaWidgetDefaultsMixin, host, native, version y requiredToken no necesitan declararse ni inicializarse. Si se asignan, siguen las reglas de orden.

```javascript incorrecto
class Feature extends LitElement {
  constructor() {
    super();
    this.host = '';
  }
}
```

```javascript correcto
class Feature extends BbvaWidgetDefaultsMixin(LitElement) {
  constructor() {
    super();
    this.host = '';
  }
}
```

## f) Referencias
Las asignaciones con createRef() pueden existir sin declararse en properties, pero respetan el orden de asignación.

```javascript incorrecto
this.button = {};
```

```javascript correcto
this.button = createRef();
```

## g) Orden
Primero las públicas y luego las privadas (_). Cada grupo en orden alfabético, exceptuando config.

```javascript incorrecto
this._name = '';
this.title = '';
this.amount = 0;
```

```javascript correcto
this.amount = 0;
this.title = '';
this._name = '';
```

## h) Excepciones de mixin personalizado
Las propiedades de un mixin propio pueden estar exentas de declararse o de seguir el orden, según lo que defina el mixin. Depende del contrato del mixin; no es general.
