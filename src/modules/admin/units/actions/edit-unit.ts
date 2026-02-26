"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { Unit } from "@/modules/admin/units";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

interface Props {
  id: number;
  data: {
    name: string;
    description: string;
    state: number;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  unit?: Unit;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const editUnit = async ({
  id,
  data,
  callbackUrl = "/units",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?callbackUrl=${callbackUrl || "units"}`);
  }

  try {
    const resp = await apiFetch<{ message: string; unit: Unit }>({
      endpoint: `units/${id}`,
      options: {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    });

    console.log(resp);

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
    console.error("Error en editUnit:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al editar la unidad",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
