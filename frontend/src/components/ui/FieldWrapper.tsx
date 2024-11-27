import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type { FieldError, Merge } from "react-hook-form";

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef,
  useId,
} from "react";

const fieldWrapperVariants = cva("flex", {
  variants: {
    layout: {
      vertical: "flex-col gap-1",
      horizontal: "items-center gap-2",
    },
  },
  defaultVariants: {
    layout: "vertical",
  },
});

type FieldWrapperProps = Omit<ComponentPropsWithoutRef<typeof Slot>, "className"> &
  VariantProps<typeof fieldWrapperVariants> & {
    id?: string;
    label?: string;
    isRequired?: boolean;
    error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
    description?: ReactNode;
    contentWidth?: string;
  };

export const FieldWrapper = forwardRef<ElementRef<typeof Slot>, FieldWrapperProps>(
  (
    { id: _id, label, isRequired = false, error, layout, description, contentWidth, ...slotProps },
    ref
  ) => {
    const a11yId = useId();
    const fieldId = _id || a11yId;
    const describedbyId = `describedby-${fieldId}`;

    return (
      <div className={fieldWrapperVariants({ layout })}>
        {label && (
          <label
            htmlFor={fieldId}
            className="mt-1 flex shrink-0 flex-col md:flex-row md:items-center"
          >
            <div className="flex shrink-0 items-center gap-1">
              <span className="font-bold leading-none">{label}</span>
              {isRequired && <span className="text-red-600">*</span>}
            </div>
            {description && <div className="flex-1 font-medium md:ml-3">{description}</div>}
          </label>
        )}
        <div className="flex flex-1 items-center gap-2">
          <Slot
            id={fieldId}
            ref={ref}
            aria-invalid={!!error?.message}
            aria-describedby={describedbyId}
            style={{ width: contentWidth && "100%", maxWidth: contentWidth }}
            {...slotProps}
          />
        </div>
        {error?.message && (
          <p
            id={describedbyId}
            className="flex shrink-0 items-center gap-1 whitespace-pre-wrap text-red-600"
          >
            {<span className="text-sm">{error.message}</span>}
          </p>
        )}
      </div>
    );
  }
);

FieldWrapper.displayName = "FieldWrapper";
