"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Category } from "@/modules/admin/categories";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  file: File;
}

interface Response {
  error: boolean;
  message: string;
  errors?: {
    fila: number;
    campo: string;
    error: string;
  }[];
  total_errors?: number;
  remaining_errors?: number;
  // category?: Category;
}

export const importExcel = async ({ file }: Props): Promise<Response> => {
  // console.log(data)

  const session = await auth();
  if (
    !session?.access_token ||
    (session.expires && new Date(session.expires) < new Date())
  ) {
    redirect("/login");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const resp = await apiFetch<{ message: string; category: Category }>({
      endpoint: `products-excel/import`,
      options: {
        method: "POST",
        headers: {
          // 'Accept': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formData,
      },
    });

    // console.log({ resp })

    revalidatePath("/products");

    // 🔥 INVALIDA el cache
    // revalidateTag('products', 'page');

    return {
      error: false,
      message: resp.message,
    };
  } catch (error: any) {
    console.error("Error en editRolePermission:", error); // Depuración

    if (error.statusCode && error.statusCode === 422) {
      let translatedErrors = null;
      if (Array.isArray(error.errors)) {
        // Handle array of error messages
        translatedErrors = error.errors;
      }
      return {
        error: true,
        message: error.message,
        // errors: translatedErrors || undefined,
        errors: error.errors,
        total_errors: error.total_errors,
        remaining_errors: error.remaining_errors,
      };
    }

    return { error: true, message: "Error al editar el rol" };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
