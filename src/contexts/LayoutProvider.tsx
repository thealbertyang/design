"use client";

import type React from "react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// Default breakpoints
export const DEFAULT_BREAKPOINTS = {
  xs: 480, // Extra small (mobile small)
  s: 768, // Small (mobile)
  m: 1024, // Medium (tablet)
  l: 1440, // Large (desktop)
  xl: Number.POSITIVE_INFINITY, // Above all breakpoints
} as const;

export type BreakpointKey = keyof typeof DEFAULT_BREAKPOINTS;
export type Breakpoints = Record<BreakpointKey, number>;

interface LayoutContextType {
  currentBreakpoint: BreakpointKey;
  width: number;
  breakpoints: Breakpoints;
  isDefaultBreakpoints: () => boolean;
  isBreakpoint: (key: BreakpointKey) => boolean;
  maxWidth: (key: BreakpointKey) => boolean;
  minWidth: (key: BreakpointKey) => boolean;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
  breakpoints?: Partial<Breakpoints>;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  breakpoints: customBreakpoints,
}) => {
  // Memoize merged breakpoints to prevent recreation on every render
  const breakpoints = useMemo<Breakpoints>(
    () => ({
      ...DEFAULT_BREAKPOINTS,
      ...customBreakpoints,
    }),
    [customBreakpoints],
  );

  const [width, setWidth] = useState<number>(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>("l");

  // Use ref to track breakpoints for useEffect without causing re-runs
  const breakpointsRef = useRef(breakpoints);
  breakpointsRef.current = breakpoints;

  // Determine current breakpoint based on width
  const getCurrentBreakpoint = useCallback((w: number): BreakpointKey => {
    const bp = breakpointsRef.current;
    if (w <= bp.xs) return "xs";
    if (w <= bp.s) return "s";
    if (w <= bp.m) return "m";
    if (w <= bp.l) return "l";
    return "xl";
  }, []);

  // Memoized callback: Check if current breakpoint matches the given key
  const isBreakpoint = useCallback(
    (key: BreakpointKey): boolean => currentBreakpoint === key,
    [currentBreakpoint],
  );

  // Memoized callback: Check if current width is at or below the given breakpoint (max-width)
  const maxWidth = useCallback(
    (key: BreakpointKey): boolean => width <= breakpoints[key],
    [width, breakpoints],
  );

  // Memoized callback: Check if current width is above the given breakpoint (min-width)
  const minWidth = useCallback(
    (key: BreakpointKey): boolean => width > breakpoints[key],
    [width, breakpoints],
  );

  // Memoized callback: Check if using default breakpoints
  const isDefaultBreakpoints = useCallback(
    (): boolean => JSON.stringify(breakpoints) === JSON.stringify(DEFAULT_BREAKPOINTS),
    [breakpoints],
  );

  useEffect(() => {
    // Initialize width and handle resize
    const updateWidth = () => {
      const newWidth = window.innerWidth;
      const newBreakpoint = getCurrentBreakpoint(newWidth);

      // Batch state updates - only update if values changed
      setWidth((prevWidth) => (prevWidth !== newWidth ? newWidth : prevWidth));
      setCurrentBreakpoint((prev) => (prev !== newBreakpoint ? newBreakpoint : prev));
    };

    // Debounce resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedUpdateWidth = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWidth, 100);
    };

    // Set initial width
    updateWidth();

    // Add resize listener with debouncing
    window.addEventListener("resize", debouncedUpdateWidth);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedUpdateWidth);
    };
  }, [getCurrentBreakpoint]);

  // Memoize context value to prevent unnecessary re-renders of consumers
  const value = useMemo<LayoutContextType>(
    () => ({
      currentBreakpoint,
      width,
      breakpoints,
      isDefaultBreakpoints,
      isBreakpoint,
      maxWidth,
      minWidth,
    }),
    [currentBreakpoint, width, breakpoints, isDefaultBreakpoints, isBreakpoint, maxWidth, minWidth],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};

export { LayoutProvider };
