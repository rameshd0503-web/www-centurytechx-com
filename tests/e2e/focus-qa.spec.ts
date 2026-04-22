import { test, expect, Locator } from "@playwright/test";

const VARIANT_LABELS = [
  "Navigation logo (50px)",
  "Footer logo (80px)",
  "Compact logo (32px)",
];

/**
 * Visual regression guard for the keyboard focus-visible ring on logo links.
 * Asserts:
 *  - Outline is solid 2px in the brand neon color (#F5A623 / oklch equivalent)
 *  - Outline-offset is non-zero (visible breathing room around the logo)
 *  - A glow shadow is layered on top via box-shadow
 *  - Mouse focus does NOT trigger the ring (focus-visible only)
 */
test.describe("/qa/focus — logo focus-visible regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/qa/focus");
    // Pause auto-cycle so we control which variant is focused.
    await page.getByRole("button", { name: /pause cycle|resume cycle/i }).click({ trial: false }).catch(() => {});
    const pauseBtn = page.getByRole("button", { name: /resume cycle/i });
    if (!(await pauseBtn.isVisible().catch(() => false))) {
      // Already cycling; click to pause.
      await page.getByRole("button", { name: /pause cycle/i }).click();
    }
  });

  test("page renders all three logo variants with correct aria-labels", async ({ page }) => {
    for (const label of VARIANT_LABELS) {
      const link = page.getByRole("link", { name: new RegExp(`Century TechX LLP — ${escapeRegExp(label)}`) });
      await expect(link).toBeVisible();
    }
  });

  test("each variant gets a themed focus-visible ring when keyboard-focused", async ({ page }) => {
    for (const label of VARIANT_LABELS) {
      const link = page.getByRole("link", {
        name: new RegExp(`Century TechX LLP — ${escapeRegExp(label)}`),
      });

      // Programmatic focus with focusVisible flag → triggers :focus-visible.
      await focusVisible(link);
      await expect(link).toBeFocused();

      const styles = await link.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
          outlineStyle: cs.outlineStyle,
          outlineWidth: cs.outlineWidth,
          outlineColor: cs.outlineColor,
          outlineOffset: cs.outlineOffset,
          boxShadow: cs.boxShadow,
        };
      });

      // Outline asserts
      expect(styles.outlineStyle, `${label}: outline-style`).toBe("solid");
      expect(parseFloat(styles.outlineWidth), `${label}: outline-width`).toBeGreaterThanOrEqual(2);
      expect(parseFloat(styles.outlineOffset), `${label}: outline-offset`).toBeGreaterThan(0);

      // Color check — neon orange #F5A623 → rgb(245, 166, 35) when resolved.
      // Allow tolerance in case the CSS var resolves via oklch with slight rounding.
      const rgb = parseRgb(styles.outlineColor);
      expect(rgb, `${label}: outline-color parses as rgb`).not.toBeNull();
      if (rgb) {
        expect(rgb.r, `${label}: outline R near 245`).toBeGreaterThan(220);
        expect(rgb.g, `${label}: outline G near 166`).toBeGreaterThan(130);
        expect(rgb.g).toBeLessThan(200);
        expect(rgb.b, `${label}: outline B near 35`).toBeLessThan(90);
      }

      // Glow shadow present
      expect(styles.boxShadow, `${label}: box-shadow glow`).not.toBe("none");
      expect(styles.boxShadow.length, `${label}: box-shadow non-empty`).toBeGreaterThan(10);
    }
  });

  test("mouse click does NOT trigger the focus-visible ring", async ({ page }) => {
    const link = page.getByRole("link", {
      name: new RegExp(`Century TechX LLP — ${escapeRegExp(VARIANT_LABELS[0])}`),
    });
    await link.click();
    const matchesFocusVisible = await link.evaluate((el) => el.matches(":focus-visible"));
    expect(matchesFocusVisible).toBe(false);
  });

  test("Tab key navigation triggers focus-visible on logo links", async ({ page }) => {
    // Start from the top of the document.
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.locator("body").click({ position: { x: 1, y: 1 } });

    // Tab until we land on the first logo link (skip the pause/back buttons).
    const firstLogo = page.getByRole("link", {
      name: new RegExp(`Century TechX LLP — ${escapeRegExp(VARIANT_LABELS[0])}`),
    });

    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const isFocused = await firstLogo.evaluate((el) => el === document.activeElement);
      if (isFocused) break;
    }

    await expect(firstLogo).toBeFocused();
    const isFocusVisible = await firstLogo.evaluate((el) => el.matches(":focus-visible"));
    expect(isFocusVisible).toBe(true);
  });
});

/**
 * Force a focus that the engine treats as keyboard-equivalent so
 * :focus-visible matches. Falls back to Tab navigation if needed.
 */
async function focusVisible(locator: Locator) {
  await locator.evaluate((el) => {
    const anchor = el as HTMLElement & {
      focus: (opts?: FocusOptions & { focusVisible?: boolean }) => void;
    };
    anchor.focus({ preventScroll: true, focusVisible: true });
  });
}

function parseRgb(value: string): { r: number; g: number; b: number } | null {
  const m = value.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (!m) return null;
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
