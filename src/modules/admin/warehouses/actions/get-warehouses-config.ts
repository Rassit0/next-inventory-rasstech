import { apiFetch } from "@/shared/utils";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { WarehousesConfigResponse } from "../interfaces/warehouse.interface";

export const getWarehousesConfig = async (
  callbackUrl: string = "/warehouses",
): Promise<WarehousesConfigResponse> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const res = apiFetch<WarehousesConfigResponse>({
      endpoint: "warehouses/config",
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        next: {
          tags: ["warehouses-config"],
          revalidate: 3600,
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log("Error en getWarehousesConfig", error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if (error.statusCode === 403) {
      redirect(
        `/error?status=403&message=No tienes permiso para ver esta página`,
      );
    }
    throw new Error("Error al obtener las configuraciones de los almacenes");
  }
};
