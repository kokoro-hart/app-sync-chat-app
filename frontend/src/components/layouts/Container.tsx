import { cn } from "@/libs";
import { type VariantProps, cva } from "class-variance-authority";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  VariantProps<typeof variants> & {
    className?: string;
  }
>;

const variants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-content-sm",
      md: "max-w-content",
    },
  },
});

export function Container({ children, size = "md", className }: Props) {
  return <div className={cn(variants({ size }), className)}>{children}</div>;
}
