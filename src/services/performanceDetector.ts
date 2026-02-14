/**
 * PerformanceDetector — detect device capability and determine
 * whether to enable performance degradation for CoolRenderer.
 */

export type PerformanceLevel = "high" | "medium" | "low";

let cachedLevel: PerformanceLevel | null = null;

/** Detect device performance level */
export function detectPerformanceLevel(): PerformanceLevel {
  if (cachedLevel) return cachedLevel;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;

  // Check device memory (Chrome-only API)
  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

  // Simple heuristic
  if (cores >= 8 && memory >= 8) {
    cachedLevel = "high";
  } else if (cores >= 4 && memory >= 4) {
    cachedLevel = "medium";
  } else {
    cachedLevel = "low";
  }

  return cachedLevel;
}

/** Get CSS overrides for performance degradation */
export function getDegradationCss(level: PerformanceLevel): string {
  if (level === "high") return "";

  if (level === "medium") {
    return `
      /* Medium perf: reduce blur radius and remove some glow effects */
      .cool-slide { backdrop-filter: blur(4px) !important; }
      .cool-slide::before, .cool-slide::after { opacity: 0.3 !important; }
      .cool-slide > div { backdrop-filter: blur(4px) !important; }
    `;
  }

  // Low performance: minimal effects
  return `
    /* Low perf: disable blur, animations, and glow completely */
    .cool-slide { backdrop-filter: none !important; }
    .cool-slide::before, .cool-slide::after { display: none !important; }
    .cool-slide > div { backdrop-filter: none !important; background: rgba(0,0,0,0.6) !important; }
    .cool-slide * { animation: none !important; transition: none !important; }
    .cool-slide strong { text-shadow: none !important; }
    .cool-slide a { text-shadow: none !important; }
  `;
}

/** Reset cached level (for manual override) */
export function resetPerformanceCache(): void {
  cachedLevel = null;
}
