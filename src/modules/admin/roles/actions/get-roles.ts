import { apiFetch } from "@/shared/utils";
import { RolesResponse } from "../interfaces/role.interface";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface SearchParams {
  search?: string;
  per_page?: string;
  page?: string;
  callbackUrl?: string;
}

export const getRoles = async ({
  search,
  page = "1",
  per_page = "5",
  callbackUrl = "/roles",
}: SearchParams): Promise<RolesResponse> => {
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

    const res = await apiFetch<RolesResponse>({
      endpoint: "roles?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        next: {
          tags: ["users"],
          revalidate: 3600,
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if (error.statusCode === 403) {
      redirect(
        `/error?status=403&message=No tienes permiso para ver esta página`,
      );
    }
    throw new Error("Error al obtener los roles");
  }
};
