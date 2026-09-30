"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";
import { fieldVariants } from "./ui.variants";
import styles from "./ui.module.css";

export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "value" | "defaultValue" | "onChange" | "children" | "type"
> &
  VariantProps<typeof fieldVariants> & {
    options: readonly SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    /** Keep portalled options inside a containing dialog when needed. */
    portalContainer?: HTMLElement | null;
    required?: boolean;
  };

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      options,
      value,
      defaultValue = "",
      onValueChange,
      placeholder = "",
      portalContainer,
      required = false,
      disabled = false,
      name,
      form,
      id,
      className,
      variant,
      onKeyDown,
      onClick,
      onBlur,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const triggerId = id ?? generatedId;
    const listId = generatedId + "-list";
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const nativeRef = useRef<HTMLSelectElement>(null);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [expanded, setExpanded] = useState(false);
    const [active, setActive] = useState(-1);
    const [invalid, setInvalid] = useState(false);
    const [position, setPosition] = useState<{
      left: number;
      width: number;
      top?: number;
      bottom?: number;
      maxHeight: number;
    } | null>(null);
    const typed = useRef({ text: "", time: 0 });
    const current = value ?? internalValue;
    const selected = options.find((option) => option.value === current);
    const [previousDisabled, setPreviousDisabled] = useState(disabled);
    if (previousDisabled !== disabled) {
      setPreviousDisabled(disabled);
      if (disabled) setExpanded(false);
    }
    const open = expanded && !disabled;
    const activeOption = options[active];
    useImperativeHandle(ref, () => buttonRef.current!, []);

    useEffect(() => {
      const owner = nativeRef.current?.form;
      let resetTimer: ReturnType<typeof setTimeout>;
      const reset = (event: Event) => {
        // A microtask can precede the browser's default reset action.
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          if (event.defaultPrevented) return;
          setInternalValue(defaultValue);
          setExpanded(false);
          setInvalid(false);
          if (nativeRef.current)
            nativeRef.current.value = value ?? defaultValue;
        });
      };
      owner?.addEventListener("reset", reset);
      return () => {
        owner?.removeEventListener("reset", reset);
        clearTimeout(resetTimer);
      };
    }, [defaultValue, form, value]);

    useLayoutEffect(() => {
      if (!open) return;
      const measure = () => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;
        const below = innerHeight - rect.bottom;
        const needed = Math.min(
          innerHeight / 2,
          listRef.current?.scrollHeight ?? innerHeight / 2,
        );
        const above = below < needed && rect.top > below;
        setPosition({
          left: rect.left,
          width: rect.width,
          ...(above
            ? { bottom: innerHeight - rect.top }
            : { top: rect.bottom }),
          maxHeight: Math.max(
            0,
            Math.min(innerHeight / 2, above ? rect.top : below),
          ),
        });
      };
      measure();
      const observer = new ResizeObserver(measure);
      if (buttonRef.current) observer.observe(buttonRef.current);
      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure, true);
      const outside = (event: PointerEvent) => {
        if (
          !buttonRef.current?.contains(event.target as Node) &&
          !listRef.current?.contains(event.target as Node)
        )
          setExpanded(false);
      };
      document.addEventListener("pointerdown", outside);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure, true);
        document.removeEventListener("pointerdown", outside);
      };
    }, [open]);
    useEffect(() => {
      if (open && active >= 0)
        document
          .getElementById(`${listId}-${active}`)
          ?.scrollIntoView({ block: "nearest" });
    }, [open, active, listId]);

    const first = () => options.findIndex((option) => !option.disabled);
    const last = () => options.findLastIndex((option) => !option.disabled);
    const show = (fromEnd = false) => {
      setActive(
        selected && !selected.disabled
          ? options.indexOf(selected)
          : fromEnd
            ? last()
            : first(),
      );
      setExpanded(true);
    };
    const choose = (index: number) => {
      const option = options[index];
      if (!option || option.disabled) return;
      if (value === undefined) setInternalValue(option.value);
      setInvalid(false);
      setExpanded(false);
      onValueChange?.(option.value);
      buttonRef.current?.focus();
    };
    const move = (direction: number) => {
      let index = active;
      for (let step = 0; step < options.length; step++) {
        index = (index + direction + options.length) % options.length;
        if (!options[index].disabled) {
          setActive(index);
          break;
        }
      }
    };
    const keydown = (event: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled) return;
      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          event.preventDefault();
          if (!open) show(event.key === "ArrowUp");
          else move(event.key === "ArrowDown" ? 1 : -1);
          break;
        case "Home":
        case "End":
          event.preventDefault();
          setExpanded(true);
          setActive(event.key === "Home" ? first() : last());
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (open) choose(active);
          else show();
          break;
        case "Escape":
          if (open) {
            event.preventDefault();
            event.stopPropagation();
            setExpanded(false);
          }
          break;
        case "Tab":
          setExpanded(false);
          break;
        default:
          if (
            event.key.length === 1 &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
          ) {
            const now = Date.now();
            const previous =
              now - typed.current.time < 700 ? typed.current.text : "";
            const text =
              previous === event.key.toLocaleLowerCase()
                ? previous
                : previous + event.key.toLocaleLowerCase();
            typed.current = { text, time: now };
            const indices = options.map(
              (_, i) => (active + 1 + i) % options.length,
            );
            const found = indices.find(
              (i) =>
                !options[i].disabled &&
                options[i].label.toLocaleLowerCase().startsWith(text),
            );
            if (found !== undefined) {
              event.preventDefault();
              setActive(found);
              setExpanded(true);
            }
          }
      }
    };

    return (
      <>
        <button
          {...props}
          ref={buttonRef}
          id={triggerId}
          type="button"
          disabled={disabled}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={
            open && activeOption && !activeOption.disabled
              ? `${listId}-${active}`
              : undefined
          }
          aria-required={required || undefined}
          aria-invalid={
            props["aria-invalid"] ??
            ((invalid && required && !current) || undefined)
          }
          className={cn(
            fieldVariants({ variant }),
            styles.selectTrigger,
            className,
          )}
          onKeyDown={keydown}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              if (open) setExpanded(false);
              else show();
            }
          }}
          onBlur={(event) => {
            onBlur?.(event);
            setExpanded(false);
          }}
        >
          <span className={!selected ? styles.placeholder : undefined}>
            {selected?.label ?? placeholder}
          </span>
          <svg
            className={styles.selectArrow}
            data-open={open}
            viewBox="0 0 9 11"
            aria-hidden="true"
            fill="none"
          >
            <path
              fill="currentColor"
              d="m8.688 6.222-4.347 4.347-4.34-4.34.972-.974 2.623 2.623V0L5.09.003l.004 7.873L7.718 5.25z"
            />
          </svg>
        </button>
        <select
          ref={nativeRef}
          className={styles.nativeProxy}
          aria-hidden="true"
          tabIndex={-1}
          name={name}
          form={form}
          disabled={disabled}
          required={required}
          value={current}
          onChange={(event) => {
            if (value === undefined) setInternalValue(event.target.value);
            onValueChange?.(event.target.value);
          }}
          onInvalid={(event) => {
            event.preventDefault();
            setInvalid(true);
            buttonRef.current?.focus();
          }}
        >
          {!options.some((option) => option.value === "") && (
            <option value="" />
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {open &&
          position &&
          createPortal(
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={triggerId}
              className={cn(styles.base, styles.selectList)}
              style={position}
              data-lenis-prevent
              onPointerDown={(event) => event.preventDefault()}
            >
              {options.map((option, index) => (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={current === option.value}
                  aria-disabled={option.disabled || undefined}
                  data-active={active === index}
                  className={styles.selectOption}
                  onPointerMove={() => {
                    if (!option.disabled) setActive(index);
                  }}
                  onClick={() => choose(index)}
                >
                  {option.label}
                </li>
              ))}
            </ul>,
            portalContainer ?? document.body,
          )}
      </>
    );
  },
);
