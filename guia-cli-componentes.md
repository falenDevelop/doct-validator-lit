# Guía paso a paso: crear componentes Lit con el CLI `aclit`

Esta guía enseña a crear un componente Lit **desde cero con el CLI** y luego a construir, paso a paso, los 11 ejemplos del proyecto de formación (`ac-formacion`).

> **Regla de oro:** el CLI crea la base del componente. Tú agregas las piezas (páginas, elementos, rutas de demo) siguiendo siempre el mismo patrón.

## Qué vas a construir

Un componente `ac-formacion` que muestra un ejemplo distinto según el atributo `section-type`:

```html
<ac-formacion section-type="properties"></ac-formacion>
```

Cada valor de `section-type` abre una página de ejemplo:

| # | `section-type` | Tema | Página que se crea |
|---|---|---|---|
| 1 | `properties` | Propiedades | `properties-page` |
| 2 | `type-properties` | Propiedades públicas y privadas | `type-properties-page` |
| 3 | `doc-properties` | Documentación de propiedades | `doc-properties-page` |
| 4 | `doc-class` | Documentación de la clase | `doc-class-page` |
| 5 | `events` | Eventos entre componentes | `events-page` |
| 6 | `lifecycle` | Ciclo de vida | `lifecycle-page` |
| 7 | `directives` | Directivas | `directives-page` |
| 8 | `ref` | Referencias a elementos | `ref-page` |
| 9 | `api-dm` | API con Data Manager | `api-dm-pages` |
| 10 | `first-component` | Primer componente real (API, modal, tarjetas) | `first-component-page` |
| 11 | `transfer-multistep` | Flujo de transferencia en pasos | `transfer-multistep-page` |

---

## Documentación de consulta

Antes de preparar el entorno, abre estos enlaces y tenlos a mano durante los ejercicios:

- [Documentación de ac-lit](https://renzocordovadev.github.io/ac-lit/): punto de entrada para consultar los componentes disponibles.
- [Documentación de ac-amount-basic](https://renzocordovadev.github.io/ac-lit/#ac-amount-basic): acceso directo a la referencia de este componente para consultar su uso antes de integrarlo en un ejercicio.

Usa esta guía para seguir el paso a paso con el CLI y la documentación para consultar los componentes que vayas necesitando.

## 1. Preparar el entorno

Necesitas **Node.js** (versión LTS) y **pnpm**.

Instala el CLI una sola vez:

```bash
npm install -g @ac-base/cli
```

Comprueba que funciona:

```bash
aclit help
```

Debe listar los comandos disponibles.

### Comandos que usarás

| Comando | Para qué sirve |
|---|---|
| `aclit component:create <nombre>` | Crea un componente base nuevo |
| `aclit component:serve` | Levanta la demo con Vite en http://localhost:5173 |
| `aclit component:build` | Compila el componente para producción |
| `aclit component:test` | Ejecuta las pruebas del componente |
| `aclit help` | Lista todos los comandos |

> Los comandos de la forma `<tipo>:<accion>` que no son propios del CLI se ejecutan como scripts de `pnpm run`. Por eso `component:serve` y `component:build` funcionan igual en cualquier componente creado con el CLI.

**Regla del nombre:** debe empezar con `ac-` y estar en *kebab-case* (minúsculas separadas por guiones).

- Válidos: `ac-formacion`, `ac-mi-componente`, `ac-boton-principal`
- No válidos: `miComponente`, `formacion`, `ac-Mi_Componente`

---

## 2. Crear el componente con el CLI

```bash
aclit component:create ac-formacion
cd ac-formacion
pnpm install
```

El CLI crea esta estructura:

```text
ac-formacion/
├── demo/                    # páginas HTML para probar el componente
│   ├── case.js
│   ├── demo.js
│   ├── demo-base.css
│   └── index.html
├── src/
│   ├── formacion.js         # clase principal del componente
│   └── formacion.styles.scss # estilos (se compilan a .styles.js)
├── test/
│   └── formacion.test.js
├── index.js                 # registra el componente <ac-formacion>
├── locales.json             # textos para i18n
├── package.json
├── README.md
├── vite.config.js
└── web-test-runner.config.js
```

**Qué tocar y qué no:**

| Archivo | ¿Lo modificas? |
|---|---|
| `src/formacion.js` | Sí. Aquí se conectan los ejemplos. |
| `src/formacion.styles.scss` | Opcional |
| `index.js`, `vite.config.js`, `package.json` | No, salvo que te lo indiquen |
| `demo/*.html` | Sí. Agregas una página por ejemplo. |

### Paso 2.1: reemplaza la clase base

Abre `src/formacion.js` y reemplaza su contenido por esta base. Es la misma estructura que genera el CLI, pero ya preparada para recibir ejemplos:

```javascript
import { LitElement, html, nothing } from 'lit';
import { ComponentMixin, componentBaseStyles } from '@ac-base/ac-component-mixin';

import { FormacionStyles } from './formacion.styles.js';

export class Formacion extends ComponentMixin(LitElement) {
  static get is() {
    return 'ac-formacion';
  }

  static get scopedElements() {
    return {};
  }

  static get properties() {
    return {
      /**
       * Tipo de sección que se muestra.
       * @type {String}
       * @default ''
       */
      sectionType: {
        type: String,
        attribute: 'section-type',
      },
    };
  }

  constructor() {
    super();
    this.sectionType = '';
  }

  _renderTemplateForSection() {
    switch (this.sectionType) {
      default:
        return nothing;
    }
  }

  static get styles() {
    return [componentBaseStyles, FormacionStyles];
  }

  render() {
    return html` ${this._renderTemplateForSection()} `;
  }
}
```

> `formacion.styles.js` se genera solo al correr `aclit component:serve`, a partir de `formacion.styles.scss`.

### Paso 2.2: crea las constantes de sección

Crea `src/utils/constants.js`. Cada constante es el nombre que usará el atributo `section-type`:

```javascript
export const SECTION_TYPE_PROPERTIES = 'properties';
export const SECTION_TYPE_DOC_CLASS = 'doc-class';
export const SECTION_TYPE_DOC_PROPERTIES = 'doc-properties';
export const SECTION_TYPE_TYPE_PROPERTIES = 'type-properties';
export const SECTION_TYPE_EVENTS = 'events';
export const SECTION_TYPE_LIFECYCLE = 'lifecycle';
export const SECTION_TYPE_DIRECTIVES = 'directives';
export const SECTION_TYPE_REF = 'ref';
export const SECTION_TYPE_API_DM = 'api-dm';
export const SECTION_TYPE_FIRST_COMPONENT = 'first-component';
export const SECTION_TYPE_TRANSFER_MULTISTEP = 'transfer-multistep';
```

---

## 3. Instalar dependencias

Con el CLI ya tienes Lit y el mixin del componente. Para los ejemplos necesitas los componentes del catálogo `@ac-components`:

```bash
pnpm add lit @ac-base/ac-component-mixin @ac-base/ac-intl-mixin \
  @ac-components/ac-api-productos @ac-components/ac-button-basic \
  @ac-components/ac-expandable-multistep @ac-components/ac-input-basic \
  @ac-components/ac-link-basic @ac-components/ac-modal-basic \
  @ac-components/ac-spinner-basic @ac-components/ac-text-basic \
  @ac-components/ac-transition-container

pnpm add -D @ac-base/ac-core @ac-base/ac-demo-content sass
```

| Paquete | Para qué se usa |
|---|---|
| `lit` | Crear componentes, plantillas y directivas |
| `@ac-base/ac-component-mixin` | Base de todos los componentes del catálogo |
| `@ac-base/ac-intl-mixin` | Traducciones (`locales.json`) |
| `@ac-components/ac-api-productos` | API simulada de productos (ejemplo 10) |
| `@ac-components/ac-button-basic` | Botones (ejemplo 11) |
| `@ac-components/ac-expandable-multistep` y `ac-expandable-step` | Pasos colapsables (ejemplo 11) |
| `@ac-components/ac-input-basic` | Campo de texto (ejemplo 11) |
| `@ac-components/ac-link-basic` | Enlaces (ejemplos 10 y 11) |
| `@ac-components/ac-modal-basic` | Ventanas modales (ejemplos 10 y 11) |
| `@ac-components/ac-spinner-basic` | Indicador de carga (ejemplos 10 y 11) |
| `@ac-components/ac-text-basic` | Textos con estilo (ejemplo 11) |
| `@ac-components/ac-transition-container` | Transición de entrada (ejemplo 10) |
| `@ac-base/ac-core`, `@ac-base/ac-demo-content`, `sass` | Demo y compilación de estilos (solo desarrollo) |

> Si necesitas las mismas versiones del proyecto de referencia, revisa `dependencies` en `package.json` de `ac-formacion`.

---

## 4. Levantar la demo

```bash
aclit component:serve
```

Se abre Vite en **http://localhost:5173**. Cada archivo de `demo/` se abre con su nombre. Por ejemplo, `demo/properties.html` se ve en http://localhost:5173/properties.html.

Cada vez que guardes un archivo, la página se recarga sola.

---

## 5. Teoría: el ciclo de vida de un componente

Un componente Lit pasa por etapas en un orden fijo. Entenderlas evita errores comunes, como intentar usar un elemento antes de que exista.

```text
constructor()            → se crea la instancia (todavía no hay DOM)
   │
connectedCallback()      → el elemento entra al documento
   │
willUpdate()             → preparar datos (aún no se toca el DOM)
   │
update()                 → Lit aplica los cambios
   │
render()                 → devuelve la plantilla html`...`
   │
firstUpdated()           → solo la primera vez: el DOM ya existe (ideal para refs)
   │
updated()                → después de cada actualización
   │
   ... (cada cambio de propiedad vuelve a update/render/updated)
   │
disconnectedCallback()   → el elemento sale del documento (limpiar timers y suscripciones)
```

**Resumen por etapa:**

| Método | Cuándo corre | Úsalo para |
|---|---|---|
| `constructor` | Al crear el componente | Valores iniciales (`this.count = 0`) |
| `connectedCallback` | Al entrar al documento | Suscripciones, eventos globales |
| `willUpdate` | Antes de pintar | Calcular datos derivados |
| `render` | Cada actualización | Describir la plantilla (no cambiar estado aquí) |
| `firstUpdated` | Una vez, con el DOM listo | Acceder a elementos con `ref` |
| `updated` | Después de cada cambio | Medir elementos o reaccionar a cambios |
| `disconnectedCallback` | Al salir del documento | Cancelar timers y suscripciones |

**Reactividad (cuándo se vuelve a pintar):**

- Las propiedades declaradas en `static get properties()` son reactivas. Si cambian, Lit vuelve a pintar.
- Las propiedades `state: true` son internas (no se pasan desde afuera).
- Cambiar un valor con `=` o crear un objeto/arreglo nuevo (`[...items, x]`) sí dispara la actualización.
- Modificar un arreglo con `push` **no** dispara la actualización, porque la referencia no cambia.

---

## 6. El patrón que se repite en cada ejemplo

Para cada uno de los 11 ejemplos sigues los mismos pasos. Solo cambian los nombres.

| Paso | Archivo | Acción |
|---|---|---|
| 1 | `src/pages/<nombre>-page/<nombre>-page.js` | Crear la página (la lógica y la plantilla) |
| 2 | `src/pages/<nombre>-page/<nombre>-page.styles.js` | Crear los estilos |
| 3 | `src/pages/index.js` | Exportar la página |
| 4 | `src/utils/constants.js` | Agregar la constante de sección |
| 5 | `src/formacion.js` | Importar, registrar en `scopedElements` y agregar el `case` |
| 6 | `demo/<archivo>.html` | Crear la página de demo |
| 7 | Terminal | `aclit component:serve` y revisar |

**Estilos mínimos** (sirven para todas las páginas; cambia el nombre):

```javascript
import { css } from 'lit';

export const PropertiesPageStyles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }
`;
```

**Demo mínima** (`demo/<archivo>.html`). Cambia solo el valor de `section-type`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ac-formacion demo</title>
    <script type="module" src="./case.js"></script>
    <link rel="stylesheet" href="./demo-base.css" />
  </head>
  <body>
    <ac-formacion section-type="properties"></ac-formacion>
  </body>
</html>
```

**Cómo se conecta en `formacion.js`** (se repite con cada ejemplo):

```javascript
// 1) Importar la página (arriba del archivo)
import { PropertiesPage } from './pages/index.js';
import { SECTION_TYPE_PROPERTIES } from './utils/constants.js';

// 2) Registrar la página en scopedElements
static get scopedElements() {
  return {
    'properties-page': PropertiesPage,
  };
}

// 3) Agregar el case en _renderTemplateForSection()
case SECTION_TYPE_PROPERTIES:
  return html`<properties-page name="Cells"></properties-page>`;
```

> **Importante:** en `scopedElements` la clave es el nombre de la etiqueta (`'properties-page'`) y el valor es la clase. Si la etiqueta no coincide con la clave, el componente no se pinta.

---

## 7. Ejemplos paso a paso

Hazlos en orden. Cada ejemplo usa un concepto nuevo sobre los anteriores.

---

### Ejemplo 1: Propiedades (`properties`)

**Qué aprendes:** declarar propiedades, valores por defecto, atributos HTML y pasar objetos y arreglos.

**Archivos**

- Crear: `src/pages/properties-page/properties-page.js` y `properties-page.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/properties.html`

**Paso 1.** Crea `src/pages/properties-page/properties-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { PropertiesPageStyles } from './properties-page.styles.js';

export class PropertiesPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'properties-page';
  }

  static get properties() {
    return {
      name: {
        type: String,
      },
      count: {
        type: Number,
      },
      isActive: {
        type: Boolean,
        attribute: 'is-active'
      },
      items: {
        type: Array,
      },
      details: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.name = '';
    this.count = 0;
    this.isActive = false;
    this.items = [];
    this.details = {};
  }

  static get styles() {
    return [PropertiesPageStyles];
  }

  render() {
    return html`
      <p>Cadena: ${this.name}</p>
      <p>Número: ${this.count}</p>
      <p>Boolean: ${this.isActive ? 'Activo' : 'Inactivo'}</p>
      <p>Objeto categoría: ${this.details.category}</p>
      <p>Arreglo:</p>
      <ul>
        ${this.items.map(item => html`<li>${item}</li>`)}
      </ul>
    `;
  }
}
```

**Paso 2.** Crea `src/pages/properties-page/properties-page.styles.js` con los estilos mínimos de la sección 6 (cambia el nombre a `PropertiesPageStyles`).

**Paso 3.** Crea `src/pages/index.js` (si no existe) y exporta la página:

```javascript
export { PropertiesPage } from './properties-page/properties-page.js';
```

**Paso 4.** En `src/utils/constants.js` ya agregaste `SECTION_TYPE_PROPERTIES` en el paso 2.2.

**Paso 5.** En `src/formacion.js`, agrega el import, el registro y el case:

```javascript
import { PropertiesPage } from './pages/index.js';
// ...
// en scopedElements:
'properties-page': PropertiesPage,
// en _renderTemplateForSection():
case SECTION_TYPE_PROPERTIES:
  return html`<properties-page
    name="Cells"
    count="3"
    is-active
    .items=${['One', 'Two', 'Three']}
    .details=${{ category: 'Demo' }}
  ></properties-page>`;
```

> Recuerda importar también `SECTION_TYPE_PROPERTIES` desde `./utils/constants.js`.

**Paso 6.** Crea `demo/properties.html` con `section-type="properties"`.

**Explicación del código:**

- `name`, `count`, `items` y `details` se pasan **desde fuera**. Con `name="Cells"` va como atributo, y con `.items=${...}` va como propiedad (así se pasan arreglos y objetos).
- `is-active` es un atributo *compuesto* (con guion). Por eso en la clase se declara `attribute: 'is-active'`.
- Los valores del `constructor` son los **valores por defecto**.

**Probar:** abre http://localhost:5173/properties.html y verifica que se muestre `Cadena: Cells`, `Número: 3` y `Boolean: Activo`.

---

### Ejemplo 2: Propiedades públicas y privadas (`type-properties`)

**Qué aprendes:** la diferencia entre propiedades públicas (`name`) y estado interno (`state: true`), y por qué `push` no actualiza la pantalla pero el spread sí.

**Archivos**

- Crear: `src/pages/type-properties-page/type-properties-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/type-properties.html`

**Paso 1.** Crea `src/pages/type-properties-page/type-properties-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { TypePropertiesPageStyles } from './type-properties-page.styles.js';

export class TypePropertiesPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'type-properties-page';
  }

  static get properties() {
    return {
      name: {
        type: String,
      },
      product: {
        type: Object,
        state: true,
      },
      _count: {
        type: Number,
        state: true,
      },
      _items: {
        type: Array,
        state: true,
      },
      _isActive: {
        type: Boolean,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this.name = '';
    this._count = 0;
    this._items = [];
    this._isActive = false;
    this._product = {};
  }

  static get styles() {
    return [TypePropertiesPageStyles];
  }

  _increment() {
    this._count++;
  }
  _decrement() {
    this._count--;
  }
  _addItemSpress() {
    this._items = [...this._items, `Item ${this._items.length + 1}`];
  }
  _toggleActive() {
    this._isActive = !this._isActive;
  }
  _addItemPushed() {
    this._items.push(`Item ${this._items.length + 1}`);
    // push() no dispara la actualización en Lit: por eso se usa requestUpdate().
    this.requestUpdate();
  }
  _updateProduct() {
    this._product.name = 'Product 2';
    // Cambiar una propiedad de un objeto tampoco se detecta; se fuerza la actualización.
    this.requestUpdate();
  }
  _updateProductSpress() {
    this._product = { ...this._product, price: this._product.price + 1 };
  }

  render() {
    return html`
      <p>Nombre: ${this.name}</p>
      <p>Contador: ${this._count}</p>
      <p>Activo: ${this._isActive ? 'Sí' : 'No'}</p>
      <p>Producto: ${this._product.name} - $${this._product.price}</p>
      <p>Items: ${this._items.join(', ')}</p>
      <div class="controls">
        <button @click=${this._decrement}>Decrement</button>
        <button @click=${this._increment}>Increment</button>
        <button @click=${this._toggleActive}>Toggle Active</button>
        <button @click=${this._updateProduct}>Update Product</button>
        <button @click=${this._updateProductSpress}>
          Update Price (Spread)
        </button>
        <button @click=${this._addItemSpress}>Add Item (Spread)</button>
        <button @click=${this._addItemPushed}>Add Item (Pushed)</button>
      </div>
    `;
  }
}
```

**Paso 2.** Crea el archivo de estilos (`TypePropertiesPageStyles`) con los estilos mínimos.

**Paso 3.** En `src/pages/index.js` agrega:

```javascript
export { TypePropertiesPage } from './type-properties-page/type-properties-page.js';
```

**Paso 4.** En `src/utils/constants.js` agrega (si no está):

```javascript
export const SECTION_TYPE_TYPE_PROPERTIES = 'type-properties';
```

**Paso 5.** En `src/formacion.js`:

```javascript
import { TypePropertiesPage } from './pages/index.js';
// en scopedElements:
'type-properties-page': TypePropertiesPage,
// en el switch:
case SECTION_TYPE_TYPE_PROPERTIES:
  return html`<type-properties-page
    name="Jesus"
    .product=${{ name: 'Product', price: 0 }}
  ></type-properties-page>`;
```

**Paso 6.** Crea `demo/type-properties.html` con `section-type="type-properties"`.

**Explicación del código:**

- Las propiedades con `state: true` son **internas**: el componente las cambia, no el usuario.
- `this._items = [...this._items, x]` crea un arreglo **nuevo**, así Lit se entera del cambio.
- `this._items.push(x)` modifica el mismo arreglo; Lit no ve el cambio y **no vuelve a pintar**. Ese es el error que el ejemplo muestra.

**Probar:** haz clic en *Add Item (Pushed)*. El texto no cambia hasta que hagas otra acción que sí dispare la actualización. Luego prueba *Add Item (Spread)*, que sí actualiza al instante.

---

### Ejemplo 3: Documentación de propiedades (`doc-properties`)

**Qué aprendes:** documentar propiedades con JSDoc (`@type`, `@default`, `@public`, `@private`) y cuándo usar `attribute: false` o `state: true`.

**Archivos**

- Crear: `src/pages/doc-properties-page/doc-properties-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/doc-properties.html`

**Paso 1.** Crea `src/pages/doc-properties-page/doc-properties-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { DocPropertiesPageStyles } from './doc-properties-page.styles.js';

export class DocPropertiesPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'doc-properties-page';
  }

  static get properties() {
    return {
      /**
       * List of items in the properties section.
       * @type {Array}
       * @default []
       * @public
       */
      items: {
        type: Array,
        attribute: false, //NOTA: SE COLOCA FALSE PARA LOS OBJECT Y ARRAY
      },
      /**
       * Label for the properties section.
       * @type {String}
       * @default ''
       * @public
       */
      label: {
        type: String,
        // Sin attribute: esta propiedad solo se usa desde JavaScript.
      },
      /**
       * Total number of properties.
       * @type {Number}
       * @default 0
       * @public
       */
      totalAmount: {
        type: Number,
        attribute: 'total-amount', //SE USA ATTRIBUTE POR QUE LA PROPIEDAD ES COMPUESTA Y PUBLICA
      },
      /**
       * Visibility status of the properties section.
       * @type {Boolean}
       * @default false
       * @private
       */
      _isVisible: {
        type: Boolean,
        state: true, // SE USA STATE POR QUE ES UNA PROPIEDAD INTERNA (PARA TODOS LOS TIPOS DE PROPIEDADES)
      },
    };
  }

  constructor() {
    super();
    this.items = [];
    this.label = '';
    this.totalAmount = 0;
    this._isVisible = false;
  }

  static get styles() {
    return [DocPropertiesPageStyles];
  }

  render() {
    return html`
      <p>Label: ${this.label}</p>
      <p>Total: ${this.totalAmount}</p>
      <p>Visible: ${this._isVisible ? 'Yes' : 'No'}</p>
      <ul>
        ${this.items.map((item) => html`<li>${item}</li>`)}
      </ul>
    `;
  }
}
```

**Paso 2.** Crea el archivo de estilos (`DocPropertiesPageStyles`) con los estilos mínimos.

**Paso 3.** En `src/pages/index.js` agrega:

```javascript
export { DocPropertiesPage } from './doc-properties-page/doc-properties-page.js';
```

**Paso 4.** En `src/utils/constants.js` agrega:

```javascript
export const SECTION_TYPE_DOC_PROPERTIES = 'doc-properties';
```

**Paso 5.** En `src/formacion.js`:

```javascript
import { DocPropertiesPage } from './pages/index.js';
// en scopedElements:
'doc-properties-page': DocPropertiesPage,
// en el switch:
case SECTION_TYPE_DOC_PROPERTIES:
  return html`<doc-properties-page
    label="Demo Label"
    .items=${['Item 1', 'Item 2']}
    total-amount="2"
  ></doc-properties-page>`;
```

**Paso 6.** Crea `demo/doc-properties.html` con `section-type="doc-properties"`.

**Explicación del código:**

- `@public` y `@private` indican quién puede usar cada propiedad.
- `attribute: false` se usa con arreglos y objetos, porque un atributo HTML solo puede ser texto.
- `attribute: 'total-amount'` convierte el nombre de la propiedad (`totalAmount`) al atributo en kebab-case.
- `state: true` marca lo interno (`_isVisible`).

---

### Ejemplo 4: Documentación de la clase (`doc-class`)

**Qué aprendes:** documentar una clase completa con JSDoc (descripción, ejemplo de uso y etiquetas del componente).

**Archivos**

- Crear: `src/pages/doc-class-page/doc-class-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/doc-class.html`

**Paso 1.** Crea `src/pages/doc-class-page/doc-class-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { DocClassPageStyles } from './doc-class-page.styles.js';

/**
 * ![Lit component](https://img.shields.io/badge/Lit-component-blue.svg)
 * Demonstrates a class documented with the full JSDoc structure.
 *
 * Example:
 * ```html
 * <doc-class-page title="Class documentation"></doc-class-page>
 * ```
 *
 * @customElement doc-class-page
 * @LitElement
 * @appliesMixin {ComponentMixin}
 */
export class DocClassPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'doc-class-page';
  }

  static get properties() {
    return {
      title: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.title = 'Class documentation';
  }

  static get styles() {
    return [DocClassPageStyles];
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <p>This page shows how a class is documented.</p>
    `;
  }
}
```

**Paso 2.** Crea el archivo de estilos (`DocClassPageStyles`) con los estilos mínimos.

**Paso 3.** En `src/pages/index.js` agrega:

```javascript
export { DocClassPage } from './doc-class-page/doc-class-page.js';
```

**Paso 4.** En `src/utils/constants.js` agrega:

```javascript
export const SECTION_TYPE_DOC_CLASS = 'doc-class';
```

**Paso 5.** En `src/formacion.js`:

```javascript
import { DocClassPage } from './pages/index.js';
// en scopedElements:
'doc-class-page': DocClassPage,
// en el switch:
case SECTION_TYPE_DOC_CLASS:
  return html`<doc-class-page title="Class documentation"></doc-class-page>`;
```

**Paso 6.** Crea `demo/doc-class.html` con `section-type="doc-class"`. Copia la demo mínima de la sección 6 y cambia el valor.

**Explicación:** el bloque `/** ... */` encima de la clase no cambia el funcionamiento. Sirve para que el equipo y las herramientas de documentación entiendan qué hace el componente, cómo se usa y qué etiqueta lo representa (`@customElement`).

---

### Ejemplo 5: Eventos entre componentes (`events`)

**Qué aprendes:** emitir eventos desde un hijo (`dispatchEvent`), escucharlos en el padre (`@nombre-evento`) y pasar datos con `detail`.

**Archivos**

- Crear: `src/elements/event-input/event-input.js` y `event-input.styles.js`
- Crear: `src/elements/item-text/item-text.js` y `item-text.styles.js`
- Crear: `src/pages/events-page/events-page.js` y `events-page.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/events.html`

> Los **elementos** (`src/elements/`) son componentes pequeños y reutilizables. Las **páginas** (`src/pages/`) los combinan para mostrar un ejemplo.

**Paso 1.** Crea `src/elements/event-input/event-input.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { EventInputStyles } from './event-input.styles.js';

/**
 * Input que emite el evento `input-change` con `{ source, value }`.
 */
export class EventInput extends ComponentMixin(LitElement) {
  static get is() {
    return 'event-input';
  }

  static get properties() {
    return {
      source: {
        type: String,
      },
      label: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.source = '';
    this.label = '';
  }

  static get styles() {
    return [EventInputStyles];
  }

  /**
   * Maneja el evento de input y emite `event-input-change` con `{ source, value }`.
   * @private
   * @event event-input-change
   */
  _onInput(event) {
    this.dispatchEvent(
      new CustomEvent(`${EventInput.is}-change`, {
        // bubbles: si es true, el evento sube por el DOM hasta los padres.
        bubbles: false,
        // composed: si es true, el evento puede salir del shadow DOM de este componente.
        composed: false,
        detail: { source: this.source, value: event.target.value },
      }),
    );
  }

  render() {
    return html`
      <label>
        ${this.label}
        <input type="text" @input=${this._onInput} />
      </label>
    `;
  }
}
```

**Paso 2.** Crea `src/elements/item-text/item-text.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { ItemTextStyles } from './item-text.styles.js';

/**
 * Pinta el texto recibido por la propiedad `text`.
 */
export class ItemText extends ComponentMixin(LitElement) {
  static get is() {
    return 'item-text';
  }

  static get properties() {
    return {
      label: {
        type: String,
      },
      text: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.text = '';
  }

  static get styles() {
    return [ItemTextStyles];
  }

  render() {
    return html`
      <p><strong>${this.label}:</strong> ${this.text || 'Sin cambios'}</p>
    `;
  }
}
```

**Paso 3.** Crea `src/pages/events-page/events-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { EventInput } from '../../elements/event-input/event-input.js';
import { ItemText } from '../../elements/item-text/item-text.js';
import { EventsPageStyles } from './events-page.styles.js';

const INPUTS = [
  { source: 'input-a', label: 'Input A' },
  { source: 'input-b', label: 'Input B' },
];

export class EventsPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'events-page';
  }

  static get scopedElements() {
    return {
      'event-input': EventInput,
      'item-text': ItemText,
    };
  }

  static get properties() {
    return {
      _lastEvent: {
        type: Object,
        state: true,
      },
      _values: {
        type: Object,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this._lastEvent = {};
    this._values = {};
  }

  _onInputChange({ detail }) {
    console.log(detail);
    const { source, value } = detail;
    if (value === '') {
      this._lastEvent = {};
    } else {
      this._lastEvent = { source, value };
    }
    this._values = { ...this._values, [source]: value };
  }

  static get styles() {
    return [EventsPageStyles];
  }

  render() {
    return html`
      <h2>Eventos</h2>
      <div class="inputs">
        ${INPUTS.map(
          ({ source, label }) => html`
            <event-input
              source=${source}
              label=${label}
              @event-input-change=${this._onInputChange}
            ></event-input>
          `,
        )}
      </div>
      <p>
        Último evento recibido:
        ${Object.keys(this._lastEvent).length > 0
          ? `${this._lastEvent?.source} → ${this._lastEvent?.value}`
          : 'ninguno'}
      </p>
      <div class="items">
        ${INPUTS.map(
          ({ source, label }) => html`
            <item-text
              label=${label}
              .text=${this._values[source] ?? ''}
            ></item-text>
          `,
        )}
      </div>
    `;
  }
}
```

**Paso 4.** Crea los estilos de `event-input`, `item-text` y `events-page` (cada uno con su `Styles` mínimo).

**Paso 5.** En `src/pages/index.js` agrega:

```javascript
export { EventsPage } from './events-page/events-page.js';
```

**Paso 6.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_EVENTS = 'events';`.

**Paso 7.** En `src/formacion.js`:

```javascript
import { EventsPage } from './pages/index.js';
// en scopedElements:
'events-page': EventsPage,
// en el switch:
case SECTION_TYPE_EVENTS:
  return html`<events-page></events-page>`;
```

**Paso 8.** Crea `demo/events.html` con `section-type="events"`.

**Explicación del flujo:**

1. El usuario escribe en `event-input`.
2. `event-input` emite `event-input-change` con `{ source, value }`.
3. `events-page` escucha con `@event-input-change` y guarda el valor.
4. `events-page` pasa ese valor a `item-text` con `.text=${...}`.

**Probar:** escribe en *Input A* y mira cómo cambian *Último evento recibido* y el texto de la columna correspondiente.

---

### Ejemplo 6: Ciclo de vida (`lifecycle`)

**Qué aprendes:** qué hace cada método del ciclo de vida. Aplica la teoría de la sección 5.

**Archivos**

- Crear: `src/pages/lifecycle-page/lifecycle-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/lifecycle.html`

**Paso 1.** Crea `src/pages/lifecycle-page/lifecycle-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { LifecyclePageStyles } from './lifecycle-page.styles.js';

export class LifecyclePage extends ComponentMixin(LitElement) {
  static get is() {
    return 'lifecycle-page';
  }

  static get properties() {
    return {
      _count: {
        type: Number,
        state: true,
      },
    };
  }

  // Inicializa el estado antes de que el componente se conecte al documento.
  constructor() {
    super();
    this._count = 0;
    console.info('lifecycle-page: constructor');
  }

  // Se ejecuta cuando el elemento se agrega al documento; aquí se pueden iniciar suscripciones.
  connectedCallback() {
    super.connectedCallback();
    console.info('lifecycle-page: connectedCallback');
  }

  // Permite preparar datos antes de que Lit actualice el DOM.
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    console.info('lifecycle-page: willUpdate', [...changedProperties.keys()]);
  }

  // Aplica la actualización al DOM; se ejecuta después de willUpdate.
  update(changedProperties) {
    console.info('lifecycle-page: update');
    super.update(changedProperties);
  }

  // Se ejecuta una sola vez cuando termina la primera actualización; el DOM ya está disponible.
  firstUpdated() {
    super.firstUpdated();
    console.info('lifecycle-page: firstUpdated (primer render terminado)');
  }

  // Se ejecuta al terminar cada actualización; sirve, por ejemplo, para medir elementos del DOM.
  updated(changedProperties) {
    super.updated(changedProperties);
    console.info('lifecycle-page: updated (propiedades cambiadas)', [
      ...changedProperties.keys(),
    ]);
  }

  // Se ejecuta cuando el elemento sale del documento; aquí se limpian suscripciones o timers.
  disconnectedCallback() {
    super.disconnectedCallback();
    console.info('lifecycle-page: disconnectedCallback');
  }

  _increment() {
    this._count++;
  }

  static get styles() {
    return [LifecyclePageStyles];
  }

  // Define el template que Lit convierte en DOM.
  render() {
    console.info('lifecycle-page: render');
    return html`
      <h2>Ciclo de vida</h2>
      <p>
        Abre la consola y usa los botones para observar los métodos del ciclo de
        vida.
      </p>
      <p>Contador: ${this._count}</p>
      <button @click=${this._increment}>Incrementar y ejecutar updated</button>
      <h3>Orden simplificado</h3>
      <ol>
        <li>constructor: inicializa la instancia.</li>
        <li>connectedCallback: el elemento entra al documento.</li>
        <li>willUpdate y update: preparan y aplican la actualización.</li>
        <li>render: describe el contenido que Lit dibuja.</li>
        <li>firstUpdated: termina la primera actualización.</li>
        <li>updated: termina cada actualización.</li>
        <li>disconnectedCallback: el elemento sale del documento.</li>
      </ol>
    `;
  }
}
```

**Paso 2.** Crea los estilos (`LifecyclePageStyles`) con los mínimos.

**Paso 3.** En `src/pages/index.js` agrega `export { LifecyclePage } from './lifecycle-page/lifecycle-page.js';`.

**Paso 4.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_LIFECYCLE = 'lifecycle';`.

**Paso 5.** En `src/formacion.js`:

```javascript
import { LifecyclePage } from './pages/index.js';
// en scopedElements:
'lifecycle-page': LifecyclePage,
// en el switch:
case SECTION_TYPE_LIFECYCLE:
  return html`<lifecycle-page></lifecycle-page>`;
```

**Paso 6.** Crea `demo/lifecycle.html` con `section-type="lifecycle"`.

**Probar:** abre la consola del navegador (F12). Recarga la página y observa el orden de los mensajes. Luego haz clic en el botón y verifica que solo se ejecutan `willUpdate`, `update`, `render` y `updated`. Así ves que el constructor y `firstUpdated` solo ocurren una vez.

---

### Ejemplo 7: Directivas (`directives`)

**Qué aprendes:** usar directivas integradas de Lit (`classMap`, `styleMap`, `when`, `choose`, `map`, `repeat`, `join`, `range`, `ifDefined`, `ref`).

**Archivos**

- Crear: `src/pages/directives-page/directives-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/directives.html`

**Paso 1.** Crea `src/pages/directives-page/directives-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { join } from 'lit/directives/join.js';
import { map } from 'lit/directives/map.js';
import { range } from 'lit/directives/range.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import { DirectivesPageStyles } from './directives-page.styles.js';

const INITIAL_ITEMS = [
  { id: 1, name: 'Aprender Lit' },
  { id: 2, name: 'Practicar directivas' },
];

export class DirectivesPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'directives-page';
  }

  static get properties() {
    return {
      _isActive: {
        type: Boolean,
        state: true,
      },
      _items: {
        type: Array,
        state: true,
      },
      _choice: {
        type: String,
        state: true,
      },
      _showLink: {
        type: Boolean,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this._isActive = false;
    this._items = [];
    this._choice = '';
    this._showLink = false;
    this._focusedInput = {};
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);

    if (!this.hasUpdated) {
      this._items = [...INITIAL_ITEMS];
      this._choice = 'first';
      this._focusedInput = createRef();
    }
  }

  _toggleActive() {
    this._isActive = !this._isActive;
  }

  _addItem() {
    const id = this._items.length
      ? Math.max(...this._items.map((item) => item.id)) + 1
      : 1;
    this._items = [...this._items, { id, name: `Nuevo elemento ${id}` }];
  }

  _toggleChoice() {
    this._choice = this._choice === 'first' ? 'second' : 'first';
  }

  _toggleLink() {
    this._showLink = !this._showLink;
  }

  _focusInput() {
    this._focusedInput.value?.focus();
  }

  static get styles() {
    return [DirectivesPageStyles];
  }

  render() {
    return html`
      <h2>Directivas integradas de Lit</h2>
      <p>
        Una directiva personaliza cómo se dibuja una expresión de la plantilla.
        Aquí tienes ejemplos de 10 directivas integradas de Lit.
      </p>

      <section class="directive" data-directive="classMap">
        <h3><code>classMap</code></h3>
        <p>Agrega o quita clases CSS según los valores de un objeto.</p>
        <div class=${classMap({ panel: true, active: this._isActive })}>
          Panel ${this._isActive ? 'activo' : 'inactivo'}
        </div>
        <button data-action="toggle-class" @click=${this._toggleActive}>
          Alternar clase
        </button>
      </section>

      <section class="directive" data-directive="styleMap">
        <h3><code>styleMap</code></h3>
        <p>Aplica estilos en línea a partir de las propiedades de un objeto.</p>
        <p
          class="panel"
          style=${styleMap({
            color: this._isActive ? '#155724' : '#333333',
            backgroundColor: this._isActive ? '#d4edda' : '#eeeeee',
          })}
        >
          Mis estilos cambian junto con classMap.
        </p>
      </section>

      <section class="directive" data-directive="when">
        <h3><code>when</code></h3>
        <p>Elige una de dos plantillas según una condición.</p>
        ${when(
          this._isActive,
          () => html`<p>La condición es verdadera.</p>`,
          () => html`<p>La condición es falsa.</p>`,
        )}
      </section>

      <section class="directive" data-directive="choose">
        <h3><code>choose</code></h3>
        <p>Elige una plantilla entre varios casos.</p>
        <p>
          ${choose(
            this._choice,
            [
              ['first', () => html`Caso primero`],
              ['second', () => html`Caso segundo`],
            ],
            () => html`Caso por defecto`,
          )}
        </p>
        <button @click=${this._toggleChoice}>Cambiar caso</button>
      </section>

      <section class="directive" data-directive="map">
        <h3><code>map</code></h3>
        <p>Transforma cada valor de una colección en contenido renderizable.</p>
        <ul>
          ${map(this._items, (item) => html`<li>${item.name}</li>`)}
        </ul>
      </section>

      <section class="directive" data-directive="repeat">
        <h3><code>repeat</code></h3>
        <p>
          Renderiza una colección y usa una clave estable para conservar la
          identidad de cada elemento.
        </p>
        <ul>
          ${repeat(
            this._items,
            (item) => item.id,
            (item) => html`<li>${item.name} (id: ${item.id})</li>`,
          )}
        </ul>
        <button data-action="add-repeat-item" @click=${this._addItem}>
          Agregar elemento
        </button>
      </section>

      <section class="directive" data-directive="join">
        <h3><code>join</code></h3>
        <p>Intercala un separador entre los valores de una colección.</p>
        <p>
          ${join(
            this._items.map((item) => item.name),
            html`<span aria-hidden="true"> · </span>`,
          )}
        </p>
      </section>

      <section class="directive" data-directive="range">
        <h3><code>range</code></h3>
        <p>Crea una secuencia de números para recorrer con un bucle.</p>
        <p>${map(range(5, 1), (number) => html`<span>${number} </span>`)}</p>
      </section>

      <section class="directive" data-directive="ifDefined">
        <h3><code>ifDefined</code></h3>
        <p>Omite un atributo cuando su valor es <code>undefined</code>.</p>
        <a
          href=${ifDefined(
            this._showLink ? '#directiva-disponible' : undefined,
          )}
        >
          Enlace ${this._showLink ? 'con href' : 'sin href'}
        </a>
        <button @click=${this._toggleLink}>Alternar href</button>
      </section>

      <section class="directive" data-directive="ref">
        <h3><code>ref</code></h3>
        <p>Guarda una referencia al elemento creado por la plantilla.</p>
        <input ${ref(this._focusedInput)} />
        <button @click=${this._focusInput}>Enfocar input</button>
      </section>
    `;
  }
}
```

**Paso 2.** Crea los estilos (`DirectivesPageStyles`). Para que se vea mejor, agrega la clase `.panel` con `.active` (por ejemplo, un borde y un fondo que cambie). Es opcional para entender la lógica.

**Paso 3.** En `src/pages/index.js` agrega `export { DirectivesPage } from './directives-page/directives-page.js';`.

**Paso 4.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_DIRECTIVES = 'directives';`.

**Paso 5.** En `src/formacion.js`:

```javascript
import { DirectivesPage } from './pages/index.js';
// en scopedElements:
'directives-page': DirectivesPage,
// en el switch:
case SECTION_TYPE_DIRECTIVES:
  return html`<directives-page></directives-page>`;
```

**Paso 6.** Crea `demo/directives.html` con `section-type="directives"`.

**Explicación:** una directiva no es un componente. Es una función que decide **cómo** se dibuja un valor dentro de la plantilla. `repeat` usa `item.id` como clave para no volver a crear elementos que ya existen, por eso es mejor que `map` cuando la lista cambia.

---

### Ejemplo 8: Referencias a elementos (`ref`)

**Qué aprendes:** acceder a un elemento del DOM desde código con `createRef()` o con un callback `ref(...)`.

**Archivos**

- Crear: `src/pages/ref-page/ref-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/ref.html`

**Paso 1.** Crea `src/pages/ref-page/ref-page.js`:

```javascript
import { LitElement, html } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';
import { createRef, ref } from 'lit/directives/ref.js';

import { RefPageStyles } from './ref-page.styles.js';

export class RefPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'ref-page';
  }

  static get properties() {
    return {
      /**
       * reference to the input created with createRef()
       * @default {}
       * @property {Object}
       * @private
       */
      _inputRef: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this._inputRef = createRef();
    this._callbackInput = null;
    this._callbackRef = (element) => {
      this._callbackInput = element;
    };
  }

  static get styles() {
    return [RefPageStyles];
  }

  _focusCreatedRef() {
    this._inputRef.value?.focus();
  }

  _focusCallbackRef() {
    this._callbackInput?.focus();
  }

  render() {
    return html`
      <h2>Referencias a elementos</h2>
      <p>
        <code>createRef()</code> guarda una referencia al primer input;
        <code>ref(callback)</code> guarda la referencia al segundo.
      </p>

      <label>
        Input con createRef:
        <input ${ref(this._inputRef)} type="text" />
      </label>
      <button @click=${this._focusCreatedRef}>Enfocar con createRef</button>

      <label>
        Input con callback ref:
        <input ${ref(this._callbackRef)} type="text" />
      </label>
      <button @click=${this._focusCallbackRef}>
        Enfocar con ref(callback)
      </button>
    `;
  }
}
```

**Paso 2.** Crea los estilos (`RefPageStyles`) mínimos.

**Paso 3.** En `src/pages/index.js` agrega `export { RefPage } from './ref-page/ref-page.js';`.

**Paso 4.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_REF = 'ref';`.

**Paso 5.** En `src/formacion.js`:

```javascript
import { RefPage } from './pages/index.js';
// en scopedElements:
'ref-page': RefPage,
// en el switch:
case SECTION_TYPE_REF:
  return html`<ref-page></ref-page>`;
```

**Paso 6.** Crea `demo/ref.html` con `section-type="ref"`.

**Explicación:**

- `createRef()` crea un contenedor. Lo asignas con `ref(this._inputRef)` y luego lo lees con `this._inputRef.value`.
- `ref(callback)` ejecuta una función cuando el elemento aparece. Recibe el elemento directamente.
- Usa `?.` (encadenamiento opcional) porque el elemento puede no existir todavía.

---

### Ejemplo 9: API con Data Manager (`api-dm`)

**Qué aprendes:** separar la lógica de datos en un elemento (Data Manager), llamarlo con una referencia y recibir el resultado con eventos.

**Archivos**

- Crear: `src/elements/api-account-dm/api-account-dm.js`
- Crear: `src/pages/api-dm-pages/api-dm-pages.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/api-dm.html`

**Paso 1.** Crea `src/elements/api-account-dm/api-account-dm.js` (el Data Manager). No pinta nada, solo responde con eventos:

```javascript
import { LitElement, nothing } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

const MOCK_ACCOUNTS = [
  { id: '001', name: 'Cuenta de ahorro', balance: 1500, currency: 'PEN' },
  { id: '002', name: 'Cuenta corriente', balance: 3200, currency: 'PEN' },
];

export class ApiAccountDm extends ComponentMixin(LitElement) {
  static get is() {
    return 'api-account-dm';
  }

  /**
   * Simula una consulta y comunica el resultado mediante eventos.
   * @param {boolean} isError Indica si se debe simular un error.
   * @returns {Promise<void>}
   */
  async getAccounts(isError = false) {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (isError) {
      this.dispatchEvent(
        new CustomEvent('api-account-dm-error', {
          detail: { message: 'No se pudieron cargar las cuentas.' },
        }),
      );
      return;
    }

    this.dispatchEvent(
      new CustomEvent('api-account-dm-success', {
        detail: MOCK_ACCOUNTS.map((account) => ({ ...account })),
      }),
    );
  }

  render() {
    return nothing;
  }
}
```

**Paso 2.** Crea `src/pages/api-dm-pages/api-dm-pages.js`:

```javascript
import { LitElement, html, nothing } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';
import { createRef, ref } from 'lit/directives/ref.js';

import { ApiAccountDm } from '../../elements/api-account-dm/api-account-dm.js';

export class ApiDmPages extends ComponentMixin(LitElement) {
  static get is() {
    return 'api-dm-pages';
  }

  static get scopedElements() {
    return {
      'api-account-dm': ApiAccountDm,
    };
  }

  static get properties() {
    return {
      _accounts: { type: Array, state: true },
      _error: { type: String, state: true },
      _loading: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this._accounts = [];
    this._error = '';
    this._loading = false;
    this._accountDmRef = {};
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);

    if (!this.hasUpdated) {
      this._accountDmRef = createRef();
    }
  }

  _getAccounts(isError) {
    this._loading = true;
    this._accounts = [];
    this._error = '';
    this._accountDmRef.value.getAccounts(isError);
  }

  _onAccountsSuccess({ detail }) {
    this._accounts = detail;
    this._loading = false;
  }

  _onAccountsError({ detail }) {
    this._error = detail.message;
    this._loading = false;
  }

  render() {
    return html`
      <api-account-dm
        hidden
        ${ref(this._accountDmRef)}
        @api-account-dm-success=${this._onAccountsSuccess}
        @api-account-dm-error=${this._onAccountsError}
      ></api-account-dm>

      <h2>Cuentas mediante un Data Manager</h2>
      <p>
        La pagina invoca getAccounts(isError) mediante ref y muestra el
        resultado recibido en los eventos del Data Manager.
      </p>
      <button
        ?disabled=${this._loading}
        @click=${() => this._getAccounts(false)}
      >
        Cargar cuentas
      </button>
      <button
        ?disabled=${this._loading}
        @click=${() => this._getAccounts(true)}
      >
        Simular error
      </button>

      ${this._loading
        ? html`<p role="status">Cargando cuentas...</p>`
        : nothing}
      ${this._error ? html`<p role="alert">${this._error}</p>` : nothing}
      <ul aria-label="Cuentas">
        ${this._accounts.map(
          (account) => html`
            <li>
              ${account.name} (${account.id}): ${account.balance}
              ${account.currency}
            </li>
          `,
        )}
      </ul>
    `;
  }
}
```

**Paso 3.** Crea los estilos de `api-dm-pages` (mínimos, `ApiDmPagesStyles`).

**Paso 4.** En `src/pages/index.js` agrega `export { ApiDmPages } from './api-dm-pages/api-dm-pages.js';`.

**Paso 5.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_API_DM = 'api-dm';`.

**Paso 6.** En `src/formacion.js`:

```javascript
import { ApiDmPages } from './pages/index.js';
// en scopedElements:
'api-dm-pages': ApiDmPages,
// en el switch:
case SECTION_TYPE_API_DM:
  return html`<api-dm-pages></api-dm-pages>`;
```

**Paso 7.** Crea `demo/api-dm.html` con `section-type="api-dm"`.

**Explicación del flujo:**

1. El botón llama `_getAccounts()`.
2. La página le pide al Data Manager que consulte, usando la referencia (`ref`).
3. El Data Manager responde con `api-account-dm-success` o `api-account-dm-error`.
4. La página recibe el evento y actualiza su estado (`_accounts`, `_error`, `_loading`).

Así el Data Manager puede cambiar a una API real sin tocar la pantalla.

**Probar:** haz clic en *Cargar cuentas* (espera 0.7 s) y luego en *Simular error*.

---

### Ejemplo 10: Primer componente real (`first-component`)

**Qué aprendes:** juntar todo. Consumir una API simulada, mostrar tarjetas, abrir un modal con el detalle, mostrar un spinner y animar la entrada.

**Archivos**

- Crear: `src/elements/product-card/product-card.js` y `.styles.js`
- Crear: `src/elements/product-detail/product-detail.js` y `.styles.js`
- Crear: `src/pages/first-component-page/first-component-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/first-component.html`

**Paso 1.** Crea `src/elements/product-card/product-card.js` (tarjeta que emite el clic):

```javascript
import { LitElement, html, nothing } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { ProductCardStyles } from './product-card.styles.js';

export class ProductCard extends ComponentMixin(LitElement) {
  static get is() {
    return 'product-card';
  }

  static get properties() {
    return {
      product: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.product = null;
  }

  static get styles() {
    return [ProductCardStyles];
  }

  _onSelect() {
    this.dispatchEvent(
      new CustomEvent('product-card-click', {
        detail: { id: this.product.id },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (!this.product) {
      return nothing;
    }

    const { id, nombre, precio, categoria, stock, activo } = this.product;

    return html`
      <article>
        <button type="button" @click=${this._onSelect}>
          <span class="card-header">
            <span class="category">${categoria}</span>
            <span class="status ${activo ? 'active' : ''}">
              ${activo ? 'Activo' : 'Inactivo'}
            </span>
          </span>
          <span class="name">${nombre}</span>
          <span class="price">
            ${new Intl.NumberFormat('es-PE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(precio)}
          </span>
          <span class="card-footer">
            <span>ID: ${id}</span>
            <span>Stock: <strong>${stock}</strong></span>
            <span class="arrow" aria-hidden="true">&rarr;</span>
          </span>
        </button>
      </article>
    `;
  }
}
```

**Paso 2.** Crea `src/elements/product-detail/product-detail.js` (ficha del producto dentro del modal):

```javascript
import { LitElement, html, nothing } from 'lit';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { ProductDetailStyles } from './product-detail.styles.js';

export class ProductDetail extends ComponentMixin(LitElement) {
  static get is() {
    return 'product-detail';
  }

  static get properties() {
    return {
      product: { type: Object, attribute: false },
    };
  }

  constructor() {
    super();
    this.product = null;
  }

  static get styles() {
    return [ProductDetailStyles];
  }

  render() {
    if (!this.product) {
      return nothing;
    }

    const { id, nombre, precio, categoria, stock, activo } = this.product;

    return html`
      <section aria-labelledby="product-name">
        <header class="summary">
          <p class="eyebrow">Ficha del producto</p>
          <h3 id="product-name">${nombre}</h3>
          <p class="price-label">Precio</p>
          <p class="price">
            ${new Intl.NumberFormat('es-PE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(precio)}
          </p>
        </header>

        <dl>
          <div>
            <dt>ID del producto</dt>
            <dd>${id}</dd>
          </div>
          <div>
            <dt>Categoria</dt>
            <dd class="category">${categoria}</dd>
          </div>
          <div>
            <dt>Unidades en stock</dt>
            <dd>${stock}</dd>
          </div>
          <div>
            <dt>Estado</dt>
            <dd>
              <span class="status ${activo ? 'active' : ''}">
                ${activo ? 'Activo' : 'Inactivo'}
              </span>
            </dd>
          </div>
        </dl>
      </section>
    `;
  }
}
```

**Paso 3.** Crea `src/pages/first-component-page/first-component-page.js`:

```javascript
import { LitElement, html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { TransitionContainer } from '@ac-components/ac-transition-container';
import { ApiProductos } from '@ac-components/ac-api-productos';
import { LinkBasic } from '@ac-components/ac-link-basic';
import { ModalBasic } from '@ac-components/ac-modal-basic';
import { SpinnerBasic } from '@ac-components/ac-spinner-basic';

import { ProductCard } from '../../elements/product-card/product-card.js';
import { ProductDetail } from '../../elements/product-detail/product-detail.js';
import { FirstComponentPageStyles } from './first-component-page.styles.js';

export class FirstComponentPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'first-component-page';
  }

  static get scopedElements() {
    return {
      'ac-transition-container': TransitionContainer,
      'ac-api-productos': ApiProductos,
      'ac-link-basic': LinkBasic,
      'product-card': ProductCard,
      'product-detail': ProductDetail,
      'ac-modal-basic': ModalBasic,
      'ac-spinner-basic': SpinnerBasic,
    };
  }

  static get properties() {
    return {
      /**
       * Indica si la página principal está abierta o no.
       * @type {Boolean}
       * @default false
       */
      _isOpenMainPage: {
        type: Boolean,
        state: false,
      },
      /**
       * Lista de productos obtenidos desde la API.
       * @type {Array}
       * @default []
       */
      _products: {
        type: Array,
        state: true,
      },
      /**
       * Producto seleccionado actualmente.
       * @type {Object}
       * @default null
       */
      _selectedProduct: {
        type: Object,
        state: true,
      },
      /**
       * Indica si el modal de producto está abierto.
       * @type {Boolean}
       * @default false
       */
      _isProductModalOpen: {
        type: Boolean,
        state: true,
      },
      /**
       * Indica si se está cargando información.
       * @type {Boolean}
       * @default false
       */
      _isLoading: {
        type: Boolean,
        state: true,
      },
    };
  }

  constructor() {
    super();
    this._apiProductos = {};
    this._products = [];
    this._isOpenMainPage = false;
    this._selectedProduct = null;
    this._isProductModalOpen = false;
    this._isLoading = false;
  }

  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);

    if (!this.hasUpdated) {
      this._apiProductos = createRef();
    }
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.init();
  }

  init() {
    this._isLoading = true;
    this._apiProductos.value.listarProductos();
  }

  _onListSuccess({ detail }) {
    this._isLoading = false;
    this._isOpenMainPage = true;
    this._products = detail?.data;
  }

  _onProductClick({ detail }) {
    this._isLoading = true;
    this._apiProductos.value.obtenerProducto(detail.id);
  }

  _onProductModalClose() {
    this._isProductModalOpen = false;
  }

  _onGetSuccess({ detail }) {
    this._isLoading = false;
    this._selectedProduct = detail?.data;
    this._isProductModalOpen = true;
  }

  _renderTransitionContainer() {
    return html`<ac-transition-container
      id="transition-default-title"
      .open=${this._isOpenMainPage}
    >
      ${this._products.map(
        (product) => html`
          <product-card
            .product=${product}
            @product-card-click=${this._onProductClick}
          ></product-card>
        `,
      )}
    </ac-transition-container>`;
  }

  _renderProductModal() {
    const product = this._selectedProduct;

    return html`
      <ac-modal-basic
        header="Detalle del producto"
        .open=${this._isProductModalOpen}
        @ac-modal-basic-close=${this._onProductModalClose}
      >
        ${product
          ? html`<product-detail .product=${product}></product-detail>`
          : nothing}
      </ac-modal-basic>
    `;
  }

  _renderApiProductos() {
    return html`<ac-api-productos
      ${ref(this._apiProductos)}
      @ac-api-productos-list-success=${this._onListSuccess}
      @ac-api-productos-get-product-success=${this._onGetSuccess}
    ></ac-api-productos>`;
  }

  static get styles() {
    return [FirstComponentPageStyles];
  }

  _renderSpinner() {
    return this._isLoading
      ? html`
          <div class="spinner-overlay" aria-busy="true">
            <ac-spinner-basic
              size="lg"
              a11y-label="Cargando productos"
            ></ac-spinner-basic>
          </div>
        `
      : nothing;
  }

  render() {
    return html` ${this._isOpenMainPage ? nothing : this._renderSpinner()}
    ${this._renderTransitionContainer()} ${this._renderApiProductos()}
    ${this._renderProductModal()}`;
  }
}
```

**Paso 4.** Crea `src/pages/first-component-page/first-component-page.styles.js`. Este sí necesita estilo para el spinner (la capa que cubre la pantalla mientras carga):

```javascript
import { css } from 'lit';

export const FirstComponentPageStyles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  .spinner-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.35);
  }
`;
```

**Paso 5.** Crea `src/pages/index.js` (o agrega la línea) con `export { FirstComponentPage } from './first-component-page/first-component-page.js';`.

**Paso 6.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_FIRST_COMPONENT = 'first-component';`.

**Paso 7.** En `src/formacion.js`:

```javascript
import { FirstComponentPage } from './pages/index.js';
// en scopedElements:
'first-component-page': FirstComponentPage,
// en el switch:
case SECTION_TYPE_FIRST_COMPONENT:
  return html`<first-component-page></first-component-page>`;
```

**Paso 8.** Crea `demo/first-component.html` con `section-type="first-component"`.

**Explicación del flujo:**

1. Al cargar, `firstUpdated` llama a `init()`, que pide la lista de productos a la API.
2. Mientras carga, se muestra el spinner.
3. Cuando llega la lista (`ac-api-productos-list-success`), se muestran las tarjetas con `ac-transition-container`.
4. Al hacer clic en una tarjeta (`product-card-click`), se pide el detalle con `obtenerProducto`.
5. Cuando llega el detalle (`ac-api-productos-get-product-success`), se abre el modal con `product-detail`.

**Probar:** verifica el spinner, luego las tarjetas. Haz clic en una tarjeta y revisa el modal.

---

### Ejemplo 11: Transferencia en pasos (`transfer-multistep`)

**Qué aprendes:** un flujo de varios pasos dentro de un modal, con validaciones, estado compartido, un temporizador de simulación y `keyed` para reiniciar el flujo.

> **Nota:** en el repositorio original, `_startFlow()` asigna `this._selectedAccountId = {};`. En esta guía se usa `null`, igual que en `_resetFlow`, porque la propiedad guarda un id de cuenta o `null`, nunca un objeto.

**Archivos**

- Crear: `src/pages/transfer-multistep-page/transfer-multistep-page.js` y `.styles.js`
- Modificar: `src/pages/index.js`, `src/utils/constants.js`, `src/formacion.js`
- Crear: `demo/transfer-multistep.html`

**Paso 1.** Instala lo necesario si aún no lo hiciste (sección 3). Este ejemplo usa `ac-button-basic`, `ac-expandable-multistep`, `ac-input-basic`, `ac-link-basic`, `ac-modal-basic`, `ac-spinner-basic` y `ac-text-basic`.

**Paso 2.** Crea `src/pages/transfer-multistep-page/transfer-multistep-page.js`:

```javascript
import { LitElement, html, nothing } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { keyed } from 'lit/directives/keyed.js';
import { ComponentMixin } from '@ac-base/ac-component-mixin';

import { ButtonBasic } from '@ac-components/ac-button-basic';
import { ExpandableMultistep } from '@ac-components/ac-expandable-multistep';
import { InputBasic } from '@ac-components/ac-input-basic';
import { LinkBasic } from '@ac-components/ac-link-basic';
import { ModalBasic } from '@ac-components/ac-modal-basic';
import { SpinnerBasic } from '@ac-components/ac-spinner-basic';
import { TextBasic } from '@ac-components/ac-text-basic';

import { TransferMultistepPageStyles } from './transfer-multistep-page.styles.js';

// Datos de maqueta (sin servicio): reemplazar por la respuesta real.
const ACCOUNTS = [
  { id: 'sueldo', name: 'Cuenta sueldo', number: '•••• 1234', balance: 1500 },
  { id: 'ahorros', name: 'Cuenta ahorros', number: '•••• 5678', balance: 800 },
  {
    id: 'corriente',
    name: 'Cuenta corriente',
    number: '•••• 9012',
    balance: 250,
  },
  { id: 'dolares', name: 'Cuenta dólares', number: '•••• 3456', balance: 3000 },
  {
    id: 'negocios',
    name: 'Cuenta negocios',
    number: '•••• 7788',
    balance: 120,
  },
  { id: 'viajes', name: 'Cuenta viajes', number: '•••• 1010', balance: 40 },
];
const DOCUMENTS = [
  { label: 'Términos y condiciones de transferencias', href: '#' },
  { label: 'Política de protección de datos', href: '#' },
  { label: 'Tarifario vigente', href: '#' },
];
const VISIBLE_ACCOUNTS = 4;
const TRANSFER_DELAY_MS = 1500;

const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
});
const formatAmount = (value) => currencyFormatter.format(value);

const kvRow = (label, value) => html`
  <div class="kv__row">
    <ac-text-basic tag="span" class="kv__label">${label}</ac-text-basic>
    <ac-text-basic tag="strong" class="kv__value">${value}</ac-text-basic>
  </div>
`;

export class TransferMultistepPage extends ComponentMixin(LitElement) {
  static get is() {
    return 'transfer-multistep-page';
  }

  static get scopedElements() {
    return {
      'ac-button-basic': ButtonBasic,
      'ac-expandable-multistep': ExpandableMultistep,
      'ac-input-basic': InputBasic,
      'ac-modal-basic': ModalBasic,
      'ac-link-basic': LinkBasic,
      'ac-spinner-basic': SpinnerBasic,
      'ac-text-basic': TextBasic,
    };
  }

  static get properties() {
    return {
      /**
       * Indica si el modal informativo está abierto.
       * @type {Boolean}
       * @default false
       */
      _isInfoModalOpen: { type: Boolean, state: true },
      /**
       * Indica si el modal multistep de transferencia está abierto.
       * @type {Boolean}
       * @default false
       */
      _isFlowOpen: { type: Boolean, state: true },
      /**
       * Indica si el modal del comprobante está abierto.
       * @type {Boolean}
       * @default false
       */
      _isVoucherOpen: { type: Boolean, state: true },
      /**
       * Importe ingresado en el paso 1 (texto del input).
       * @type {String}
       * @default ''
       */
      _amount: { type: String, state: true },
      /**
       * Id de la cuenta de origen seleccionada.
       * @type {String|null}
       * @default null
       */
      _selectedAccountId: { type: String, state: true },
      /**
       * Indica si se muestran todas las cuentas o solo las primeras.
       * @type {Boolean}
       * @default false
       */
      _showAllAccounts: { type: Boolean, state: true },
      /**
       * Indica si el usuario autorizó los documentos.
       * @type {Boolean}
       * @default false
       */
      _documentsAccepted: { type: Boolean, state: true },
      /**
       * Indica si la transferencia se está procesando.
       * @type {Boolean}
       * @default false
       */
      _isTransferring: { type: Boolean, state: true },
      /**
       * Clave del multistep; al cambiarla se recrea y se reinicia el flujo.
       * @type {Number}
       * @default 0
       */
      _flowKey: { type: Number, state: true },
      /**
       * Datos del comprobante de la última transferencia.
       * @type {Object|null}
       * @default null
       */
      _voucher: { type: Object, state: true },
    };
  }

  constructor() {
    super();
    this._isInfoModalOpen = false;
    this._isFlowOpen = false;
    this._isVoucherOpen = false;
    this._amount = '';
    this._selectedAccountId = null;
    this._showAllAccounts = false;
    this._documentsAccepted = false;
    this._isTransferring = false;
    this._flowKey = 0;
    this._stepRefs = [createRef(), createRef(), createRef(), createRef()];
    this._voucher = null;
    this._transferTimer = undefined;
  }

  disconnectedCallback() {
    clearTimeout(this._transferTimer);
    super.disconnectedCallback();
  }

  get _amountValue() {
    return Number.parseFloat(this._amount) || 0;
  }

  get _selectedAccount() {
    return (
      ACCOUNTS.find((account) => account.id === this._selectedAccountId) ?? null
    );
  }

  _isInsufficient(account) {
    return account.balance < this._amountValue;
  }

  _openInfoModal() {
    this._isInfoModalOpen = true;
  }

  _onInfoCancel() {
    this._isInfoModalOpen = false;
  }

  _onInfoContinue() {
    this._isInfoModalOpen = false;
    this._startFlow();
  }

  _startFlow() {
    this._flowKey += 1;
    this._amount = '';
    this._selectedAccountId = null;
    this._showAllAccounts = false;
    this._documentsAccepted = false;
    this._isTransferring = false;
    this._isFlowOpen = true;
  }

  _onFlowClose() {
    clearTimeout(this._transferTimer);
    this._isTransferring = false;
    this._isFlowOpen = false;
  }

  _completeStep(index) {
    this._stepRefs[index].value?.complete();
  }

  _transfer() {
    if (this._isTransferring) return;
    this._isTransferring = true;
    this._transferTimer = setTimeout(() => {
      this._voucher = {
        amount: this._amountValue,
        account: this._selectedAccount,
        date: new Date().toLocaleString('es-PE'),
        operation: String(Date.now()).slice(-8),
      };
      this._isTransferring = false;
      this._isFlowOpen = false;
      this._isVoucherOpen = true;
    }, TRANSFER_DELAY_MS);
  }

  _onVoucherClose() {
    this._isVoucherOpen = false;
  }

  _onAmountInput(event) {
    this._amount = event.detail.value;
    const selected = this._selectedAccount;
    if (selected && this._isInsufficient(selected)) {
      this._selectedAccountId = null;
    }
  }

  _selectAccount(id) {
    this._selectedAccountId = id;
  }

  _toggleAccounts() {
    this._showAllAccounts = !this._showAllAccounts;
  }

  _onDocumentsChange(event) {
    this._documentsAccepted = event.target.checked;
  }

  _renderInfoModal() {
    return html`
      <ac-modal-basic
        header="Transferencia"
        size="full"
        .open=${this._isInfoModalOpen}
        primary-text="Continuar"
        secondary-text="Cancelar"
        link-text="Términos y condiciones"
        link-href="#"
        @ac-modal-basic-primary-click=${this._onInfoContinue}
        @ac-modal-basic-secondary-click=${this._onInfoCancel}
        @ac-modal-basic-close=${this._onInfoCancel}
      >
        <div class="info">
          <ac-text-basic tag="p" class="info__lead">
            Envía dinero desde tus cuentas de forma rápida y segura.
          </ac-text-basic>
          <div class="kv">
            ${kvRow('Tipo', 'Transferencia entre cuentas')}
            ${kvRow('Disponibilidad', 'Inmediata')}
            ${kvRow('Comisión', formatAmount(0))}
          </div>
        </div>
      </ac-modal-basic>
    `;
  }

  _renderAccount(account) {
    const insufficient = this._isInsufficient(account);
    return html`
      <li class="account ${insufficient ? 'account--disabled' : ''}">
        <label class="account__row">
          <input
            type="radio"
            name="origin-account"
            .value=${account.id}
            .checked=${this._selectedAccountId === account.id}
            ?disabled=${insufficient}
            @change=${() => this._selectAccount(account.id)}
          />
          <span class="account__info">
            <ac-text-basic tag="strong">${account.name}</ac-text-basic>
            <ac-text-basic tag="span" size="sm"
              >${account.number}</ac-text-basic
            >
          </span>
          <ac-text-basic tag="span" class="account__balance"
            >${formatAmount(account.balance)}</ac-text-basic
          >
        </label>
        ${insufficient
          ? html`<ac-text-basic class="account__error" tag="p" size="sm"
              >No tiene saldo en esta cuenta.</ac-text-basic
            >`
          : nothing}
      </li>
    `;
  }

  _renderFlowModal() {
    const accounts = this._showAllAccounts
      ? ACCOUNTS
      : ACCOUNTS.slice(0, VISIBLE_ACCOUNTS);
    const hiddenCount = ACCOUNTS.length - VISIBLE_ACCOUNTS;
    const selected = this._selectedAccount;

    return html`
      <ac-modal-basic
        header="Nueva transferencia"
        size="full"
        .open=${this._isFlowOpen}
        .persistent=${this._isTransferring}
        @ac-modal-basic-close=${this._onFlowClose}
      >
        ${keyed(
          this._flowKey,
          html`
            <ac-expandable-multistep>
              <ac-expandable-step
                ${ref(this._stepRefs[0])}
                header="Importe"
                step-number="1"
                total-steps="4"
              >
                <ac-input-basic
                  label="Monto a transferir (S/)"
                  type="number"
                  name="amount"
                  placeholder="0.00"
                  .value=${this._amount}
                  @ac-input-basic-input=${this._onAmountInput}
                ></ac-input-basic>
                <div class="step-actions">
                  <ac-button-basic
                    ambient="primary"
                    ?disabled=${this._amountValue <= 0}
                    @click=${() => this._completeStep(0)}
                  >
                    Continuar
                  </ac-button-basic>
                </div>
                <div slot="summary">
                  <ac-text-basic tag="span"
                    >${formatAmount(this._amountValue)}</ac-text-basic
                  >
                </div>
              </ac-expandable-step>

              <ac-expandable-step
                ${ref(this._stepRefs[1])}
                header="Cuenta de origen"
                step-number="2"
                total-steps="4"
              >
                <ul
                  class="account-list"
                  role="radiogroup"
                  aria-label="Cuentas de origen"
                >
                  ${accounts.map((account) => this._renderAccount(account))}
                </ul>
                ${hiddenCount > 0
                  ? html`<ac-button-basic
                      ambient="secondary"
                      aria-expanded=${this._showAllAccounts}
                      @click=${this._toggleAccounts}
                    >
                      ${this._showAllAccounts
                        ? 'Ver menos'
                        : `Ver más (${hiddenCount})`}
                    </ac-button-basic>`
                  : nothing}
                <div class="step-actions">
                  <ac-button-basic
                    ambient="primary"
                    ?disabled=${!selected || this._isInsufficient(selected)}
                    @click=${() => this._completeStep(1)}
                  >
                    Continuar
                  </ac-button-basic>
                </div>
                <div slot="summary">
                  <ac-text-basic tag="span"
                    >${selected?.name ?? ''}
                    ${selected?.number ?? ''}</ac-text-basic
                  >
                </div>
              </ac-expandable-step>

              <ac-expandable-step
                ${ref(this._stepRefs[2])}
                header="Documentos"
                step-number="3"
                total-steps="4"
              >
                <ul class="doc-list">
                  ${DOCUMENTS.map(
                    (doc) =>
                      html`<li>
                        <ac-link-basic
                          text=${doc.label}
                          href=${doc.href}
                        ></ac-link-basic>
                      </li>`,
                  )}
                </ul>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    .checked=${this._documentsAccepted}
                    @change=${this._onDocumentsChange}
                  />
                  <ac-text-basic tag="p" size="sm" class="checkbox__text">
                    Autorizo el débito de mi cuenta de origen y confirmo haber
                    leído los documentos.
                  </ac-text-basic>
                </label>
                <div class="step-actions">
                  <ac-button-basic
                    ambient="primary"
                    ?disabled=${!this._documentsAccepted}
                    @click=${() => this._completeStep(2)}
                  >
                    Continuar
                  </ac-button-basic>
                </div>
                <div slot="summary">Documentos autorizados</div>
              </ac-expandable-step>

              <ac-expandable-step
                ${ref(this._stepRefs[3])}
                header="Confirmar"
                step-number="4"
                total-steps="4"
              >
                ${this._isTransferring
                  ? html`<div class="transfer-loading" aria-busy="true">
                      <ac-spinner-basic
                        size="lg"
                        a11y-label="Procesando transferencia"
                      ></ac-spinner-basic>
                      <ac-text-basic tag="p"
                        >Procesando transferencia…</ac-text-basic
                      >
                    </div>`
                  : html`
                      <div class="kv">
                        ${kvRow('Importe', formatAmount(this._amountValue))}
                        ${kvRow('Cuenta de origen', selected?.name)}
                      </div>
                      <div class="step-actions">
                        <ac-button-basic
                          ambient="primary"
                          @click=${this._transfer}
                        >
                          Transferir
                        </ac-button-basic>
                      </div>
                    `}
              </ac-expandable-step>
            </ac-expandable-multistep>
          `,
        )}
      </ac-modal-basic>
    `;
  }

  _renderVoucherModal() {
    const voucher = this._voucher;
    return html`
      <ac-modal-basic
        header="Comprobante de transferencia"
        size="full"
        .open=${this._isVoucherOpen}
        .primaryText=${'Finalizar'}
        @ac-modal-basic-primary-click=${this._onVoucherClose}
        @ac-modal-basic-close=${this._onVoucherClose}
      >
        ${voucher
          ? html`
              <div class="voucher">
                <ac-text-basic tag="p" size="sm" class="voucher__status"
                  >Transferencia exitosa</ac-text-basic
                >
                <ac-text-basic tag="p" size="lg" class="voucher__amount"
                  >${formatAmount(voucher.amount)}</ac-text-basic
                >
                <div class="kv">
                  ${kvRow(
                    'Cuenta de origen',
                    `${voucher.account?.name} ${voucher.account?.number}`,
                  )}
                  ${kvRow('Fecha', voucher.date)}
                  ${kvRow('N.º de operación', voucher.operation)}
                </div>
              </div>
            `
          : nothing}
      </ac-modal-basic>
    `;
  }

  static get styles() {
    return [TransferMultistepPageStyles];
  }

  render() {
    return html`
      <section class="page">
        <ac-text-basic tag="h1" size="lg">Transferencias</ac-text-basic>
        <ac-text-basic tag="p">Envía dinero desde tus cuentas.</ac-text-basic>
        <ac-button-basic ambient="primary" @click=${this._openInfoModal}>
          Nueva transferencia
        </ac-button-basic>
      </section>
      ${this._renderInfoModal()} ${this._renderFlowModal()}
      ${this._renderVoucherModal()}
    `;
  }
}
```

**Paso 3.** Crea `src/pages/transfer-multistep-page/transfer-multistep-page.styles.js` con estilos mínimos (`:host { display: block; }`). Los estilos visuales completos del repo de referencia son opcionales: no cambian la lógica.

**Paso 4.** En `src/pages/index.js` agrega `export { TransferMultistepPage } from './transfer-multistep-page/transfer-multistep-page.js';`.

**Paso 5.** En `src/utils/constants.js` agrega `export const SECTION_TYPE_TRANSFER_MULTISTEP = 'transfer-multistep';`.

**Paso 6.** En `src/formacion.js`:

```javascript
import { TransferMultistepPage } from './pages/index.js';
// en scopedElements:
'transfer-multistep-page': TransferMultistepPage,
// en el switch:
case SECTION_TYPE_TRANSFER_MULTISTEP:
  return html`<transfer-multistep-page></transfer-multistep-page>`;
```

**Paso 7.** Crea `demo/transfer-multistep.html` con `section-type="transfer-multistep"`.

**Explicación del flujo:**

1. El botón *Nueva transferencia* abre un modal informativo.
2. *Continuar* abre el flujo de 4 pasos (`ac-expandable-multistep`).
3. Cada paso valida lo suyo: importe mayor a 0, cuenta con saldo, documentos aceptados.
4. *Transferir* muestra un spinner durante 1.5 s (simulado con `setTimeout`) y luego abre el comprobante.
5. `keyed(this._flowKey, ...)` vuelve a crear el flujo desde cero cada vez que cambia la clave.
6. `disconnectedCallback` cancela el temporizador si el componente se quita de la página.

**Probar:** recorre los 4 pasos, prueba un importe mayor al saldo de una cuenta (la cuenta se deshabilita) y revisa el comprobante al final.

---

## 8. Archivos finales de referencia

Si algo no funciona, compara con estos archivos completos.

### `src/pages/index.js`

```javascript
export { PropertiesPage } from './properties-page/properties-page.js';
export { DocClassPage } from './doc-class-page/doc-class-page.js';
export { DocPropertiesPage } from './doc-properties-page/doc-properties-page.js';
export { TypePropertiesPage } from './type-properties-page/type-properties-page.js';
export { EventsPage } from './events-page/events-page.js';
export { LifecyclePage } from './lifecycle-page/lifecycle-page.js';
export { DirectivesPage } from './directives-page/directives-page.js';
export { RefPage } from './ref-page/ref-page.js';
export { ApiDmPages } from './api-dm-pages/api-dm-pages.js';
export { FirstComponentPage } from './first-component-page/first-component-page.js';
export { TransferMultistepPage } from './transfer-multistep-page/transfer-multistep-page.js';
```

### `src/utils/constants.js`

```javascript
export const SECTION_TYPE_PROPERTIES = 'properties';
export const SECTION_TYPE_DOC_CLASS = 'doc-class';
export const SECTION_TYPE_DOC_PROPERTIES = 'doc-properties';
export const SECTION_TYPE_TYPE_PROPERTIES = 'type-properties';
export const SECTION_TYPE_EVENTS = 'events';
export const SECTION_TYPE_LIFECYCLE = 'lifecycle';
export const SECTION_TYPE_DIRECTIVES = 'directives';
export const SECTION_TYPE_REF = 'ref';
export const SECTION_TYPE_API_DM = 'api-dm';
export const SECTION_TYPE_FIRST_COMPONENT = 'first-component';
export const SECTION_TYPE_TRANSFER_MULTISTEP = 'transfer-multistep';
```

### `src/formacion.js` (versión final)

```javascript
import { LitElement, html, nothing } from 'lit';
import { ComponentMixin, componentBaseStyles } from '@ac-base/ac-component-mixin';

import {
  PropertiesPage,
  DocClassPage,
  DocPropertiesPage,
  TypePropertiesPage,
  EventsPage,
  LifecyclePage,
  DirectivesPage,
  RefPage,
  ApiDmPages,
  FirstComponentPage,
  TransferMultistepPage,
} from './pages/index.js';

import {
  SECTION_TYPE_PROPERTIES,
  SECTION_TYPE_DOC_CLASS,
  SECTION_TYPE_DOC_PROPERTIES,
  SECTION_TYPE_TYPE_PROPERTIES,
  SECTION_TYPE_EVENTS,
  SECTION_TYPE_LIFECYCLE,
  SECTION_TYPE_DIRECTIVES,
  SECTION_TYPE_REF,
  SECTION_TYPE_API_DM,
  SECTION_TYPE_FIRST_COMPONENT,
  SECTION_TYPE_TRANSFER_MULTISTEP,
} from './utils/constants.js';

import { FormacionStyles } from './formacion.styles.js';

export class Formacion extends ComponentMixin(LitElement) {
  static get is() {
    return 'ac-formacion';
  }

  static get scopedElements() {
    return {
      'properties-page': PropertiesPage,
      'doc-class-page': DocClassPage,
      'doc-properties-page': DocPropertiesPage,
      'type-properties-page': TypePropertiesPage,
      'events-page': EventsPage,
      'lifecycle-page': LifecyclePage,
      'directives-page': DirectivesPage,
      'ref-page': RefPage,
      'api-dm-pages': ApiDmPages,
      'first-component-page': FirstComponentPage,
      'transfer-multistep-page': TransferMultistepPage,
    };
  }

  static get properties() {
    return {
      /**
       * Tipo de sección que se muestra.
       * @type {String}
       * @default ''
       */
      sectionType: {
        type: String,
        attribute: 'section-type',
      },
    };
  }

  constructor() {
    super();
    this.sectionType = '';
  }

  _renderTemplateForSection() {
    switch (this.sectionType) {
      case SECTION_TYPE_PROPERTIES:
        return html`<properties-page
          name="Cells"
          count="3"
          is-active
          .items=${['One', 'Two', 'Three']}
          .details=${{ category: 'Demo' }}
        ></properties-page>`;
      case SECTION_TYPE_TYPE_PROPERTIES:
        return html`<type-properties-page
          name="Jesus"
          .product=${{ name: 'Product', price: 0 }}
        ></type-properties-page>`;
      case SECTION_TYPE_DOC_PROPERTIES:
        return html`<doc-properties-page
          label="Demo Label"
          .items=${['Item 1', 'Item 2']}
          total-amount="2"
        ></doc-properties-page>`;
      case SECTION_TYPE_DOC_CLASS:
        return html`<doc-class-page
          title="Class documentation"
        ></doc-class-page>`;
      case SECTION_TYPE_EVENTS:
        return html`<events-page></events-page>`;
      case SECTION_TYPE_LIFECYCLE:
        return html`<lifecycle-page></lifecycle-page>`;
      case SECTION_TYPE_DIRECTIVES:
        return html`<directives-page></directives-page>`;
      case SECTION_TYPE_REF:
        return html`<ref-page></ref-page>`;
      case SECTION_TYPE_API_DM:
        return html`<api-dm-pages></api-dm-pages>`;
      case SECTION_TYPE_FIRST_COMPONENT:
        return html`<first-component-page></first-component-page>`;
      case SECTION_TYPE_TRANSFER_MULTISTEP:
        return html`<transfer-multistep-page></transfer-multistep-page>`;
      default:
        return nothing;
    }
  }

  static get styles() {
    return [componentBaseStyles, FormacionStyles];
  }

  render() {
    return html` ${this._renderTemplateForSection()} `;
  }
}
```

---

## 9. Cierre: flujo de trabajo con el CLI

Cada vez que vuelvas a trabajar en el proyecto, repite este ciclo:

```text
1. aclit component:create ac-<nombre>   → crea la base (solo una vez)
2. pnpm install                         → instala dependencias
3. crear página + estilos               → lógica y plantilla
4. registrar en index.js, constants.js y formacion.js
5. crear demo/<archivo>.html            → una página por ejemplo
6. aclit component:serve                → ver el resultado en http://localhost:5173
7. aclit component:build                → compilar antes de publicar
8. aclit component:test                 → ejecutar pruebas
```

### Problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| `aclit: command not found` | El CLI no está instalado globalmente | `npm install -g @ac-base/cli` |
| El nombre del componente es rechazado | No empieza con `ac-` o no es kebab-case | Usa, por ejemplo, `ac-mi-componente` |
| La página aparece en blanco | Falta el `case` o el `section-type` no coincide con la constante | Revisa que el valor de la constante sea igual al del atributo |
| `<xxx-page>` no se pinta | Falta la clave en `scopedElements` | Agrégala con el mismo nombre de etiqueta |
| El texto no cambia al hacer `push` | Lit no detecta cambios en el mismo arreglo | Usa el spread: `[...lista, nuevo]` |
| `Cannot read properties of null` en `firstUpdated` | Usaste la referencia antes de que exista | Accede a `ref.value` solo después del primer render |
| El modal no se abre | No se pasó `.open` o el valor no cambió | Revisa la propiedad `open` del modal |
| El puerto 5173 está ocupado | Otra demo está corriendo | Cierra la otra terminal o usa otro puerto de Vite |

---

## 10. Laboratorio

Al terminar la guía, entra al [Laboratorio de ac-lit](https://renzocordovadev.github.io/ac-lit/#laboratorio) para continuar con la práctica.

Ten a mano la documentación y aplica el flujo aprendido: crea la base con `aclit component:create`, agrega las piezas del ejercicio y comprueba el resultado con `aclit component:serve`.
