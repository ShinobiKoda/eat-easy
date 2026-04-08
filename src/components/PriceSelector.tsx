import React, { useState, useRef, useEffect } from "react";
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
  selectedValue: number;
  onSelectionChange: (value: number) => void;
  className?: string;
}

export function PriceSelector({
  options,
  selectedValue,
  onSelectionChange,
  className = ""
}: PriceSelectorProps) {
  const selectedIndex = options.findIndex((opt) => opt.value === selectedValue);
  
  const [gradientPosition, setGradientPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Ensure minimum of 3 options
  const validOptions = options.length >= 3 ? options : options.slice(0, Math.max(3, options.length));

  // Update gradient position when selection changes
  useEffect(() => {
    const circleElement = circleRefs.current[selectedIndex];
    const containerElement = containerRef.current;

    if (selectedIndex >= 0 && circleElement && containerElement) {
      const circleRect = circleElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();
      
      // Calculate position relative to container
      const relativeX = circleRect.left + (circleRect.width / 2) - containerRect.left;
      const relativeY = circleRect.top + (circleRect.height / 2) - containerRect.top;
      
      setGradientPosition({ x: relativeX, y: relativeY });
    } else {
      setGradientPosition(null);
    }
  }, [selectedIndex, options]);

  const handleCircleClick = (option: PriceOption, _index: number) => {
    onSelectionChange(option.value);
  };

  // Create orbital dots around a circle - dots match the circle's color
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
          initial={{ 
            opacity: 0, 
            scale: 0.3,
            rotate: shouldReduceMotion ? 0 : -90,
            x: x - 2, // Account for half the dot width
            y: y - 2  // Account for half the dot height
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: 0,
            x: x - 2,
            y: y - 2
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.6,
            delay: shouldReduceMotion ? 0 : i * 0.03,
            type: "spring",
            stiffness: 400,
            damping: 25,
            ease: [0.04, 0.62, 0.23, 0.98] as unknown as any
          }}
          style={{
            backgroundColor: color,
            left: '50%',
            top: '50%',
          }}
        />
      );
    }
    return dots;
  };

  const getCircleSize = (index: number) => {
    if (index === 0) return "w-3 h-3";
    if (index === 1) return "w-3.5 h-3.5";
    return "w-4 h-4";
  };

  const getLineStyle = (lineIndex: number) => {
    const isLitUp = selectedIndex > lineIndex; // Line lights up when you progress past it
    const currentOption = validOptions[lineIndex];
    const nextOption = validOptions[lineIndex + 1];
    
    if (isLitUp) {
      // Fully lit with gradient
      return {
        background: `linear-gradient(to right, ${currentOption.gradientFrom}, ${nextOption?.gradientTo || currentOption.gradientTo})`
      };
    } else {
      return {
        background: `var(--color-gray-500, #9ca3af)`
      };
    }
  };

  const cn = (...classes: (string | undefined | false | null)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative flex flex-col items-center gap-8 py-8 overflow-hidden", className)}
    >
      {/* Radial gradient overlay */}
      {selectedIndex >= 0 && gradientPosition && (
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at ${gradientPosition.x}px ${gradientPosition.y + 40}px, ${validOptions[selectedIndex].color}18 0%, ${validOptions[selectedIndex].color}10 30%, transparent 70%)`,
          }}
        />
      )}
      
      <div className="relative z-10 flex items-center justify-between w-full border border-gray-300 dark:border-gray-600 bg-[#FFFFFF] dark:bg-[#32324D] rounded-full px-6 py-4">
        {validOptions.map((option, index) => (
          <React.Fragment key={option.id}>
            {/* Circle */}
            <div 
              ref={(el) => { circleRefs.current[index] = el; }}
              className={cn(
                "relative cursor-pointer transition-all duration-200 hover:scale-110 shrink-0 z-20",
                getCircleSize(index),
                "rounded-full border-2 border-transparent"
              )}
              onClick={() => handleCircleClick(option, index)}
              style={{
                backgroundColor: selectedIndex >= index ? option.color : 'var(--color-gray-500, #9ca3af)',
                boxShadow: selectedIndex >= index 
                  ? `0 0 10px ${option.color}40, 0 0 20px ${option.color}20`
                  : 'none'
              }}
            >
              {selectedIndex === index && createOrbitalDots(12, 16, option.color)}
            </div>
            
            {/* Line (don't render after last circle) */}
            {index < validOptions.length - 1 && (
              <div 
                className={cn("flex-1 rounded-full transition-all duration-300 mx-1", 
                  index === 0 ? "h-1.5" : 
                  index === 1 ? "h-1.75" : 
                  index === 2 ? "h-2" : "h-2.25"
                )}
                style={getLineStyle(index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Labels */}
      <div className="relative z-10 flex items-center justify-between w-full px-2 -mt-4">
        {validOptions.map((option, index) => (
          <span 
            key={`label-${option.id}`}
            className={cn(
              "text-sm font-medium transition-colors duration-200 cursor-pointer",
              selectedIndex >= index ? "text-gray-900 dark:text-white" : "text-[#8E8EA9]"
            )}
            onClick={() => handleCircleClick(option, index)}
            style={{
              color: selectedIndex >= index ? option.color : undefined
            }}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}
