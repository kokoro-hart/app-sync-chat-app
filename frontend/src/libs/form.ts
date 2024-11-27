import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  useForm as useReactHookForm,
} from "react-hook-form";
import type { ZodType, ZodTypeDef } from "zod";

type UseFormArgs<FormValues extends FieldValues, Schema> = UseFormProps<FormValues> & {
  schema?: Schema;
};

/**
 * useForm Wrapper Hooks（https://react-hook-form.com/docs/useform）
 *
 * @template FormValues - フォームのフィールドの型
 * @template Schema - Zodスキーマ
 *
 * @examples const methods = useForm<FieldValues>({ schema });
 */
export const useForm = <
  FormValues extends FieldValues,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<unknown, ZodTypeDef, unknown>,
>({
  schema,
  ...options
}: UseFormArgs<FormValues, Schema>): UseFormReturn<FormValues> => {
  return useReactHookForm<FormValues>({
    mode: "onSubmit",
    resolver: schema && zodResolver<Schema>(schema),
    ...options,
  });
};
