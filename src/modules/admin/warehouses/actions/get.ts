import { apiFetch } from "@/shared/utils";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { WarehousesResponse } from "@/modules/admin/warehouses";

interface SearchParams {
  // page?: string;
  // limit?: string;
  // name?: string;
  search?: string;
  per_page?: string;
  page?: string;
}

export const getWarehouses = async ({
  search,
  page,
  per_page,
}: SearchParams): Promise<WarehousesResponse> => {
  const session = await auth();
  if (!session?.access_token) {
    redirect("/login");
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (per_page) params.set("per_page", per_page);

    const res = await apiFetch<WarehousesResponse>({
      endpoint: "warehouses?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        next: {
          tags: ["warehouses"],
          revalidate: 3600,
        },
      },
    });
    const warehouses = res.warehouses.map((branch) => ({
      ...branch,
      created_at: new Date(branch.created_at),
    }));
    return {
      ...res,
      warehouses,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los almacenes");
  }
};
