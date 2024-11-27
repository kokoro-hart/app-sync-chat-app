import { Container } from "@/components/layouts";
import { getPath, handleApiError } from "@/utils";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { ConfirmSignUpSchema } from "../schemas";
import { useForm } from "@/libs";
import { Button, InputField } from "@/components/ui";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { toast } from "react-toastify";

export function ConfirmSignUpForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<ConfirmSignUpSchema>({
    schema: ConfirmSignUpSchema,
  });

  const email = searchParams.get("email");
  if (!email) {
    return <Navigate to={getPath.signUp()} replace />;
  }

  const handleConfirmSignUp = async (data: ConfirmSignUpSchema) => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: data.authCode,
      });
      navigate(getPath.signIn(), {
        replace: true,
      });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({ username: email });
      toast.success("認証コードを再送信しました");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Container size="sm" className="flex h-screen flex-col justify-center">
      <div className="flex flex-col justify-center gap-2 rounded-xl border border-border bg-card p-8 text-card-foreground shadow">
        <p className="text-center">
          アカウント登録メールに記載されている
          <br />
          認証コードを入力してください。
        </p>
        <p className="text-center">{decodeURIComponent(email)}</p>

        <form
          id="confirmSignup"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleConfirmSignUp)}
        >
          <InputField
            label="認証コード"
            type="password"
            placeholder="認証コードを入力"
            registration={register("authCode")}
            error={formState.errors["authCode"]}
            isRequired
          />

          <div className="flex justify-center">
            <Button id="confirmSignup" type="submit">
              登録する
            </Button>
          </div>

          <button type="button" className="text-sm text-blue-500" onClick={handleResend}>
            認証コードを再送信
          </button>
        </form>
      </div>
    </Container>
  );
}
