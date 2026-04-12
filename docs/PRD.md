# Product Requirements Document

## Product Name

Interactive Double Slit Interference Simulator

## Purpose

Create a browser-based educational simulator for a physics presentation that demonstrates how light passing through two slits forms an interference pattern. The app should be easy to present live, simple enough for classmates to understand, and interactive enough to show how changing physical parameters affects the pattern.

## Audience

- Students viewing a classroom presentation
- The presenter controlling the simulation live
- Teachers or reviewers evaluating clarity and correctness

## Problem Statement

Static slides explain the double slit experiment, but they do not let the audience see how wavelength, slit spacing, and screen distance affect fringe spacing and intensity in real time.

## Goals

- Show the interference pattern clearly in a browser window
- Let the presenter adjust the most important variables live
- Connect visuals to the underlying equations
- Keep the interface simple and presentation friendly

## Non-Goals For MVP

- Full quantum interpretation
- Lab-grade numerical precision
- 3D rendering
- User accounts or saved sessions

## MVP Scope

- Real-time interference pattern visualization
- Controls for wavelength, slit separation, slit width, screen distance, and brightness
- Preset buttons for quick demonstrations
- Formula and explanation panel
- Responsive layout for projector, laptop, and browser window use

## Functional Requirements

- The simulator must update instantly when control values change.
- The app must show a visible central maximum and surrounding fringes.
- The app must compute and display fringe spacing.
- The app must offer presentation presets.
- The app must explain constructive and destructive interference in plain language.
- The app must include a reset path through default values or preset selection.

## UX Requirements

- Large readable typography
- High contrast visuals suitable for projection
- Clear separation between controls, visualization, and explanation
- Minimal friction for a live demo

## Technical Requirements

- React with Vite
- Tailwind CSS
- Runs in modern browsers
- No backend required

## Success Criteria

- A presenter can explain the experiment in under 3 minutes using the simulator.
- A viewer can visually identify how changing wavelength or slit separation changes the fringe pattern.
- The project builds successfully for deployment.

## Future Enhancements

- Toggle between wavefront and pattern modes
- Single slit vs double slit comparison
- Screen intensity graph with hover inspection
- Guided presentation mode
