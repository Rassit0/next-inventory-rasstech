"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Role } from "@/modules/admin/roles";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Response {
  error: boolean;
  message: string;
  role?: Role;
}

export const deleteRole = async (
  id: string,
  callbackUrl: string = "/roles",
): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  try {
    const resp = await apiFetch<{ message: string; role: Role }>({
      endpoint: `roles/${id}`,
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

    console.log({ resp });

    revalidatePath("/roles");
    revalidateTag("roles", "max");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('role-config', 'page');
    // revalidateTag('categories', 'page');
    return {
      error: false,
      message: resp.message,
      role: resp.role,
    };
  } catch (error: any) {
    console.error("Error en deleteRole:", error.message); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: error.statusCode ? error.message : "Error al eliminar rol",
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
