"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Category } from "@/modules/admin/categories";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  name: string;
  parent_id?: string;
  image?: File;
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  category?: Category;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const addCategory = async ({
  name,
  parent_id,
  image,
  callbackUrl = "/categories",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  // console.log(data)
  const formdata = new FormData();
  formdata.append("name", name);
  if (parent_id) formdata.append("parent_id", parent_id);
  if (image) formdata.append("image", image);
  try {
    const resp = await apiFetch<{ message: string; category: Category }>({
      endpoint: `categories`,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
          //   "Content-Type": "application/json",
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
    console.error("Error en addCategory:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al crear la categoría",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
