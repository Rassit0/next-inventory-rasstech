"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Supplier } from "@/modules/admin/suppliers";

interface Props {
  data: {
    full_name: string;
    ruc: string;
    email?: string;
    address?: string;
    phone: string;
    state?: number;
    image?: File;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  supplier?: Supplier;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const addSupplier = async ({
  data,
  callbackUrl = "/suppliers",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  const formdata = new FormData();
  formdata.append("full_name", data.full_name);
  formdata.append("ruc", data.ruc);
  if (data.email) formdata.append("email", data.email);
  if (data.address) formdata.append("address", data.address);
  formdata.append("phone", data.phone);
  if (data.state) formdata.append("state", data.state.toString());
  if (data.image) formdata.append("image", data.image);
  try {
    const resp = await apiFetch<{ message: string; supplier: Supplier }>({
      endpoint: `suppliers`,
      options: {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formdata,
      },
    });

    revalidatePath("/suppliers");
    return {
      error: false,
      message: resp.message,
      supplier: resp.supplier,
    };
  } catch (error: any) {
    console.error("Error en addSupplier:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al crear el proveedor",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
