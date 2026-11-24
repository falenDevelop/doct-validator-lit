---
id: 16
title: Optional chaining
intro: Uso consistente de ?.
---

## a) Acceso a datos anidados
Si un objeto o cualquiera de sus niveles puede no existir, se valida antes de acceder o se protege cada nivel con optional chaining. Para datos obligatorios, se valida el contrato y se maneja explícitamente la ausencia.

```javascript incorrecto
const name = data.user.name;
```

```javascript correcto
const name = data?.user?.name;
```

## b) Consistencia
En un mismo archivo, los nombres usados con acceso opcional mantienen ese criterio en los demás accesos.

```javascript incorrecto
this.firstValue = data?.value;
this.secondValue = data.value;
```

```javascript correcto
this.firstValue = data?.value;
this.secondValue = data?.value;
```

## c) Métodos comunes
Hay excepciones para llamadas a map, filter, reduce, forEach, find, some, every, includes, indexOf, slice, splice, push, pop, shift, unshift, join, split, trim, toLowerCase y toUpperCase. El acceso posterior conserva ?.

```javascript incorrecto
const total = items?.map(formatItem).length;
```

```javascript correcto
const total = items?.map(formatItem)?.length;
```