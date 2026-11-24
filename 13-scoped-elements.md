---
id: 13
title: Scoped elements
intro: Uso de scopedElements y configuración.
---

## a) configurationScopedElements
Se invoca con el nombre de la clase exportada, no con super; también con spread.

```javascript incorrecto
return [...super.configurationScopedElements()];
```

```javascript correcto
return [...UserFeature.configurationScopedElements()];
```

## b) scopedElementsFromClasses
Se usa NombreDeLaClase.scopedElementsFromClasses(), no super.

```javascript incorrecto
super.scopedElementsFromClasses();
```

```javascript correcto
UserFeature.scopedElementsFromClasses();
```

## c) Correspondencia de clase
En ...NombreDeLaClase.configurationScopedElements() el nombre coincide con la clase exportada en ese archivo.

```javascript incorrecto
export class UserFeature extends LitElement {
  static get scopedElements() {
    return [...OtherFeature.configurationScopedElements()];
  }
}
```

```javascript correcto
export class UserFeature extends LitElement {
  static get scopedElements() {
    return [...UserFeature.configurationScopedElements()];
  }
}
```

## d) Orden
Los componentes de la lista van en orden alfabético antes del primer spread.

```javascript incorrecto
const classes = [UserCard, BbvaButton, ...UserFeature.configurationScopedElements()];
```

```javascript correcto
const classes = [BbvaButton, UserCard, ...UserFeature.configurationScopedElements()];
```

## e) Importaciones
Los componentes de la lista están importados en el archivo, salvo la propia clase exportada.

```javascript incorrecto
const classes = [UserCard];
```

```javascript correcto
import { UserCard } from './elements/user-card/index.js';
const classes = [UserCard];
```

## f) Elementos utilizados
Cada componente importado o registrado en scopedElements se utiliza en el template o en la lógica del archivo. Los imports y registros sin uso se eliminan.
