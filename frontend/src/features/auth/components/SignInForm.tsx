import { Button, InputField, Link } from "@/components/ui";
import { useForm } from "@/libs";
import { getPath } from "@/utils";
import { SignInSchema } from "../schemas";
import { signIn } from "aws-amplify/auth";
import { Container } from "@/components/layouts";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    schema: SignInSchema,
  });

  const handleSignIn = (data: SignInSchema) => {
    signIn({
      username: data.email,
      password: data.password,
    });
  };

  return (
    <Container size="sm" className="flex h-screen flex-col justify-center">
      <form
        id="signIn"
        onSubmit={handleSubmit(handleSignIn)}
        className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow"
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-700">Sign In</h1>
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
            <Button id="signIn" type="submit">
              Sign In
            </Button>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <span className="text-sm text-gray-600">Don`t have an account?</span>
          <Link to={getPath.signUp()} className="text-sm text-blue-500">
            Go to signup page
          </Link>
        </div>
      </form>
    </Container>
  );
}
