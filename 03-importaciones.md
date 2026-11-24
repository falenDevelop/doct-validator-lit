---
id: 3
title: Importaciones
intro: Rutas, orden y grupos de imports.
---

## a) Lit
Debe importarse desde lit, no desde lit-element.

```javascript incorrecto
import { LitElement, html } from 'lit-element';
```

```javascript correcto
import { LitElement, html } from 'lit';
```

## b) Estilos compartidos
No se importa ni se usa getComponentSharedStyles de bbva-core-lit-helpers: solo es necesario en componentes de catálogo o widgets.

```javascript incorrecto
static get styles() {
  return [styles, getComponentSharedStyles('feature-shared-styles')];
}
```

```javascript correcto
static get styles() {
  return [styles];
}
```

## c) Componentes Spherica
Las rutas de @bbva-spherica-components/ terminan en /index.js, salvo BbvaHelpOnboarding y BbvaHelpOnboardingSlide. Algunos paquetes no lo tienen: verifica cada caso.

```javascript incorrecto
import { BbvaButton } from '@bbva-spherica-components/bbva-button';
```

```javascript correcto
import { BbvaButton } from '@bbva-spherica-components/bbva-button/index.js';
```

## d) Rutas relativas
Los imports ./ o ../ apuntan a rutas existentes e incluyen .js cuando el destino es JavaScript.

```javascript incorrecto
import { formatAmount } from './helper';
```

```javascript correcto
import { formatAmount } from './helper.js';
```

## e) Directorios relativos
Los imports de directorios terminan en /index.js. Se exceptúan rutas con const, utils, helper, icons o foundations, o que terminen en Dm o foundation.

```javascript incorrecto
import { UserCard } from './elements';
```

```javascript correcto
import { UserCard } from './elements/index.js';
```

## f) Orden de grupos
1) Lit y core-lit-helpers. 2) UI de spherica. 3) Foundations. 4) Mixins. 5) Componentes DM. 6) Componentes propios. 7) Constantes y utilidades. 8) Estilos. Mixins y DM van en su grupo aunque vengan de UI o Foundations.

```javascript incorrecto
import styles from './feature.css.js';
import { FeatureDm } from './FeatureDm.js';
import { FeatureMixin } from './FeatureMixin.js';
import { LitElement } from 'lit';
```

```javascript correcto
import { LitElement } from 'lit';
import { helper } from '@bbva-web-components/bbva-core-lit-helpers';
import { BbvaButton } from '@bbva-spherica-components/bbva-button/index.js';
import { foundation } from '@bbva-web-components/bbva-foundations';
import { FeatureMixin } from './FeatureMixin.js';
import { FeatureDm } from './FeatureDm.js';
import { UserCard } from './elements/user-card/index.js';
import { MAX_ATTEMPTS } from './constants/values.js';
import styles from './feature.css.js';
```
