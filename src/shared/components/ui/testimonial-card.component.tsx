import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Typography } from "./typography.component";
import { testimonialVariants } from "./composites.variants";
import styles from "./composites.module.css";
export type TestimonialCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & { quote: string; author: string; position: string };
export function TestimonialCardAttribution({
  author,
  position,
}: Pick<TestimonialCardProps, "author" | "position">) {
  return (
    <>
      <div className={styles.cQuoteAuthor}>{author}</div>
      <div className={styles.cQuotePosition}>{position}</div>
    </>
  );
}
function TestimonialCardRoot({
  quote,
  author,
  position,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div {...props} className={cn(testimonialVariants(), className)}>
      <svg className={styles.cQuoteMark} viewBox="0 0 15 10" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.653 10H0L3.732 0h3.435zm7.832 0H7.833l3.731-10H15z"
        />
      </svg>
      <div className={styles.cQuoteContents}>
        <Typography as="span" tone="light" className={styles.cQuoteText}>
          {quote}
        </Typography>
      </div>
      <TestimonialCardAttribution author={author} position={position} />
    </div>
  );
}
export const TestimonialCard = Object.assign(TestimonialCardRoot, {
  Attribution: TestimonialCardAttribution,
});
