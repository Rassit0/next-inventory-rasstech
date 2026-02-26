import { apiFetch } from "@/shared/utils";
import { ProductConfig } from "../interfaces/product.interface";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export const getProductConfig = async (
  callbackUrl: string = "/products",
): Promise<ProductConfig> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);
  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const res = apiFetch<ProductConfig>({
      endpoint: "products/config",
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        cache: "force-cache",
        next: {
          tags: ["branches", "categories", "warehouses"],
          // revalidate: 3600,
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las configuraciones de los productos");
  }
};
