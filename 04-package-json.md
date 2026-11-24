---
id: 4
title: package.json
intro: Configuración del paquete.
---

## a) Versión
Formato numérico x.x.x, sin sufijos.

```json incorrecto
{ "version": "1.2.3-rc-1" }
```

```json correcto
{ "version": "1.2.3" }
```

## b) Descripción
description existe y no está vacía.

```json incorrecto
{ "description": "" }
```

```json correcto
{ "description": "Displays the user's payment cards." }
```

## c) Palabras clave
keywords tiene al menos tres elementos.

```json incorrecto
{ 
  "keywords": [
    "cards"
  ]
}
```

```json correcto
{ 
  "keywords": [
    "cards",
    "payments", 
    "lit"
    ] 
}
```

## d) Repositorio
repository debe indicarse (su ausencia es una advertencia). La URL termina en /NOMBRE-DE-LA-CARPETA.git, según la carpeta que contiene package.json.

```json incorrecto
{ "repository": "https://example.com/team/other-component.git" }
```

```json correcto
{ "repository": "https://example.com/team/user-card.git" }
```

## e) Versiones de dependencias
Las versiones numéricas de dependencies y devDependencies usan el prefijo ^.

```json incorrecto
{ "dependencies": { "lit": "3.0.0" } }
```

```json correcto
{ "dependencies": { "lit": "^3.0.0" } }
```

## f) Normalización de versiones
Con ^: major > 0 → minor y patch en 0 (^3.0.0). Major 0 y minor > 0 → patch en 0 (^0.8.0). Major y minor en 0 → se conserva el patch (^0.0.7).

```json incorrecto
"component-a": "^3.4.2",
"component-b": "^0.8.4"
```

```json correcto
"component-a": "^3.0.0",
"component-b": "^0.8.0",
"component-c": "^0.0.7"
```

## g) Archivos publicados
files debe incluir /src/, /locales/, .js y !/.scss.

```json incorrecto
{ "files": ["/src/", "*.js"] }
```

```json correcto
{ "files": ["/src/", "/locales/", ".js", "!/.scss"] }
```

## h) Dependencias sin uso
Las dependencias de dependencies se usan en src/ o demo/; si no, se revisa su eliminación. No aplica a devDependencies.

```json incorrecto
{ "dependencies": { "unused-library": "^1.0.0" } }
```

```json correcto
{ "dependencies": {} }
```
