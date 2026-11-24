---
id: 18
title: Demos
intro: Representación funcional de la API del componente.
---

## a) Eventos
La demo escucha explícitamente en su HTML todos los eventos emitidos por la feature, incluidos los documentados con @fires, y permite comprobar su resultado funcional.

```javascript incorrecto
html`<payment-feature></payment-feature>`;
```

```javascript correcto
html`
  <payment-feature
    @payment-confirmed=${this.handlePaymentConfirmed}
  ></payment-feature>
`;
```
