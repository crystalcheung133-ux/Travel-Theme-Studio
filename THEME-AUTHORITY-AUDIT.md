# Theme Authority Audit — Travel Engine 25.4.20.5

## Baseline safety
Source inspected: Travel Engine 25.4.20.5 FROZEN CANONICAL BASELINE. The frozen source is not modified; this Build 1 package contains a separate preview copy.

## Already theme-owned
`starter/theme-config.js` already owns core palette, gradients, radii, shadows, module colours and high-level treatments. `starter/asset-config.js` separately owns branding/hero/icon/splash assets.

## Main authority leak
`starter/styles.css` still contains historical NZ validation/identity overrides (`--nz-*`) and a number of fixed splash/action values. Several later rules map NZ variables back to theme tokens, but the CSS still carries trip-specific identity vocabulary and hard-coded visual decisions.

## Consequence
A standalone Theme Studio can safely preview by applying a final Studio override layer, but the canonical Engine should later receive a controlled de-NZ theme-authority cleanup before Builder integration. This is an Engine migration task, not a reason to modify the frozen baseline.

## Build 1 decision
1. Preserve frozen baseline.
2. Define `travel-theme-v1` around the existing token model rather than replacing it.
3. Treat loading/splash and logo treatment as first-class theme properties.
4. Use curated presets as the starting point; fine-tuning is secondary.
5. Save custom themes independently for future reuse.
