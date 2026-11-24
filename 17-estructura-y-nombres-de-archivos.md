---
id: 17
title: Estructura y nombres de archivos
intro: Organización de carpetas de componentes.
---

## a) Archivos principales
Cada directorio de componente con estilos contiene NombrePascalCase.js, nombre-kebab-case.scss y nombre-kebab-case.css.js, según el nombre de la carpeta.

```text incorrecto
user-card/
  userCard.js
  styles.scss
  styles.css.js
```

```text correcto
user-card/
  UserCard.js
  user-card.scss
  user-card.css.js
```

## b) Componente raíz
En src/, los archivos principales comparten la base del nombre del SCSS principal o, si no existe, del CSS JS principal.

```text incorrecto
src/
  OtherFeature.js
  user-feature.scss
```

```text correcto
src/
  UserFeature.js
  user-feature.scss
  user-feature.css.js
```

## c) Carpetas content y summary
Combinan el nombre del padre con content o summary: payment/content/ contiene PaymentContent.js, payment-content.scss y payment-content.css.js.

## d) JavaScript adicional
Además del principal se permiten nombres con la misma base PascalCase y los sufijos Dm, Service, Helper, Controller o Manager.

```text incorrecto
user-card/
  UserCard.js
  Data.js
```

```text correcto
user-card/
  UserCard.js
  UserCardDm.js
```

## e) Archivos de estilos
Solo nombre.scss, nombre-decisions.scss y sus .css.js correspondientes.

```text incorrecto
user-card/
  styles.scss
  colors.scss
```

```text correcto
user-card/
  user-card.scss
  user-card.css.js
  user-card-decisions.scss
  user-card-decisions.css.js
```

## f) Decisiones
Si el SCSS principal usa var(--...) o bbvaDecisionToken, deben existir nombre-decisions.scss y nombre-decisions.css.js en el mismo directorio.
