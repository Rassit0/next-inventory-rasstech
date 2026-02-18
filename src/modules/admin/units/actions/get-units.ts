import { apiFetch } from "@/shared/utils";
import { UnitsResponse } from "@/modules/admin/units";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface SearchParams {
  // page?: string;
  // limit?: string;
  // name?: string;
  search?: string;
  per_page?: string;
  page?: string;
  callbackUrl?: string;
}

export const getUnits = async ({
  search,
  page,
  per_page,
  callbackUrl = "/units",
}: SearchParams): Promise<UnitsResponse> => {
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

    const res = await apiFetch<UnitsResponse>({
      endpoint: "units?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        next: {
          revalidate: 3600,
        },
      },
    });
    const units = res.units.map((unit) => ({
      ...unit,
      created_at: new Date(unit.created_at),
    }));
    return {
      ...res,
      units,
    };
  } catch (error: any) {
    console.log("Error en getUnits", error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if(error.statusCode === 403){
      redirect(`/error?status=403&message=No tienes permiso para ver esta página`);
    }
    throw new Error("Error al obtener las unidades");
  }
};
