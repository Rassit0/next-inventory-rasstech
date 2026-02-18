"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Warehouse } from "@/modules/admin/warehouses";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Response {
  error: boolean;
  message: string;
  branch?: Warehouse;
}

export const deleteWarehouse = async (
  id: string,
  callbackUrl: string = "/warehouses",
): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  try {
    const resp = await apiFetch<{ message: string; branch: Warehouse }>({
      endpoint: `warehouses/${id}`,
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

    revalidatePath("/warehouses");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('branch-config', 'page');
    // revalidateTag('warehouses', 'page');
    return {
      error: false,
      message: resp.message,
      branch: resp.branch,
    };
  } catch (error: any) {
    console.error("Error en deleteWarehouse:", error.message); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: error.statusCode ? error.message : "Error al eliminar almacén",
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
