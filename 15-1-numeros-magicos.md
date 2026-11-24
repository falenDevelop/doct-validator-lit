---
id: 15.1
title: Números mágicos
intro: Números con significado en la lógica.
---

## a) Valores con significado
Los números tienen un nombre descriptivo en lugar de escribirse en la lógica.

```javascript incorrecto
if (this.attempts >= 3) {
  this.block();
}
```

```javascript correcto
const MAX_ATTEMPTS = 3;
if (this.attempts >= MAX_ATTEMPTS) {
  this.block();
}
```

## b) Declaraciones
Se permiten declaraciones numéricas simples con const, let o var; se recomienda const.

```javascript incorrecto
this.retryAfter = this.delay * 5;
```

```javascript correcto
const RETRY_MULTIPLIER = 5;
this.retryAfter = this.delay * RETRY_MULTIPLIER;
```

## c) Excepciones
Se exceptúan archivos con constants en minúsculas, comentarios y valores de atributos literales (attr="45", attr='45', attr={45}). La interpolación ${45} no tiene esa excepción.

```javascript incorrecto
html`<input maxlength=${45}>`;
```

```javascript correcto
const MAX_LENGTH = 45;
html`<input maxlength=${MAX_LENGTH}>`;
```
