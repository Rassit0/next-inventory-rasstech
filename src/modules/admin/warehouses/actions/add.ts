"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Warehouse } from "@/modules/admin/warehouses";

interface Props {
  data: {
    name: string;
    address: string;
    phone?: string;
    branch_id: string;
    state?: number;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  warehouse?: Warehouse;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const addWarehouse = async ({
  data,
  callbackUrl = "/warehouses",
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

    const resp = await apiFetch<{ message: string; warehouse: Warehouse }>({
      endpoint: `warehouses`,
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

    revalidatePath("/warehouses");
    return {
      error: false,
      message: resp.message,
      warehouse: resp.warehouse,
    };
  } catch (error: any) {
    console.error("Error en addWarehouse:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al crear la sucursal",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
