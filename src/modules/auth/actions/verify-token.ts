"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { Category } from "@/modules/admin/categories";
import { VerifyTokenResponse } from "../interfaces/login.interface";

import { signIn } from "@/auth.config";
// import { signIn } from '@/auth';
import { AuthError } from "next-auth";

interface Props {
  token: string;
}

interface Response {
  error: boolean;
  message: string;
  response?: VerifyTokenResponse;
}

export const verifyToken = async ({
  token,
}: Props): Promise<Response | null> => {
  try {
    const resp = await apiFetch<VerifyTokenResponse>({
      endpoint: `auth/verify-token`,
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "force-cache",
        next: {
          tags: [`session`],
        },
      },
    });
    // console.log({ resp });

    // revalidatePath('/categories')
    return {
      error: false,
      message: "Inicio de Sesión correcto",
      response: resp,
    };
  } catch (error: any) {
    console.error("Error en login:", error); // Depuración
    if (error.statusCode === 401) {
      return null;
    }
    return { error: true, message: "Error al iniciar sesión" };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
