---
id: 18
title: Demos
intro: Representación funcional de la API del componente.
---

## a) Eventos
La demo escucha explícitamente en su HTML todos los eventos emitidos por la feature, incluidos los documentados con @fires, y permite comprobar su resultado funcional.

```javascript incorrecto
// Archivo de demo index.html 
<bbva-dev-demo-helper events=''>

// Archivo principal
* @fires {} card-configuration-cards-on-off-pe-go-back - Fired when the user navigates back from the main configuration or error modal
* @fires {key, value} card-configuration-cards-on-off-pe-storage-set - Fired when setting data in local storage
*/
export class
```

```javascript correcto
// Archivo de demo index.html 
<bbva-dev-demo-helper
      events='card-configuration-cards-on-off-pe-go-back,
      card-configuration-cards-on-off-pe-storage-set'
>
// Archivo principal
* @fires {} card-configuration-cards-on-off-pe-go-back - Fired when the user navigates back from the main configuration or error modal
* @fires {key, value} card-configuration-cards-on-off-pe-storage-set - Fired when setting data in local storage
*/
export class
```
