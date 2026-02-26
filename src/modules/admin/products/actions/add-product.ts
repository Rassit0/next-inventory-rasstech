"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Product } from "@/modules/admin/products";

interface Props {
  data: {
    title: string;
    description: string;
    category_id?: number;
    image?: File | null;
    sku: string;
    is_gift: boolean;
    allow_without_stock: boolean;
    stock_status?: "available" | "low_stock" | "out_of_stock" | null;
    price_general: number;
    price_company: number;
    is_discount: boolean;
    max_discount?: number | null;
    state: boolean;
    warranty_day?: number | null;
    is_taxable: boolean;
    iva: number;
    product_warehouses?:
      | {
          warehouse_id: string;
          unit_id: string;
          threshold?: string | null;
          stock?: number | null;
        }[]
      | null;
    product_wallets?:
      | {
          branch_id: string;
          unit_id: string;
          type_client: "general" | "company";
          price: number;
        }[]
      | null;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  product?: Product;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const addProduct = async ({
  data,
  callbackUrl = "/products",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }

  const formdata = new FormData();
  formdata.append("title", data.title);
  formdata.append("description", data.description);
  if (data.category_id)
    formdata.append("category_id", data.category_id.toString());
  if (data.image) formdata.append("image", data.image);
  formdata.append("sku", data.sku);
  formdata.append("is_gift", data.is_gift ? "1" : "0");
  formdata.append("allow_without_stock", data.allow_without_stock ? "1" : "0");
  if (data.stock_status) formdata.append("stock_status", data.stock_status);
  formdata.append("price_general", data.price_general.toString());
  formdata.append("price_company", data.price_company.toString());
  formdata.append("is_discount", data.is_discount ? "1" : "0");
  if (data.max_discount != null)
    formdata.append("max_discount", data.max_discount.toString());
  formdata.append("state", data.state ? "1" : "0");
  if (data.warranty_day != null)
    formdata.append("warranty_day", data.warranty_day.toString());
  formdata.append("is_taxable", data.is_taxable ? "1" : "0");
  formdata.append("iva", data.iva.toString());
  if (data.product_warehouses)
    formdata.append(
      "product_warehouses",
      JSON.stringify(data.product_warehouses),
    );
  if (data.product_wallets)
    formdata.append("product_wallets", JSON.stringify(data.product_wallets));

  try {
    const resp = await apiFetch<{ message: string; product: Product }>({
      endpoint: `products`,
      options: {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: formdata,
      },
    });

    revalidatePath("/products");
    revalidateTag("products", "max");
    // redirect(`/products`);
    return {
      error: false,
      message: resp.message,
      product: resp.product,
    };
  } catch (error: any) {
    console.error("Error en addProduct:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: error.message || "Error al crear el producto",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
