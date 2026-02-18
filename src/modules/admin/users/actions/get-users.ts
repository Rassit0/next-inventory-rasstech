import { apiFetch } from "@/shared/utils";
import { UsersResponse } from "@/modules/admin/users";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface SearchParams {
  // page?: string;
  // limit?: string;
  // name?: string;
  search?: string;
  per_page?: string;
  page?: string;
  role_id?: string;
  callbackUrl?: string;
}

export const getUsers = async ({
  search,
  page,
  per_page,
  role_id,
  callbackUrl = "/users",
}: SearchParams): Promise<UsersResponse> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (per_page) params.set("per_page", per_page);
    if (role_id) params.set("role_id", role_id);

    const resp = await apiFetch<UsersResponse>({
      endpoint: "users?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        next: {
          tags: ["users"],
          revalidate: 3600,
        },
      },
    });
    const users = resp.users.map((user) => {
      return {
        ...user,
        created_at: new Date(user.created_at),
        updated_at: new Date(user.updated_at),
        deleted_at: user.deleted_at ? new Date(user.deleted_at) : null,
      };
    });
    return {
      ...resp,
      users,
    };
  } catch (error: any) {
    console.log("Error en getUsers", error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if(error.statusCode === 403){
      redirect(`/error?status=403&message=No tienes permiso para ver esta página`);
    }
    throw new Error("Error al obtener los usuarios");
  }
};
