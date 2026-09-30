"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  type PointerEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { IconButton } from "./icon-button.component";
import { Badge } from "./badge.component";
import { Typography } from "./typography.component";
import { Arrow } from "./arrow.component";
import styles from "./carousel.module.css";

const carouselVariants = cva(styles.root, {
  variants: { variant: { teams: styles.teams, journal: styles.journal } },
  defaultVariants: { variant: "teams" },
});
export type CarouselEntry = { id: string; content: ReactNode; label?: string };
export type CarouselStyle = CSSProperties & {
  [key: `--ui-carousel-${string}`]: string | number;
};
export type CarouselProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "style"
> &
  VariantProps<typeof carouselVariants> & {
    items: readonly CarouselEntry[];
    label: string;
    countLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    showControls?: boolean;
    showCount?: boolean;
    style?: CarouselStyle;
    onIndexChange?: (index: number) => void;
  };
export const CarouselItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>(function CarouselItem({ className, ...props }, ref) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      {...props}
      ref={ref}
      className={cn(styles.item, className)}
    />
  );
});

const initial = {
  first: 0,
  last: 0,
  previous: false,
  next: false,
  overflow: false,
};
const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(
  function Carousel(
    {
      items,
      label,
      countLabel = label,
      previousLabel = "Anterior",
      nextLabel = "Próximo",
      showControls = true,
      showCount = true,
      variant,
      className,
      style,
      onIndexChange,
      ...props
    },
    ref,
  ) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const drag = useRef<{
      id: number;
      x: number;
      y: number;
      scroll: number;
      active: boolean;
    } | null>(null);
    const suppressClick = useRef(false);
    const lastIndex = useRef(0);
    const [position, setPosition] = useState(initial);
    const viewportId = useId();

    useEffect(() => {
      const viewport = viewportRef.current,
        track = trackRef.current;
      if (!viewport || !track) return;
      let frame = 0;
      const measure = () => {
        frame = 0;
        const bounds = viewport.getBoundingClientRect();
        const children = Array.from(track.children);
        const visible = children
          .map((node, index) => ({ index, rect: node.getBoundingClientRect() }))
          .filter(
            ({ rect }) =>
              rect.right > bounds.left + 1 && rect.left < bounds.right - 1,
          );
        const maximum = Math.max(
          0,
          viewport.scrollWidth - viewport.clientWidth,
        );
        const next = {
          first: visible[0]?.index ?? 0,
          last: visible.at(-1)?.index ?? 0,
          previous: viewport.scrollLeft > 1,
          next: viewport.scrollLeft < maximum - 1,
          overflow: maximum > 1,
        };
        setPosition((previous) =>
          Object.keys(next).every(
            (key) =>
              previous[key as keyof typeof next] ===
              next[key as keyof typeof next],
          )
            ? previous
            : next,
        );
        if (lastIndex.current !== next.first) {
          lastIndex.current = next.first;
          onIndexChange?.(next.first);
        }
      };
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(measure);
      };
      const observer = new ResizeObserver(schedule);
      observer.observe(viewport);
      observer.observe(track);
      for (const child of track.children) observer.observe(child);
      viewport.addEventListener("scroll", schedule, { passive: true });
      schedule();
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        viewport.removeEventListener("scroll", schedule);
      };
    }, [items, onIndexChange, variant]);

    const anchors = () => {
      const viewport = viewportRef.current,
        track = trackRef.current;
      if (!viewport || !track) return [];
      const left = viewport.getBoundingClientRect().left;
      const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      return [
        ...new Set([
          0,
          ...Array.from(track.children).map((node) =>
            Math.max(
              0,
              Math.min(
                maximum,
                node.getBoundingClientRect().left - left + viewport.scrollLeft,
              ),
            ),
          ),
          maximum,
        ]),
      ].sort((a, b) => a - b);
    };
    const scrollTo = (left: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      viewport.scrollTo({ left, behavior: reduced ? "instant" : "smooth" });
    };
    const move = (direction: -1 | 1) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const points = anchors();
      const target =
        direction === 1
          ? points.find((point) => point > viewport.scrollLeft + 1)
          : points.findLast((point) => point < viewport.scrollLeft - 1);
      if (target !== undefined) scrollTo(target);
    };
    const release = (
      event: PointerEvent<HTMLDivElement>,
      cancelled = false,
    ) => {
      const current = drag.current;
      if (!current || current.id !== event.pointerId) return;
      drag.current = null;
      delete event.currentTarget.dataset.dragging;
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
      if (current.active && !cancelled) {
        const left = event.currentTarget.scrollLeft;
        const nearest = anchors().reduce(
          (best, point) =>
            Math.abs(point - left) < Math.abs(best - left) ? point : best,
          0,
        );
        scrollTo(nearest);
      }
    };
    const count = items.length;
    return (
      <div
        {...props}
        ref={ref}
        role={props.role ?? "region"}
        aria-roledescription="carousel"
        aria-label={props["aria-label"] ?? label}
        className={cn(carouselVariants({ variant }), className)}
        style={style}
      >
        <div className={styles.toolbar} hidden={!showControls && !showCount}>
          {showCount && (
            <div className={styles.count}>
              <Badge>{String(count).padStart(2, "0")}</Badge>
              <Typography as="span" variant="small">
                {countLabel}
              </Typography>
            </div>
          )}
          {showControls && (
            <div className={styles.controls}>
              <IconButton
                variant="pill"
                aria-label={previousLabel}
                aria-controls={viewportId}
                disabled={!position.previous}
                onClick={() => move(-1)}
              >
                <Arrow className={styles.previous} />
              </IconButton>
              <IconButton
                variant="pill"
                aria-label={nextLabel}
                aria-controls={viewportId}
                disabled={!position.next}
                onClick={() => move(1)}
              >
                <Arrow />
              </IconButton>
            </div>
          )}
        </div>
        <div
          ref={viewportRef}
          id={viewportId}
          className={styles.viewport}
          dir="ltr"
          tabIndex={position.overflow ? 0 : -1}
          aria-label={label}
          data-lenis-prevent-wheel="true"
          onKeyDown={(event) => {
            if (
              event.target !== event.currentTarget ||
              event.altKey ||
              event.ctrlKey ||
              event.metaKey
            )
              return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
            if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              scrollTo(
                event.key === "Home" ? 0 : event.currentTarget.scrollWidth,
              );
            }
          }}
          onPointerDown={(event) => {
            suppressClick.current = false;
            if (
              event.pointerType !== "mouse" ||
              event.button !== 0 ||
              !position.overflow ||
              (event.target as HTMLElement).closest(
                "button,input,select,textarea,[contenteditable=true]",
              )
            )
              return;
            drag.current = {
              id: event.pointerId,
              x: event.clientX,
              y: event.clientY,
              scroll: event.currentTarget.scrollLeft,
              active: false,
            };
          }}
          onPointerMove={(event) => {
            const current = drag.current;
            if (!current || current.id !== event.pointerId) return;
            if (!event.buttons) {
              release(event, true);
              return;
            }
            const delta = event.clientX - current.x;
            if (!current.active) {
              if (
                Math.abs(delta) < 6 ||
                Math.abs(delta) < Math.abs(event.clientY - current.y)
              )
                return;
              current.active = true;
              suppressClick.current = true;
              event.currentTarget.dataset.dragging = "true";
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            event.preventDefault();
            event.currentTarget.scrollLeft = current.scroll - delta;
          }}
          onPointerUp={(event) => release(event)}
          onPointerCancel={(event) => release(event, true)}
          onLostPointerCapture={(event) => release(event, true)}
          onClickCapture={(event) => {
            if (suppressClick.current && event.detail !== 0) {
              suppressClick.current = false;
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onDragStart={(event) => event.preventDefault()}
        >
          <div ref={trackRef} className={styles.track}>
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                aria-label={item.label ?? `${index + 1} / ${count}`}
              >
                {item.content}
              </CarouselItem>
            ))}
          </div>
        </div>
        <span
          className={styles.status}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {count
            ? `${position.first + 1}–${position.last + 1} / ${count}`
            : "0 / 0"}
        </span>
      </div>
    );
  },
);
export const Carousel = Object.assign(CarouselRoot, { Item: CarouselItem });
