---
title: "PawlyPaint: a cozy jewel painting game"
date: 2026-10-24
kind: project
summary: A jewel painting game for iPhone and Android, built in Flutter for one very special player.
note: no ads, ever
tags: [flutter, games]
translationKey: pawlypaint
project:
  stack: [Flutter, Dart]
---

My girlfriend was tired of jewel painting games full of invasive ads. I had some free time and wanted an excuse to practice Flutter, so we built one she loves. It isn't on any app store.

## What's in it
- **Paint**: fill a numbered canvas with sparkly drills, with boosters, combos and a mini-map.
- **Sort**: the picture starts scrambled and you put every bead back in place.
- **Time Attack**: a random picture against the clock, plus a daily challenge.
- **160 pictures** in courses like Cozy Classics, Animal Friends and Cat Café, every one drawn in code.
- **Music and sounds** composed for the app.

## How it's built
One Flutter codebase for iPhone and Android, no state-management packages. Every canvas is a `CustomPainter`, and static layers are recorded once so even the 40×40 pictures stay smooth.
