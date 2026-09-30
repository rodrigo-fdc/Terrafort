"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { footerContent } from "@/content/footer";
import {
  Button,
  Checkbox,
  Input,
  Label,
  ModalBody,
  ModalContent,
  ModalRoot,
  Select,
  Textarea,
  TextLink,
} from "@/shared/components/ui";
import styles from "./footer.module.css";

export function FooterContact() {
  const [open, setOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const trigger = useRef<HTMLAnchorElement>(null);
  const id = useId();
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const department =
      footerContent.departments.find(
        (item) => item.value === fields.get("department"),
      ) ?? footerContent.departments[0];
    const subject = String(fields.get("subject") ?? "");
    const body = `${fields.get("message")}\n\n${fields.get("name")}\n${fields.get("email")}`;
    window.location.href = `mailto:${department.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return (
    <ModalRoot open={open} onOpenChange={setOpen}>
      <a
        ref={trigger}
        href={`mailto:${footerContent.email}`}
        className={styles.contactTrigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        <span className={styles.statementText}>
          {footerContent.statement.split(/\[|\]/).map((part, index) =>
            index % 2 ? (
              <span className={styles.statementEmphasis} key={index}>
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </span>
      </a>
      <ModalContent
        ref={setPortalContainer}
        title={footerContent.labels.contactTitle}
        closeLabel={footerContent.labels.close}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          trigger.current?.focus();
        }}
      >
        <ModalBody>
          <form className={styles.contactForm} onSubmit={prepareEmail}>
            <div className={styles.field}>
              <Label htmlFor={`${id}-name`}>01 Name*</Label>
              <Input
                id={`${id}-name`}
                name="name"
                placeholder="What's your name?"
                autoComplete="name"
                required
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-email`}>02 Email address*</Label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                placeholder="What's your email?"
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-subject`}>03 Subject*</Label>
              <Input
                id={`${id}-subject`}
                name="subject"
                placeholder="Awesome office project 01"
                required
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-department`}>04 Where to*</Label>
              <Select
                portalContainer={portalContainer}
                id={`${id}-department`}
                name="department"
                required
                defaultValue={footerContent.departments[0].value}
                options={footerContent.departments}
                aria-label="Where to"
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor={`${id}-message`}>05 Message*</Label>
              <Textarea
                id={`${id}-message`}
                name="message"
                placeholder="Type your message here"
                rows={3}
                required
              />
            </div>
            <Label htmlFor={`${id}-privacy`} className={styles.consent}>
              <Checkbox id={`${id}-privacy`} name="privacy" required />
              <span>
                {footerContent.labels.privacy}{" "}
                <TextLink
                  href={
                    footerContent.legal.find(
                      (link) => link.label === "Privacy Policy",
                    )!.href
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </TextLink>
              </span>
            </Label>
            <p className={styles.delivery}>{footerContent.labels.delivery}</p>
            <Button type="submit">{footerContent.labels.send}</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalRoot>
  );
}
