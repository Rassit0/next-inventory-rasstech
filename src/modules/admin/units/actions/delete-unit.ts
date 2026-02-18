"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { Unit } from "@/modules/admin/units";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Response {
  error: boolean;
  message: string;
  unit?: Unit;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

interface Props {
  id: string;
  callbackUrl?: string;
}

export const deleteUnit = async ({
  id,
  callbackUrl = "/units",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const resp = await apiFetch<{ message: string; unit: Unit }>({
      endpoint: `units/${id}`,
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

    revalidatePath("/units");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('category-config', 'page');
    // revalidateTag('categories', 'page');
    return {
      error: false,
      message: resp.message,
      unit: resp.unit,
    };
  } catch (error: any) {
    console.error("Error en deleteUnit:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al eliminar la unidad",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
