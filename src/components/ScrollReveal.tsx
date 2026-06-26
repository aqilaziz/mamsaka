"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in"
  | "zoom-in"
  | "zoom-out"
  | "flip-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number; // 0-1
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "span";
}

const animationStyles: Record<AnimationType, string> = {
  "fade-up": "translate-y-12 opacity-0",
  "fade-down": "-translate-y-12 opacity-0",
  "fade-left": "translate-x-12 opacity-0",
  "fade-right": "-translate-x-12 opacity-0",
  "fade-in": "opacity-0",
  "zoom-in": "scale-90 opacity-0",
  "zoom-out": "scale-110 opacity-0",
  "flip-up": "rotateX-90 opacity-0",
};

export function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const TagComponent = Tag as any;

  return (
    <TagComponent
      ref={ref}
      className={cn(
        "transition-all ease-out",
        animationStyles[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        ...(isVisible && {
          transform: "none",
          opacity: 1,
        }),
      }}
    >
      {children}
    </TagComponent>
  );
}
