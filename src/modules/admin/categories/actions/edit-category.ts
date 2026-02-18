"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Category } from "@/modules/admin/categories";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Props {
  id: number;
  data: {
    name: string;
    parent_id?: string;
    image?: File;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string | string[];
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
  category?: Category;
}

export const editCategory = async ({
  id,
  data,
  callbackUrl = "/categories",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  const formdata = new FormData();
  formdata.append("name", data.name);
  if (data.parent_id) formdata.append("parent_id", data.parent_id.toString());
  if (data.image) formdata.append("image", data.image);
  try {
    const resp = await apiFetch<{ message: string; category: Category }>({
      endpoint: `categories/${id}`,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        body: formdata,
      },
    });

    revalidatePath("/categories");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('category-config', 'page');
    // revalidateTag('categories', 'page');
    return {
      error: false,
      message: resp.message,
      category: resp.category,
    };
  } catch (error: any) {
    console.error("Error en editCategory:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al editar la categoría",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
