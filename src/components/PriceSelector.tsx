import React, { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface PriceOption {
  id: string;
  label: string;
  value: number;
  color: string;
  gradientFrom: string;
  gradientTo: string;
}

interface PriceSelectorProps {
  options: PriceOption[];
  /** [minValue, maxValue] — null means nothing selected */
  selectedRange: [number, number] | null;
  onSelectionChange: (range: [number, number]) => void;
  className?: string;
}

export function PriceSelector({
  options,
  selectedRange,
  onSelectionChange,
  className = "",
}: PriceSelectorProps) {
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  const minIndex = selectedRange
    ? options.findIndex((o) => o.value === selectedRange[0])
    : -1;
  const maxIndex = selectedRange
    ? options.findIndex((o) => o.value === selectedRange[1])
    : -1;

  const isInRange = (index: number) =>
    minIndex >= 0 && maxIndex >= 0 && index >= minIndex && index <= maxIndex;

  const isLineLitUp = (lineIndex: number) =>
    minIndex >= 0 && maxIndex >= 0 && lineIndex >= minIndex && lineIndex < maxIndex;

  const handleCircleClick = (option: PriceOption, index: number) => {
    // Nothing selected yet → start a range anchored at this node
    if (!selectedRange || minIndex === -1 || maxIndex === -1) {
      onSelectionChange([option.value, option.value]);
      return;
    }

    // Clicking the same single-node selection → deselect (reset)
    if (minIndex === maxIndex && index === minIndex) {
      onSelectionChange([option.value, option.value]);
      return;
    }

    if (index <= minIndex) {
      // Extend / move the lower bound
      onSelectionChange([option.value, selectedRange[1]]);
    } else if (index >= maxIndex) {
      // Extend / move the upper bound
      onSelectionChange([selectedRange[0], option.value]);
    } else {
      // Between handles → move whichever is closer
      const distToMin = index - minIndex;
      const distToMax = maxIndex - index;
      if (distToMin <= distToMax) {
        onSelectionChange([option.value, selectedRange[1]]);
      } else {
        onSelectionChange([selectedRange[0], option.value]);
      }
    }
  };

  // Orbital dots shown on selected endpoints
  const createOrbitalDots = (count: number, radius: number, color: string) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      dots.push(
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          initial={{ opacity: 0, scale: 0.3, rotate: shouldReduceMotion ? 0 : -90, x: x - 2, y: y - 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, x: x - 2, y: y - 2 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.6,
            delay: shouldReduceMotion ? 0 : i * 0.03,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          style={{ backgroundColor: color, left: "50%", top: "50%" }}
        />
      );
    }
    return dots;
  };

  const getLineStyle = (lineIndex: number): React.CSSProperties => {
    if (!isLineLitUp(lineIndex)) {
      return { background: "var(--color-gray-300, #d1d5db)" };
    }
    const from = options[lineIndex];
    const to = options[lineIndex + 1];
    return {
      background: `linear-gradient(to right, ${from.gradientFrom}, ${to?.gradientTo ?? from.gradientTo})`,
    };
  };

  const cn = (...classes: (string | undefined | false | null)[]) =>
    classes.filter(Boolean).join(" ");

  return (
    <div className={cn("flex flex-col items-center gap-8 py-6", className)}>
      {/* Track */}
      <div className="relative flex items-center justify-between w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#32324D] rounded-full px-6 py-4">
        {options.map((option, index) => (
          <React.Fragment key={option.id}>
            {/* Node circle */}
            <div
              ref={(el) => { circleRefs.current[index] = el; }}
              className="relative w-3.5 h-3.5 rounded-full cursor-pointer shrink-0 z-20 transition-all duration-200 hover:scale-125"
              onClick={() => handleCircleClick(option, index)}
              style={{
                backgroundColor: isInRange(index)
                  ? option.color
                  : "var(--color-gray-300, #d1d5db)",
                boxShadow: isInRange(index)
                  ? `0 0 8px ${option.color}60, 0 0 16px ${option.color}30`
                  : "none",
              }}
            >
              {/* Orbital dots on both endpoints */}
              {(index === minIndex || index === maxIndex) &&
                minIndex !== -1 &&
                createOrbitalDots(10, 14, option.color)}
            </div>

            {/* Connector line */}
            {index < options.length - 1 && (
              <div
                className="flex-1 h-0.5 rounded-full transition-all duration-300 mx-1"
                style={getLineStyle(index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between w-full px-2 -mt-4">
        {options.map((option, index) => (
          <span
            key={`label-${option.id}`}
            className="text-sm font-semibold transition-colors duration-200 cursor-pointer"
            onClick={() => handleCircleClick(option, index)}
            style={{
              color: isInRange(index) ? option.color : "#8E8EA9",
            }}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}
