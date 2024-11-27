import Axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

type Options =
  | undefined
  | {
      silent?: boolean;
    };

export const handleApiError = (
  e: unknown | AxiosError,
  defaultError?: string,
  options: Options = { silent: false }
) => {
  let errorMessage = "";

  if (Axios.isAxiosError(e) && e.response?.data) {
    if (Array.isArray(e.response.data.error)) {
      e.response.data.error.forEach((error: string) => (errorMessage = error));
    } else {
      errorMessage = e.response.data.error;
    }
  } else if (e instanceof Error) {
    errorMessage = e.message;
  } else if (defaultError) {
    errorMessage = defaultError;
  }

  toast.error(errorMessage);

  if (options?.silent) {
    return;
  }

  throw new Error(errorMessage);
};
