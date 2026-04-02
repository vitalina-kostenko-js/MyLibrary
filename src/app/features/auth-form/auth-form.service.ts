import { signIn } from "next-auth/react";
import { LoginFormValues, RegisterFormValues } from "./auth-form.schema";

//register user
export const registerUser = async (
  values: RegisterFormValues,
  signal?: AbortSignal,
) => {
  const res = await fetch("/register", {
    cache: "no-store",
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      typeof data?.error === "string" ? data.error : "Registration failed";
    throw new Error(message);
  }

  return data;
};

//login user
export const loginUser = async (values: LoginFormValues) => {
  const res = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
  });

  return res;
};
