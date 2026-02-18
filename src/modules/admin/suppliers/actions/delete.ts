"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Supplier } from "@/modules/admin/suppliers";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Response {
  error: boolean;
  message: string;
  supplier?: Supplier;
}

export const deleteSupplier = async (
  id: string,
  callbackUrl: string = "/suppliers",
): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  try {
    const resp = await apiFetch<{ message: string; supplier: Supplier }>({
      endpoint: `suppliers/${id}`,
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

    revalidatePath("/suppliers");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('supplier-config', 'page');
    // revalidateTag('suppliers', 'page');
    return {
      error: false,
      message: resp.message,
      supplier: resp.supplier,
    };
  } catch (error: any) {
    console.error("Error en deleteSupplier:", error.message); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: error.statusCode ? error.message : "Error al eliminar proveedor",
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
