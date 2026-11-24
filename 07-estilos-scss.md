---
id: 7
title: Estilos SCSS
intro: Foundations, unidades y colores con tokens.
---

## a) Foundations
Los SCSS incluyen @use o @import de bbva-foundations-sass/main (comillas simples o dobles).

```scss incorrecto
:host {
  display: block;
}
```

```scss correcto
@use 'node_modules/@bbva-web-components/bbva-foundations-sass/main' as *;
:host {
  display: block;
}
```

## b) Unidades
Las medidas en píxeles usan rem(...), salvo 0px.

```scss incorrecto
margin: 15px;
```

```scss correcto
margin: rem(15px);
```

## c) Colores
Se usan tokens en lugar de hexadecimales (#RGB, #RRGGBB) o nombres de color (red, blue, black, white). Las declaraciones de variables SCSS quedan exceptuadas.

```scss incorrecto
:host {
  color: #ffffff;
  background-color: red;
}
```

```scss correcto
:host {
  color: var(--_user-card-text-color);
  background-color: var(--_user-card-bg-color);
}
```

## d) Variables CSS para colores
Los colores se consumen con variables CSS, por ejemplo var(--color-primary).

```scss incorrecto
color: blue;
```

```scss correcto
color: var(--color-primary);
```

## e) Archivo de decisiones
Para crear variables CSS de colores se crea nombre-componente-decisions.scss. En su .css.js se conserva el resultado compilado y se agregan los imports de bbvaDecisionToken y decisions si se usan. El consumo va en el SCSS principal.

```scss incorrecto
:host {
  background-color: var(--_user-card-bg-color);
}
/* Existen solo user-card.scss y user-card.css.js */
```

```scss correcto
/* user-card-decisions.scss */
@use 'node_modules/@bbva-web-components/bbva-foundations-sass/main' as *;
@use 'node_modules/@bbva-spherica-components/bbva-component-configuration-mixin/src/ambients' as decisions;
$component: 'user-card';
$ambient: 'primary';
$component-tokens: (
  user-card-bg-color: 'sphericaColorPrimaryAltBgAlternativeDefault',
);
:host {
  @include decisions.generate-component-styles($component, $ambient, $component-tokens);
}
```
