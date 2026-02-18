"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { Category } from "@/modules/admin/categories";
import { ILoginResponse } from "../interfaces/login.interface";

import { signIn } from "@/auth.config";
// import { signIn } from '@/auth';
import { AuthError } from "next-auth";

interface Props {
  email: string;
  password: string;
}

interface Response {
  error: boolean;
  message: string;
  response?: ILoginResponse;
}

export const login = async ({ email, password }: Props): Promise<Response> => {
  console.log({ email, password });
  try {
    const resp = await apiFetch<ILoginResponse>({
      endpoint: `auth/login`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    });
    console.log({ resp })

    // revalidatePath('/categories')
    return {
      error: false,
      message: "Inicio de Sesión correcto",
      response: resp,
    };
  } catch (error) {
    console.error("Error en login:", error); // Depuración
    return { error: true, message: "Error al iniciar sesión" };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
