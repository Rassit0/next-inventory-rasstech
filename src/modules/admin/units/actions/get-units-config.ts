import { apiFetch } from "@/shared/utils";
import { UnitsConfigResponse } from "@/modules/admin/units";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const getUnitsConfig = async (
  callbackUrl: string = "/units",
): Promise<UnitsConfigResponse> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  try {
    const res = apiFetch<UnitsConfigResponse>({
      endpoint: "units/config",
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
    return res;
  } catch (error: any) {
    console.log("Error en getUnitsConfig", error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if(error.statusCode === 403){
      redirect(`/error?status=403&message=No tienes permiso para ver esta página`);
    }
    throw new Error("Error al obtener las configuraciones de las unidades");
  }
};
