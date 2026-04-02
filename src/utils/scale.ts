 /**
 * Calculates responsive size based on screen width dynamically in JS if needed.
 * 
 * @param size - The base size of the element (in px) relative to the current breakpoint's base width.
 * @param currentWidth - The current screen width (e.g., window.innerWidth).
 * @returns The scaled size in pixels.
 */
export function getScaledSize(size: number, currentWidth: number): number {
  if (currentWidth <= 500) {
    return (currentWidth / 375) * size;
  } else if (currentWidth <= 1024) {
    return (currentWidth / 768) * size;
  } else {
    return (currentWidth / 1440) * size;
  }
}

/**
 * Utility for generating Tailwind style classes to scale elements using the `--scale-factor` CSS variable.
 * Must be used in conjunction with the CSS variables defined in index.css.
 * 
 * Example usage in React for inline styles:
 * style={{ width: scale(100), fontSize: scale(20) }}
 * 
 * Or in arbitrary Tailwind values in template literals:
 * className={`w-[${scale(100)}]`} // Using arbitrary values
 */
export const scale = (pixels: number) => `calc(${pixels} * var(--scale-factor))`;
