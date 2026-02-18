"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Unit } from "@/modules/admin/units";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  data: {
    name: string;
    description: string;
    state?: number;
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

export const addUnit = async ({
  data,
  callbackUrl = "/units",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const requestData = {
      ...data,
      state: data.state ?? 1, // Default to active (1) if not provided
    };

    const resp = await apiFetch<{ message: string; unit: Unit }>({
      endpoint: `units`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(requestData),
      },
    });

    revalidatePath("/units");
    return {
      error: false,
      message: resp.message,
      unit: resp.unit,
    };
  } catch (error: any) {
    console.error("Error en addUnit:", error); // Depuración
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
