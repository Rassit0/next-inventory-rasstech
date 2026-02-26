"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Category } from "@/modules/admin/categories";

interface Props {
  id: number;
  data: {
    name: string;
    parent_id?: number;
    image?: File;
  };
}

interface Response {
  error: boolean;
  message: string;
  category?: Category;
}

export const editCategory = async ({ id, data }: Props): Promise<Response> => {
  // console.log(data)
  try {
    const resp = await apiFetch<{ message: string; category: Category }>({
      endpoint: `categories/${id}`,
      options: {
        method: "PUT",
        body: JSON.stringify(data),
      },
    });

    revalidatePath("/categories");

    // 🔥 INVALIDA el cache
    revalidateTag("products", "max");

    return {
      error: false,
      message: resp.message,
      category: resp.category,
    };
  } catch (error) {
    console.error("Error en editRolePermission:", error); // Depuración
    return { error: true, message: "Error al editar el rol" };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
