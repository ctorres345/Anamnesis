---
title: "PawlyPaint: un juego tranquilo de pintar con joyas"
date: 2026-10-24
kind: project
summary: Un juego de pintar con joyas para iPhone y Android, hecho en Flutter para una jugadora muy especial.
note: sin anuncios, nunca
tags: [flutter, juegos]
translationKey: pawlypaint
project:
  stack: [Flutter, Dart]
---

Mi novia estaba cansada de los juegos de pintar con joyas llenos de anuncios invasivos. Yo tenía tiempo libre y quería una excusa para practicar Flutter, así que hicimos uno que le encanta. No está en ninguna tienda de apps.

## Qué tiene
- **Pintar**: llena un lienzo numerado con gemas brillantes, con potenciadores, combos y un minimapa.
- **Ordenar**: la imagen empieza desordenada y devuelves cada cuenta a su lugar.
- **Contrarreloj**: una imagen al azar contra el reloj, más un reto diario.
- **160 imágenes** en cursos como Cozy Classics, Animal Friends y Cat Café, todas dibujadas en código.
- **Música y sonidos** compuestos para la app.

## Cómo está hecho
Un solo código en Flutter para iPhone y Android, sin paquetes de manejo de estado. Cada lienzo es un `CustomPainter`, y las capas fijas se graban una vez para que incluso las imágenes de 40×40 se vean fluidas.
