"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useSiteMenu() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, [close]);

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ lerp: 0.13, smoothWheel: true });
    lenisRef.current = lenis;
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!open) return;
    const shell = headerRef.current?.closest("[data-site-shell]");
    const background = shell?.querySelector<HTMLElement>(
      "[data-shell-background]",
    );
    const previousInert = background?.inert ?? false;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    const trigger = buttonRef.current;
    const previousFocus = document.activeElement;
    const lenis = lenisRef.current;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (background) background.inert = true;
    trigger?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "Tab") {
        event.preventDefault();
        trigger?.focus({ preventScroll: true });
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        trigger?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocus);
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      if (background) background.inert = previousInert;
      if (lenisRef.current === lenis) lenis?.start();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus({ preventScroll: true });
      else if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [open, close, reducedMotion]);

  return {
    open,
    close,
    toggle: () => setOpen((value) => !value),
    desktop,
    reducedMotion,
    headerRef,
    buttonRef,
  };
}
