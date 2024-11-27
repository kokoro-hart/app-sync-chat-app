import type { UseFormRegisterReturn } from "react-hook-form";

import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { Input } from "./Input";

type InputFieldProps = ComponentPropsWithoutRef<typeof Input> &
  Omit<ComponentPropsWithoutRef<typeof FieldWrapper>, "children"> & {
    registration: Partial<UseFormRegisterReturn>;
  };

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, error, isRequired, layout, contentWidth, registration, description, ...inputProps },
    ref
  ) => {
    return (
      <FieldWrapper
        label={label}
        layout={layout}
        isRequired={isRequired}
        error={error}
        contentWidth={contentWidth}
        description={description}
      >
        <Input ref={ref} {...registration} {...inputProps} />
      </FieldWrapper>
    );
  }
);

InputField.displayName = "InputField";
