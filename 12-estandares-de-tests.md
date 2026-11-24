---
id: 12
title: Estándares de tests
intro: Estructura y reglas de las pruebas.
---

## a) Ubicación
Existe test/ y los archivos de prueba usan *.test.js.

```text incorrecto
tests/
  user-card.js
```

```text correcto
test/
  user-card.test.js
```

## b) Accesibilidad
Cada archivo incluye assert.isAccessible(el).

```javascript incorrecto
test('accessibility', () => {
  assert.exists(el);
});
```

```javascript correcto
test('accessibility', async () => {
  await assert.isAccessible(el);
});
```

## c) Snapshots
Se puede usar expect o assert. Cada archivo comprueba DOM, Shadow DOM y Light DOM; no hace falta duplicar con ambas interfaces.

```javascript incorrecto
test('DOM snapshot', () => {
  expect(el).dom.to.equalSnapshot();
});
```

```javascript correcto
test('DOM snapshot', () => {
  expect(el).dom.to.equalSnapshot();
});
test('Shadow DOM snapshot', () => {
  expect(el).shadowDom.to.equalSnapshot();
});
test('Light DOM snapshot', () => {
  expect(el).lightDom.to.equalSnapshot();
});
```

## d) Excepción de utilidades
Los archivos de test/utils/ no necesitan las cuatro comprobaciones base de accesibilidad y snapshots.

## e) Asserts
Los casos que no son de accesibilidad o snapshots tienen como máximo un assert.

```javascript incorrecto
test('initial values', () => {
  assert.equal(el.amount, 0);
  assert.equal(el.name, '');
});
```

```javascript correcto
test('initial amount', () => {
  assert.equal(el.amount, 0);
});
test('initial name', () => {
  assert.equal(el.name, '');
});
```

## f) Acceso a privados
En los casos no-base se evita acceder a propiedades o métodos que empiezan con _ (el._prop, el._method(), el['_prop'], sinon.stub(el, '_method')).

```javascript incorrecto
el._reset();
assert.equal(el._amount, 0);
```

```javascript correcto
el.reset();
assert.equal(el.amount, 0);
```
