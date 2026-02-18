"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Category } from "@/modules/admin/categories";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { User } from "../interfaces/user.interface";

interface Props {
  data: {
    name: string;
    surname?: string;
    email: string;
    phone?: string;
    type_document?: string;
    n_document?: string;
    branch_id?: string;
    role_id: string;
    gender?: string;
    imagen?: File | null;
    password: string;
    password_confirmation: string;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  user?: User;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const addUser = async ({
  data,
  callbackUrl = "/users",
}: Props): Promise<Response> => {
  console.log(data);
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  const formData = new FormData();
  formData.append("name", data.name);
  if (data.surname) formData.append("surname", data.surname);
  formData.append("email", data.email);
  if (data.phone) formData.append("phone", data.phone);
  if (data.type_document) formData.append("type_document", data.type_document);
  if (data.n_document) formData.append("n_document", data.n_document);
  if (data.branch_id) formData.append("branch_id", data.branch_id);
  formData.append("role_id", data.role_id);
  formData.append("gender", data.gender || "");
  if (data.imagen) formData.append("imagen", data.imagen);
  formData.append("password", data.password);
  formData.append("password_confirmation", data.password_confirmation);

  try {
    const resp = await apiFetch<{ message: string; user: User }>({
      endpoint: `users`,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        body: formData,
      },
    });

    revalidatePath("/users");

    // 🔥 INVALIDA el cache
    // revalidateTag('product-config', 'page');
    // revalidateTag('users-config', 'page');
    // revalidateTag('users', 'page');
    return {
      error: false,
      message: resp.message,
      user: resp.user,
    };
  } catch (error: any) {
    console.error("Error en addUser:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: "Error al editar la categoría",
      errors: error.errors ?? undefined,
    };
  }
};
