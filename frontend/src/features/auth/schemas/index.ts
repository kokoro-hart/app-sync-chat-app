import { z } from "zod";

const userSchema = z.object({
  email: z.string().min(1, "入力してください").email("メールアドレスの形式で入力してください"),
  password: z.string().min(8, {
    message: "パスワードは8文字以上で入力してください",
  }),
});

export const ConfirmSignUpSchema = z.object({
  authCode: z.string().min(1, "認証コードを入力してください"),
});

export const SignInSchema = userSchema;
export const SignUpSchema = userSchema;

export type SignInSchema = z.infer<typeof userSchema>;
export type SignUpSchema = z.infer<typeof userSchema>;
export type ConfirmSignUpSchema = z.infer<typeof ConfirmSignUpSchema>;
