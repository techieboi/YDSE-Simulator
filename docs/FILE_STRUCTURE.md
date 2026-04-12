# Proposed File Structure

```text
physics project/
|-- docs/
|   |-- FEATURES.md
|   |-- FILE_STRUCTURE.md
|   `-- PRD.md
|-- public/
|-- src/
|   |-- components/
|   |   |-- ControlSlider.jsx
|   |   |-- PresetButtons.jsx
|   |   |-- SimulatorCanvas.jsx
|   |   `-- StatCard.jsx
|   |-- data/
|   |   `-- presets.js
|   |-- lib/
|   |   `-- physics.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
`-- vite.config.js
```

## Notes

- `src/lib/physics.js` contains the formula helpers so the UI stays clean.
- `src/components/` contains reusable presentation UI blocks.
- `docs/` keeps the planning material separate from implementation files.
