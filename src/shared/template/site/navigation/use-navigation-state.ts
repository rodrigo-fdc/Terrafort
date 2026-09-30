"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { navigationItems, type NavigationItem } from "./navigation.config";
import {
  alignHash,
  anchorAtScroll,
  focusDestination,
  resolveActive,
} from "./navigation-state";

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

export function useNavigationState(
  items: readonly NavigationItem[] = navigationItems,
) {
  const pathname = usePathname();
  const [openedPath, setOpenedPath] = useState<string | null>(null);
  const open = openedPath === pathname;
  const navigating = useRef(false);
  const [anchorId, setAnchorId] = useState<string | null>(null);
  const activeId = resolveActive(items, pathname, anchorId);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const close = useCallback(() => {
    navigating.current = false;
    setOpenedPath(null);
  }, []);
  const onNavigate = useCallback(() => {
    navigating.current = true;
    setOpenedPath(null);
  }, []);

  useEffect(() => {
    if (!navigating.current) return;
    navigating.current = false;
    const target = document.querySelector<HTMLElement>("main h1, main");
    if (target) focusDestination(target);
  }, [pathname]);

  useEffect(() => {
    const header = headerRef.current;
    const shell = header?.closest("[data-site-shell]");
    if (!header || !shell) return;
    let frame = 0;
    const line = () =>
      header
        .querySelector<HTMLElement>("[data-header-row]")
        ?.getBoundingClientRect().bottom ?? 0;
    const measure = () => {
      frame = 0;
      let scheme = "dark";
      shell
        .querySelectorAll<HTMLElement>("[data-header-scheme]")
        .forEach((section) => {
          const bounds = section.getBoundingClientRect();
          if (
            getComputedStyle(section).visibility !== "hidden" &&
            bounds.top <= 44 &&
            bounds.bottom > 44
          )
            scheme = section.dataset.headerScheme ?? "dark";
        });
      header.dataset.scheme = scheme;
      setAnchorId(anchorAtScroll(items, pathname, line()));
    };
    const update = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const hash = () => {
      alignHash(pathname, items, line());
      update();
    };
    const mutations = new MutationObserver(update);
    mutations.observe(shell.querySelector("main") ?? shell, {
      childList: true,
      subtree: true,
    });
    const resize = new ResizeObserver(update);
    resize.observe(document.body);
    const row = header.querySelector("[data-header-row]");
    if (row) resize.observe(row);
    hash();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", hash);
    window.addEventListener("popstate", hash);
    window.addEventListener("navigation:hash", hash);
    // Cross-route targets may mount after the pathname changes.
    const targetMount = new MutationObserver(() => {
      if (alignHash(pathname, items, line())) targetMount.disconnect();
    });
    if (location.hash && !alignHash(pathname, items, line()))
      targetMount.observe(shell, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      targetMount.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", hash);
      window.removeEventListener("popstate", hash);
      window.removeEventListener("navigation:hash", hash);
    };
  }, [pathname, items]);

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
    const panel =
      headerRef.current?.querySelector<HTMLElement>("[data-menu-panel]");
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex="0"]',
        ) ?? [],
      ).filter(
        (element) =>
          !element.closest("[inert]") && element.getClientRects().length > 0,
      );
    const outside = Array.from(
      headerRef.current?.querySelectorAll<HTMLElement>(
        "[data-modal-outside]",
      ) ?? [],
    );
    const previousOutside = outside.map((element) => element.inert);
    outside.forEach((element) => {
      element.inert = true;
    });
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
        const elements = focusables();
        const current = elements.indexOf(document.activeElement as HTMLElement);
        if (
          event.shiftKey
            ? current <= 0
            : current === elements.length - 1 || current < 0
        ) {
          event.preventDefault();
          (event.shiftKey ? elements.at(-1) : elements[0])?.focus({
            preventScroll: true,
          });
        }
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (!panel?.contains(event.target as Node))
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
      outside.forEach((element, index) => {
        element.inert = previousOutside[index];
      });
      if (!navigating.current && trigger?.isConnected)
        trigger.focus({ preventScroll: true });
    };
  }, [open, close, reducedMotion]);

  return {
    open,
    close,
    toggle: () => {
      navigating.current = false;
      setOpenedPath((value) => (value === pathname ? null : pathname));
    },
    pathname,
    activeId,
    onNavigate,
    desktop,
    reducedMotion,
    headerRef,
    buttonRef,
  };
}
