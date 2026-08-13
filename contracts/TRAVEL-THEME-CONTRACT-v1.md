# Travel Theme Contract v1 — Canonical Preset Freeze

## Status
Approved visual identity contract for Travel Theme Studio. The six built-in presets below are canonical and immutable. Fine-tuning never overwrites a built-in preset; it creates or updates a custom theme in **My Themes**.

## Product boundary
`Master File + Theme Package + Travel Engine -> Builder -> Companion`

Theme Studio is a standalone build-time design program. It previews the real Engine through a deterministic preview harness, but it is not part of Companion runtime or Companion Studio Mode.

## Required identity
- `schema`: `travel-theme-v1`
- `themeId`: stable unique id
- `name`: user-facing name
- `kind`: `builtin` or `custom`
- `baseTheme`: nullable lineage id
- `version`: theme revision

## Signature Engine constants
These are deliberately shared by all six built-ins and are not preset palette variables:
- Bottom navigation background: `#2A211B`
- Bottom navigation emoji set: `🧳 📖 📅 ✨ 🎁`

This common dark-brown navigation is a Travel Engine signature anchor. Fine-tuning v1 does not alter the emoji set.

## Canonical built-in palettes

### 1. Tidewater — NZ reference
Primary `#0E6E7C`; Secondary `#234B62`; Accent `#E2A33D`; Highlight `#9B3348`; Background gradient `#CDEDE4 -> #FBE3B8`; Surface `#FFFFFF`; Soft surface `#E3F5F0`; Ink `#1B2A41`; Muted `#5B7280`; Border `#CFE4DF`.

### 2. Clay & Copper — VN reference
Primary `#A85C34`; Secondary `#6B4226`; Accent `#C97B3D`; Highlight `#B5497A`; Background gradient `#F3CFA8 -> #FBD9C0`; Surface `#FFFDF9`; Soft surface `#F2E2CE`; Ink `#2B1D14`; Muted `#7A6553`; Border `#E4CBAE`.

### 3. Aegean Whitewash v2
Primary `#1B5FA8`; Secondary `#0B3A63`; Accent `#E0693D`; Highlight `#E8B84B`; Background gradient `#AFD4EA -> #FBF4E4`; Surface `#FFFFFF`; Soft surface `#D3E7F2`; Ink `#0F2A44`; Muted `#4C6B85`; Border `#BFDBEA`.

### 4. Kyoto Indigo
Primary `#6B5A82`; Secondary `#7A9070`; Accent `#C08A52`; Highlight `#8E2F3C`; Background gradient `#E2D9E8 -> #EFE4CE`; Surface `#FBF8F2`; Soft surface `#E9E2EE`; Ink `#3A2E44`; Muted `#6B6459`; Border `#D8CFBE`.

### 5. Oxblood & Brass
Primary `#A34450`; Secondary `#7A5578`; Accent `#D4AC5C`; Highlight `#8C6B9E`; Background gradient `#F1D3D6 -> #F6E3CB`; Surface `#FFFBF7`; Soft surface `#F3E2E3`; Ink `#3A2226`; Muted `#7A6367`; Border `#DCC7C4`.

### 6. Olive Grove
Primary `#6B7A3D`; Secondary `#8A6A3D`; Accent `#D4A537`; Highlight `#7A3B2E`; Background gradient `#E4D9B8 -> #F3EAD4`; Surface `#FFFDF6`; Soft surface `#EDE4C8`; Ink `#2E2A18`; Muted `#6E6650`; Border `#DCD0AC`.

## Theme tokens
### Palette
`primary`, `primaryDeep`, `secondary`, `secondaryDeep`, `accent`, `accentDeep`, `highlight`, `background`, `surface`, `softTintedSurface`, `ink`, `muted`, `border`, `heroSky`, `heroMeadow`, `heroSun`.

### Identity
`typography`, `cards`, `radius`, `shadow`, `hero`, `navigation`, `buttons`.

### Branding / loading
`treatments.logoTreatment` is first-class theme state. Supported values:
- `blend`
- `soft-disc`
- `tone-tile`
- `soft-card`

Loading background, logo treatment and theme surfaces must be previewed together. Logo presentation is theme-owned even when the logo asset itself belongs to a trip.

## Custom theme lifecycle
1. Select an immutable built-in preset.
2. Fine-tune within Theme Studio.
3. `Save As New Theme` creates a custom theme with `baseTheme` lineage.
4. Custom themes appear in `My Themes` and can be reused on future trips.
5. `Save` updates an existing custom theme only.
6. `Reset` returns to the last saved state of the selected theme.
7. Built-ins cannot be overwritten.
8. Export/import uses `travel-theme-v1` JSON.

## Implementation rule
The exact canonical hex values above are the source of truth. Implementations must not silently mute, desaturate, normalize, or replace them with approximate colours.
