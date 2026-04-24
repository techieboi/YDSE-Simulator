# YDSE Presentation Starter

## Presentation Goal
Explain how Young's Double Slit Experiment works and show, in real time, how changing physical parameters affects fringe spacing and intensity.

## Suggested Slide Flow (8 Slides)
1. Title and Context
- Project: Interactive Double Slit Interference Simulator
- One-line why: Static diagrams do not show real-time cause and effect.

2. Problem Statement
- Traditional explanation is conceptual but not interactive.
- Need: Live parameter tuning for classroom understanding.

3. Physics Core
- Path difference condition:
  - Bright fringes: d sin(theta) = m lambda
  - Dark fringes: d sin(theta) = (m + 1/2) lambda
- Fringe spacing (small-angle): Delta y = (lambda L) / d

4. What I Built
- Real-time interference pattern canvas
- Intensity profile graph
- Control sliders: wavelength, slit separation, slit width, screen distance, intensity
- Presets for fast demonstrations

5. Implementation Snapshot
- React + Vite + Tailwind
- Physics engine computes intensity using:
  - I(y) ~ cos^2(alpha) * sinc^2(beta)
- Derived value panel reports fringe spacing

6. Live Demo: Parameter Effects
- Start with Default preset (540 nm, d = 0.35 mm, L = 1 m)
- Red Light (650 nm): fringes spread out
- Blue Light (460 nm): fringes come closer
- Wide Gap (d = 0.75 mm): fringes compress
- Increase screen distance L: fringes spread linearly

7. Results and Learning Outcome
- Audience can visually map formula to pattern change.
- Project meets presentation-friendly goals: clarity, speed, responsiveness.

8. Limitations and Next Steps
- Current scope: educational simulator, not lab-grade precision
- Next: wavefront mode, single-slit comparison, screenshot export, guided presentation mode

## 3-Minute Talk Track (Quick Version)
1. "This project turns YDSE from a static concept into an interactive visual demo."
2. "When I change lambda, d, or L, the fringe spacing updates instantly, matching Delta y = lambda L / d."
3. "Red light gives wider spacing, blue light gives tighter spacing, and larger slit separation compresses fringes."
4. "So the simulator helps connect formula, graph, and visual pattern in one view."

## Demo Checklist (Before Presenting)
- Run: `npm.cmd run dev`
- Keep browser zoom at 100%
- Open with Default preset first
- Test all three comparison presets once
- Keep one slide with equations visible while demoing

## Backup Plan (If Live Demo Fails)
- Use screenshots or screen recording of these 3 states:
  - Red Light
  - Blue Light
  - Wide Gap
- Explain each state using Delta y = (lambda L) / d
