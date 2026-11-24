---
id: 11
title: Contenedores de layout BBVA
intro: BbvaTransitionContainer y BbvaHelpModal.
---

## a) Ubicación
BbvaTransitionContainer y BbvaHelpModal solo se importan y usan en el archivo principal del feature.

```javascript incorrecto
// src/elements/user-card/UserCard.js
import { BbvaHelpModal } from '@bbva-spherica-components/bbva-help-modal/index.js';
```

```javascript correcto
// src/UserFeature.js
import { BbvaHelpModal } from '@bbva-spherica-components/bbva-help-modal/index.js';
```

## b) Componentes secundarios
Los archivos secundarios no importan esos componentes ni usan <bbva-transition-container> o <bbva-help-modal>; emiten un evento y el principal abre el modal.

```javascript incorrecto
render() {
  return html`<bbva-help-modal></bbva-help-modal>`;
}
```

```javascript correcto
/**
 * Requests the help modal.
 * @event help-requested
 */
requestHelp() {
  this.dispatchEvent(new CustomEvent('help-requested', { bubbles: true, composed: true }));
}
```

## c) Archivo principal
Existe un JavaScript principal en la raíz de src/, con el nombre PascalCase del SCSS principal (sin contar los de decisiones). user-feature.scss corresponde a UserFeature.js.
