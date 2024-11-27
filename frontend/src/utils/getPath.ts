export const getPath = {
  root: () => "/",
  signIn: () => "/signin",
  signUp: () => "/signup",
  confirmSignUp: () => "/confirm_signup",
  chat: {
    root: () => "/chat",
    room: (roomId: string) => `/chat/${roomId}`,
  },
};
