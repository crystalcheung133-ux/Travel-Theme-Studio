# Travel Theme Contract v1 — Build 1 Draft

## Purpose
A theme is a reusable visual identity package. It is separate from trip content, Engine logic and Companion Studio runtime administration.

## Required identity
- schema: `travel-theme-v1`
- themeId: stable unique id
- name: user-facing name
- kind: `builtin` or `custom`
- baseTheme: nullable lineage id
- version: theme revision

## Curated design rule
Built-in themes are complete premium presets, not raw colour swatches. Custom themes inherit a preset and record fine-tuned values. Built-ins are immutable; custom themes support Save, Save As, rename, duplicate, delete, import and export.

## v1 tokens
### Palette
primary, primaryDeep, secondary, secondaryDeep, accent, accentDeep, highlight, background, surface, ink, muted, border, heroSky, heroMeadow, heroSun.

### Gradients
hero, primaryAction, secondaryAction, accentAction, homeHero, splash.

### Geometry / depth
surfaceRadius, heroRadius, buttonRadius, compactButtonRadius, borderWeight, surfaceShadow, heroShadow, navShadow, actionShadow.

### Treatments
navigation, hero, watermark, splash, logoTreatment.

`logoTreatment` v1 values:
- `blend`
- `soft-disc`
- `tone-tile`
- `soft-card`

### Branding
Logo assets remain assets, but presentation is theme-owned. Splash background and logo treatment are first-class theme properties.

## Build contract
`Master File + Theme Package + Travel Engine -> Builder -> Companion`

Theme Studio previews the real Engine but does not become part of the Companion runtime.
