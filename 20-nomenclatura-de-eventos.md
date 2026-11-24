---
id: 20
title: Nomenclatura de eventos
intro: Nombre consistente de los eventos del componente.
---

## a) Estructura
Los eventos siguen nombre-del-componente-objeto-de-accion-verbo-en-infinitivo, en kebab-case.

```javascript incorrecto
this.dispatchEvent(new CustomEvent('click'));
```

```javascript correcto
this.dispatchEvent(new CustomEvent('header-main-icon-open'));
```
