---
id: 16
title: Optional chaining
intro: Uso consistente de ?.
---

## a) Cadena completa
Después de un acceso opcional, los siguientes accesos de la cadena conservan ?.

```javascript incorrecto
const id = detail?.receiver.contract.id;
```

```javascript correcto
const id = detail?.receiver?.contract?.id;
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
