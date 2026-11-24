---
id: 21
title: Programación defensiva
intro: Datos, dependencias y estado seguro del componente.
---

## a) Datos externos
Listas, configuraciones y textos dinámicos provienen de servicios. Los datos temporales hardcodeados requieren un ticket de excepción.

```javascript incorrecto
this.accounts = [{ id: '001', balance: 100 }];
```

```javascript correcto
this.accounts = await this.accountService.getAccounts();
```

## b) Librerías aprobadas
Solo se incorporan librerías y frameworks aprobados por BBVA.

## c) Switch exhaustivo
Cada switch incluye los case de todos los valores esperados y un default que maneja entradas imprevistas.

```javascript incorrecto
switch (status) {
  case 'active':
    return enable();
}
```

```javascript correcto
switch (status) {
  case 'active':
    return enable();
  case 'inactive':
    return disable();
  default:
    throw new Error(`Unsupported status: ${status}`);
}
```

## d) Datos sensibles
Los componentes básicos o específicos que muestran teléfono, correo u otros datos sensibles incluyen data-acoustic-obfuscate.

```html incorrecto
<span>${this.email}</span>
```

```html correcto
<span data-acoustic-obfuscate>${this.email}</span>
```

## e) Ambientes
Cada componente consume los environments definidos para su ejecución; no hardcodea endpoints ni configuraciones de ambiente.

## f) Estado durante render
render y los métodos invocados durante el renderizado no asignan valores a propiedades reactivas.

```javascript incorrecto
render() {
  this.loading = false;
  return html`<p>Ready</p>`;
}
```

```javascript correcto
render() {
  return html`<p>${this.loading ? 'Loading' : 'Ready'}</p>`;
}
```

## g) Elementos sin uso
Se eliminan variables, métodos, imports, propiedades declaradas, estilos, templates, iconos, microilustraciones y otros recursos que no se utilizan.

## h) Mixin Core
La clase Mixin utilizada como core o base sigue la guía de implementación y expone únicamente el contrato compartido que necesitan las clases consumidoras.
