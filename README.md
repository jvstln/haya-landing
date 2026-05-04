# Haya Landing Standalone

This is a standalone extraction of the Haya landing page.

## Getting Started

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Run development server**:
    ```bash
    pnpm dev
    ```

## Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Landing page specific components.
- `src/ui/`: Shared UI components (extracted from `@workspace/ui`).
- `src/assets/`: Shared assets and audio logic (extracted from `@workspace/assets`).

## Notes

- Tailwind CSS 4 is used, with configuration in `src/ui/styles/globals.css`.
- GSAP is used for animations.
- The project uses TypeScript path aliases defined in `tsconfig.json`.
