# Urbanova Africa: cross-device acceptance checklist

## Supported target viewports
- Small phone: 320 × 568
- Standard phone: 390 × 844
- Large phone: 430 × 932
- Tablet portrait: 768 × 1024
- Tablet landscape: 1024 × 768
- Laptop: 1366 × 768
- Desktop: 1920 × 1080

At every width, verify the Home, Energy, Traffic, Environment, and About pages: no horizontal scrolling, visible navigation, readable headings, tappable inputs/buttons, no clipped charts, and correctly rendered source attribution. Verify city selection and all calculations. Use browser DevTools device emulation and real devices where available.

The responsive CSS is implemented, but a physical-device/browser matrix is not certified until tested on those devices. A local Vite URL is available only on the developer machine unless the development server is explicitly exposed; a public HTTPS deployment is needed for general access.

## Performance
Pages are lazy-loaded by route to reduce initial JavaScript download. Run `npm.cmd run build` and verify chunk sizes. Performance should be measured on a throttled mobile connection with browser Lighthouse before claiming performance targets.
