---
id: 6
title: Comillas en atributos HTML
intro: Atributos dentro de templates html.
---

## a) Interpolación pura
Si el valor es solo una interpolación, no lleva comillas.

```javascript incorrecto
html`<user-card text="${name}"></user-card>`;
```

```javascript correcto
html`<user-card text=${name}></user-card>`;
```

## b) Excepción class
El atributo class puede conservar las comillas en una interpolación.

```javascript incorrecto
html`<user-card class=${className}></user-card>`;
```

```javascript correcto
html`<user-card class="${className}"></user-card>`;
```

## c) Contenido mixto
Los atributos que combinan texto e interpolaciones mantienen las comillas.

```javascript incorrecto
html`<user-card text=Hola ${nombre}></user-card>`;
```

```javascript correcto
html`<user-card text="Hola ${nombre}"></user-card>`;
```
