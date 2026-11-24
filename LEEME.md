# Guía de validación

## Ver la página
Abre la carpeta con un servidor local (el navegador no permite leer los .md desde file://):

    npx serve            # o
    python -m http.server

También sirve la extensión Live Server de VS Code.

## Agregar o editar criterios
- Todos los archivos están en la raíz del proyecto. Cada sección es un archivo .md; edítalo y recarga.
- Criterio nuevo: agrega un bloque `## letra) Título` al final del archivo de su sección.
- Sección nueva: copia `_plantilla.md`, ponle un nombre y agrégalo a `index.json` (el orden del JSON es el del menú).
- Bloques de código: la primera palabra es el lenguaje y la segunda `incorrecto` o `correcto`.
