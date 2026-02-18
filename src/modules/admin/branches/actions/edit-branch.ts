"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Branch } from "@/modules/admin/branches";

interface Props {
  id: number;
  data: {
    name: string;
    address: string;
    phone?: string | null;
    state?: number;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  branch?: Branch;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const editBranch = async ({
  id,
  data,
  callbackUrl = "/branches",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const resp = await apiFetch<{ message: string; branch: Branch }>({
      endpoint: `branches/${id}`,
      options: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      },
    });

    revalidatePath("/branches");
    return {
      error: false,
      message: resp.message,
      branch: resp.branch,
    };
  } catch (error: any) {
    console.error("Error en editBranch:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al editar la sucursal",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
