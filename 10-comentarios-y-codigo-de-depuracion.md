---
id: 10
title: Comentarios y código de depuración
intro: Aplica al JavaScript de src/ y demo/, excepto *.css.js y *.scss.js.
---

## a) Comentarios de línea
Se evitan los comentarios //, incluso junto al código. Se exceptúan URLs http(s):// y bloques JSDoc.

```javascript incorrecto
// Reset amount.
reset() {}
```

```javascript correcto
/**
 * Resets the amount.
 */
reset() {}
```

## b) Console
No quedan llamadas console (log, warn, error…) ni variantes mal escritas como consol o consoloe.

```javascript incorrecto
console.log(this.amount);
```

## c) Debugger
No quedan instrucciones debugger.

```javascript incorrecto
debugger;
```

## d) Alcance
Los criterios 10a–10c se aplican a src/ y demo/, incluido demo/demo.js.
