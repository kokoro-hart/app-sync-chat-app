import { Spinner } from "@/components/ui/Spinner";
import { getPath, isEqualPath } from "@/utils";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const GUEST_ONLY_PATHS = [getPath.signIn(), getPath.signUp(), getPath.confirmSignUp()];

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
    },
  },
});

export function CognitoProvider({ children }: PropsWithChildren) {
  return (
    <Authenticator.Provider>
      <AuthRedirectProvider>{children}</AuthRedirectProvider>
    </Authenticator.Provider>
  );
}

function AuthRedirectProvider({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const { route, authStatus } = useAuthenticator((context) => [context.route, context.authStatus]);

  const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) => isEqualPath(pathname, path));
  const shouldRedirectToSignIn = authStatus !== "authenticated" && !isGuestOnlyPath;
  const shouldRedirectToRoot = authStatus === "authenticated" && isGuestOnlyPath;

  if (authStatus === "configuring") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (route === "signOut" || shouldRedirectToSignIn) {
    return <Navigate to={getPath.signIn()} replace />;
  }

  if (shouldRedirectToRoot) {
    return <Navigate to={getPath.root()} replace />;
  }

  return <>{children}</>;
}
