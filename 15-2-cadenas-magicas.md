---
id: 15.2
title: Cadenas mágicas
intro: Textos de negocio en la lógica.
---

## a) Valores con significado
Las cadenas en la lógica se extraen a constantes con nombres descriptivos.

```javascript incorrecto
if (this.status === 'active') {
  this.activate();
}
```

```javascript correcto
const ACTIVE_STATUS = 'active';
if (this.status === ACTIVE_STATUS) {
  this.activate();
}
```

## b) Declaraciones
Se permiten declaraciones simples de cadenas con const, let o var, también exportadas.

```javascript incorrecto
this.status = 'active';
```

```javascript correcto
export const ACTIVE_STATUS = 'active';
this.status = ACTIVE_STATUS;
```

## c) Archivos de constantes
Se exceptúan archivos cuyo nombre contiene constants, Constants o CONSTANTS.

```javascript incorrecto
// UserCard.js
this.status = 'active';
```

```javascript correcto
// constants.js
export const ACTIVE_STATUS = 'active';

// UserCard.js
import { ACTIVE_STATUS } from './constants.js';
this.status = ACTIVE_STATUS;
```

## d) Texto y valores exceptuados
Se permiten cadenas vacías, de espacios, de un carácter, numéricas decimales positivas o que contengan ${. También el contenido de templates html y css.

```javascript incorrecto
this.status = 'pending';
```

```javascript correcto
this.name = '';
```
