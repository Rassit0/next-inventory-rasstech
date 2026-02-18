"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { User } from "@/modules/admin/users";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Response {
  error: boolean;
  message: string;
  user?: User;
}

export const deleteUser = async (
  id: string,
  callbackUrl: string = "/users",
): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  try {
    const resp = await apiFetch<{ message: string; user: User }>({
      endpoint: `users/${id}`,
      options: {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
          //   "Content-Type": "application/json",
        },
        // body: formdata,
      },
    });

    // console.log({ resp });

    revalidatePath("/users");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('category-config', 'page');
    // revalidateTag('categories', 'page');
    return {
      error: false,
      message: resp.message,
      user: resp.user,
    };
  } catch (error: any) {
    console.error("Error en deleteUser:", error.message); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: error.statusCode ? error.message : "Error al eliminar usuario",
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
