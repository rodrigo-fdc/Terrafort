import type { NavigationItem } from "./navigation.config";

export function normalizePath(path: string) {
  const pathname = path.split(/[?#]/, 1)[0];
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}
export function hrefFor(item: NavigationItem) {
  return item.kind === "anchor"
    ? `${item.pathname}#${encodeURIComponent(item.fragment)}`
    : item.href;
}
export function decodeHash(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}
export function resolveActive(
  items: readonly NavigationItem[],
  pathname: string,
  anchorId: string | null,
) {
  const current = normalizePath(pathname);
  const anchor = items.find(
    (item) =>
      item.kind === "anchor" &&
      item.id === anchorId &&
      normalizePath(item.pathname) === current,
  );
  if (anchor) return anchor.id;
  return (
    items
      .filter((item) => {
        if (item.kind !== "route") return false;
        const target = normalizePath(item.href);
        return (
          current === target ||
          (item.match === "segment" &&
            target !== "/" &&
            current.startsWith(target + "/"))
        );
      })
      .sort((a, b) => hrefFor(b).length - hrefFor(a).length)[0]?.id ?? null
  );
}
export function primaryActivation(event: {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}
export function eligibleAnchors(
  items: readonly NavigationItem[],
  pathname: string,
) {
  return items
    .flatMap((item) => {
      if (
        item.kind !== "anchor" ||
        normalizePath(item.pathname) !== normalizePath(pathname)
      )
        return [];
      const element = document.getElementById(item.fragment);
      return element ? [{ id: item.id, element }] : [];
    })
    .sort((a, b) =>
      a.element === b.element
        ? 0
        : a.element.compareDocumentPosition(b.element) &
            Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
    );
}
export function anchorAtScroll(
  items: readonly NavigationItem[],
  pathname: string,
  line: number,
) {
  const anchors = eligibleAnchors(items, pathname);
  if (
    scrollY > 0 &&
    Math.ceil(scrollY + innerHeight) >=
      document.documentElement.scrollHeight - 1
  )
    return anchors.at(-1)?.id ?? null;
  return (
    anchors
      .filter(
        ({ element }) => element.getBoundingClientRect().top <= line + 0.5,
      )
      .at(-1)?.id ?? null
  );
}
export function focusDestination(element: HTMLElement) {
  const tabindex = element.getAttribute("tabindex");
  if (tabindex === null) element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });
  if (tabindex === null)
    element.addEventListener(
      "blur",
      () => element.removeAttribute("tabindex"),
      { once: true },
    );
}
// An immediate scroll avoids intermediate active states and is also reduced-motion safe.
export function alignHash(
  pathname: string,
  items: readonly NavigationItem[],
  line: number,
) {
  const fragment = decodeHash(location.hash);
  const target = eligibleAnchors(items, pathname).find(
    ({ element }) => element.id === fragment,
  )?.element;
  if (!target) return false;
  window.scrollTo({
    top: Math.max(0, scrollY + target.getBoundingClientRect().top - line),
    behavior: "instant",
  });
  focusDestination(target);
  return true;
}
