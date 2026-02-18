import { apiFetch } from "@/shared/utils";
import { ProductsResponse } from "../interfaces/product.interface";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface SearchParams {
  // page?: string;
  // limit?: string;
  // name?: string;
  search?: string;
  per_page?: string;
  page?: string;
}

export const getProducts = async ({
  search,
  page,
  per_page,
}: SearchParams): Promise<ProductsResponse> => {
  const session = await auth();
  console.log({ session });
  if (!session?.access_token) {
    redirect("/login");
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (per_page) params.set("per_page", per_page);

    const res = await apiFetch<ProductsResponse>({
      endpoint: "products?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        next: {
          tags: ["products"],
          revalidate: 120,
        },
      },
    });

    console.log({ res });
    const products = res.products.map((product) => ({
      ...product,
      created_at: new Date(product.created_at),
    }));
    return {
      ...res,
      products,
    };
  } catch (error) {
    console.log({ error });
    throw new Error("Error al obtener los productos");
  }
};
