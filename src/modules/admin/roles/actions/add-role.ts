"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Role } from "@/modules/admin/roles";

interface Props {
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

export const addRole = async ({
  data,
  callbackUrl = "/roles",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  // console.log(data)
  try {
    const resp = await apiFetch<{ message: string; role: Role }>({
      endpoint: `roles`,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    });

    revalidatePath("/roles");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('category-config', 'page');
    // revalidateTag('categories', 'page');
    return {
      error: false,
      message: resp.message,
      role: resp.role,
    };
  } catch (error: any) {
    console.error("Error en addRole:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al crear el rol",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
