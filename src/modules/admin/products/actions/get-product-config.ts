import { apiFetch } from "@/shared/utils";
import { ProductConfig } from "../interfaces/product.interface";

export const getProductConfig = (): Promise<ProductConfig> => {
  try {
    const res = apiFetch<ProductConfig>({
      endpoint: "products/config",
      options: {
        method: "GET",
        next: {
          tags: ["product-config"],
          revalidate: 3600,
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las configuraciones de los productos");
  }
};
