"use server";

import { auth } from "@/auth.config";
import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { Role } from "@/modules/admin/roles";

interface Props {
  id: number;
  data: {
    name: string;
    description?: string;
    permissions: string[];
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  role?: Role;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const editRole = async ({
  id,
  data,
  callbackUrl = "/roles",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const res = await apiFetch<{ message: string; role: Role }>({
      endpoint: `roles/${id}`,
      options: {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      },
    });

    revalidatePath("/roles");
    revalidateTag("roles", "max");

    return {
      error: false,
      role: res.role,
      message: "Rol editado exitosamente",
    };
  } catch (error: any) {
    console.error("Error en editRolePermission:", error); // Depuración
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
