import { Button, InputField, Link } from "@/components/ui";
import { useForm } from "@/libs";
import { SignUpSchema } from "../schemas";
import { signUp } from "aws-amplify/auth";
import { Container } from "@/components/layouts";
import { createQueryString, getPath, handleApiError } from "@/utils";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    schema: SignUpSchema,
  });

  const handleSingnUp = async (data: SignUpSchema) => {
    try {
      const { nextStep } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
          },
        },
      });

      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        navigate(
          getPath.confirmSignUp() +
            createQueryString("", {
              email: data.email,
            })
        );
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Container size="sm" className="flex h-screen flex-col justify-center">
      <form
        id="signUp"
        onSubmit={handleSubmit(handleSingnUp)}
        className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow"
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-700">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="example.com"
            registration={register("email")}
            isRequired={true}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="password"
            registration={register("password")}
            isRequired={true}
            error={errors.password}
          />

          <div className="flex justify-center">
            <Button id="signUp" type="submit">
              Sign Up
            </Button>
          </div>

          <div className="mt-6 flex gap-2">
            <span className="text-sm text-gray-600">Don`t have an account?</span>
            <Link to={getPath.signIn()} className="text-sm text-blue-500">
              Go to signin page
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
}
