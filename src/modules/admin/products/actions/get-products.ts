import { apiFetch } from "@/shared/utils";
import { ProductsResponse } from "../interfaces/product.interface";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface SearchParams {
  // page?: string;
  // limit?: string;
  // name?: string;
  category_id?: string;
  search?: string;
  per_page?: string;
  page?: string;
  branch_id?: string;
  warehouse_id?: string;
  allow_without_stock?: string;
  is_gift?: string;
  state?: string;
}

export const getProducts = async ({
  search,
  page,
  per_page,
  category_id,
  branch_id,
  warehouse_id,
  allow_without_stock,
  is_gift,
  state
}: SearchParams): Promise<ProductsResponse> => {
  const session = await auth();
  // console.log({ session });
  if (!session?.access_token) {
    redirect("/login");
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (per_page) params.set("per_page", per_page);
    if (category_id) params.set("category_id", category_id);
    if (branch_id) params.set("branch_id", branch_id);
    if (warehouse_id) params.set("warehouse_id", warehouse_id);
    if (allow_without_stock) params.set("allow_without_stock", allow_without_stock);
    if (is_gift) params.set("is_gift", is_gift);
    if (state) params.set("state", state);

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

    // console.log({ res });
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
