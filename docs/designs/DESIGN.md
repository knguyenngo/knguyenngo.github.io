# Design System Strategy: The Forest Terminal

## 1. Overview & Creative North Star
The "Forest Terminal" is a design system that marries the structured, utilitarian density of a gaming profile with the sophisticated, organic palette of a forest at dusk. Our Creative North Star is **"Ancestral Futurism."** We are moving away from the "airy" and "minimalist" web of the last decade, embracing a UI that feels heavy, permanent, and physically constructed.

The system breaks the "template" look by utilizing a highly structured card-based layout inspired by Steam profiles. We lean into intentional visual weight through thick structural containers, monospace typography, and a "nested" hierarchy. Instead of standard white space, we use "negative depth"—recessed surfaces and inner shadows—to define functional zones.

## 2. Colors & Surface Philosophy
The palette is built upon the Everforest ethos: dark, desaturated greens and earthy ochres. This is a "low-light" system designed to reduce eye strain while conveying authority.

*   **Primary (`#b6cf8e`) & Secondary (`#b79a60`):** These are your "functional" highlights. Use the muted green for success states and primary CTAs, and the earthy gold for rare achievements, "Badges," or "Level" indicators.
*   **The "No-Line" Rule:** Standard 1px borders are prohibited. Physicality is achieved through background shifts. A card (`surface_container_high`) does not sit "on top" of a background with a line; it is a solid block of color carved out of the `surface_container`.
*   **Surface Hierarchy & Nesting:** 
    *   **Level 0 (Base):** `surface` (`#070f14`) – The deep forest floor.
    *   **Level 1 (Main Containers):** `surface_container` (`#0b1b25`) – Large sections like "Featured Showcase."
    *   **Level 2 (Nested Cards):** `surface_container_highest` (`#0d2837`) – High-importance items like "Recent Activity."
*   **The "Glass & Gradient" Rule:** To prevent the UI from feeling flat, use a 15% opacity `surface_tint` as a backdrop-blur overlay for floating menus. Main CTAs should feature a subtle vertical gradient from `primary` to `primary_container` to give them a "machined" look.

## 3. Typography
We use **Space Grotesk** across the board. Its monospace-adjacent aesthetics and technical apertures provide the "heavy" and "structured" feel required for a terminal-inspired layout.

*   **Display & Headline:** Used for user names and section headers. High-contrast sizing (e.g., `display-md` vs `body-sm`) is encouraged to create an editorial feel.
*   **Title:** Set in `title-md` for card headings (e.g., "Badge Collector").
*   **Body:** `body-md` is the workhorse. It must feel dense. Use a tighter line-height than standard "airy" web designs to maintain the "heavy" aesthetic.
*   **Labels:** Use `label-sm` in all-caps for metadata or "System Status" (e.g., "LAST ONLINE 2H AGO").

The typography hierarchy conveys a "System Console" brand identity—every piece of data feels like a logged entry in a digital ledger.

## 4. Elevation & Depth
In this system, depth is achieved through **Tonal Layering** and "Recessed" containers, mimicking a physical dashboard.

*   **The Layering Principle:** Avoid elevation shadows. Instead, use "Inner Shadows" or darker surface tiers to make containers feel sunken into the UI. For example, the `surface_container_low` should be used for the "gutter" between major profile sections.
*   **Ambient Shadows:** If a component must float (like a Tooltip), use a large 24px blur with 6% opacity using the `on_surface` color (`#cfe9fd`). This mimics a soft glow rather than a harsh drop shadow.
*   **The "Ghost Border" Fallback:** If a container lacks sufficient contrast, use a 2px "Ghost Border" using `outline_variant` at 15% opacity. This provides a structural "bevel" look without the cheapness of a standard stroke.
*   **Steam-Style Headers:** Major sections (like "Featured Showcase") should have a top-bar of `surface_bright` to act as a "handle" for the container.

## 5. Components

*   **Cards (Steam Profile Style):** Cards are the core of the system. They must feature a 2px `outline` (`#60798a`) to feel "heavy." Content within cards should use `surface_container_highest` for nested items (like individual badges).
*   **Buttons:** 
    *   **Primary:** Solid `primary` background with `on_primary` text. Square corners (`DEFAULT: 0.25rem`). No rounded pills.
    *   **Secondary:** `surface_container_highest` background with a thick 2px `outline`. 
*   **Chips (Badges):** Small, rectangular boxes with `surface_bright` backgrounds. Text must be `label-sm` to feel like technical metadata.
*   **Input Fields:** Use `surface_container_lowest` (pure black) for the input area to create a "punched-out" effect in the UI. Use `outline` for the focused state.
*   **Lists:** Forbid divider lines. Use the Spacing Scale `4` (0.9rem) to separate items, or alternating background tints (`surface_container` vs `surface_container_low`).
*   **Recent Activity Feed:** Use a vertical "Steam-style" layout where the left-hand side contains a large thumbnail and the right-hand side contains dense `body-sm` metadata.

## 6. Do's and Don'ts

### Do:
*   **Do** embrace density. Pack information into the UI. This is a power-user interface, not a marketing landing page.
*   **Do** use asymmetrical layouts. A two-column layout (70% main content, 30% sidebar) is the standard for this system.
*   **Do** use `outline_variant` for subtle structural "wiring" between components.
*   **Do** ensure all images/avatars have a 2px solid `outline` to prevent them from "bleeding" into the dark background.

### Don't:
*   **Don't** use large border-radii. Keep it to `DEFAULT` (0.25rem) or `none`. Rounded corners destroy the "heavy/structured" vibe.
*   **Don't** use pure white. Always use `on_surface` or `on_surface_variant` to maintain the desaturated, earthy tone.
*   **Don't** use motion that feels "bouncy." Any transitions should be linear or sharp (e.g., 150ms ease-in), mimicking a high-performance terminal.
*   **Don't** use standard 1px "Hairline" dividers. They make the UI look fragile. Use 4px-8px gaps of background color instead.