---
id: 14
title: Complejidad ciclomática
intro: Archivo de apoyo: validators/complexity.sh
---

## a) Nivel esperado
Métodos y getters mantienen complejidad baja, de 1 a 4.

## b) Nivel medio
De 5 a 9 requiere revisión.

```javascript incorrecto
hasEnabledOption() {
  if (this.active) { return true; }
  if (this.visible) { return true; }
  if (this.ready) { return true; }
  if (this.selected) { return true; }
  return false;
}
```

```javascript correcto
hasEnabledOption() {
  return [this.active, this.visible, this.ready, this.selected].some(Boolean);
}
```

## c) Nivel alto
De 10 en adelante es alto y debe reducirse. El valor 10 ya pertenece a este nivel.

## d) Decisiones
Parte de 1 y aumenta con if/else if, case, ternarios, &&, ||, ??, bucles y catch. else y default no suman por sí solos.

```javascript incorrecto
isAvailable() {   // complejidad 3
  if (this.active && this.ready) {
    return true;
  } else {
    return false;
  }
}
```

```javascript correcto
isAvailable() {   // complejidad 2
  return Boolean(this.active && this.ready);
}
```

## e) Recomendaciones
Dividir métodos, usar predicados descriptivos, tablas de mapeo, retornos tempranos y reducir anidamiento. Son recomendaciones, no reglas separadas.

```javascript incorrecto
submit() {
  if (this.active) {
    if (this.ready) {
      this.save();
    }
  }
}
```

```javascript correcto
submit() {
  if (!this.active) { return; }
  if (!this.ready) { return; }
  this.save();
}
```

## f) Excepciones
Quedan fuera los miembros estáticos, constructor, render, is, styles, properties, scopedElements y los métodos de ciclo de vida de Lit. La excepción no es una invitación a trasladar lógica compleja allí.
