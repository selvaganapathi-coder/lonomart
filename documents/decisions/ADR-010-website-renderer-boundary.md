# ADR-010 — Website Renderer Boundary

## Context
Lonomart stores websites as versioned pages and structured sections. The future editor will modify this data, while previews and eventually public websites must render it consistently.

## Problem
Coupling the public/preview renderer to editor components would make future editor changes risky and would force public workloads to depend on management UI code.

## Decision
Keep the renderer as a separate, server-renderable module that consumes typed structured website data. Section rendering is selected by section type and versioned content. The renderer does not import editor components or editor state.

Draft preview remains authenticated and ownership-scoped. Public rendering will be introduced later using published state only.

## Consequences
- Editor and renderer can evolve independently.
- The same renderer architecture can later serve published websites.
- Unknown section types can fail safely without breaking the entire website.
- Structured content remains the stable contract between storage, editor, preview, and future publishing.
