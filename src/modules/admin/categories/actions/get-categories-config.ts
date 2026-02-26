import { apiFetch } from "@/shared/utils";
import { CategoriesConfigResponse } from "../interfaces/category.interface";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

export const getCategoriesConfig = async (
  callbackUrl: string = "/categories",
): Promise<CategoriesConfigResponse> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const res = apiFetch<CategoriesConfigResponse>({
      endpoint: "categories/config",
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        cache: "force-cache",
        next: {
          tags: ["categories"],
          // revalidate: 3600,
        },
      },
    });
    return res;
  } catch (error: any) {
    console.log("Error en getCategoriesConfig", error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if (error.statusCode === 403) {
      redirect(
        `/error?status=403&message=No tienes permiso para ver esta página`,
      );
    }
    throw new Error("Error al obtener las configuraciones de las categorías");
  }
};
