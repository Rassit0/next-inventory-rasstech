import { apiFetch } from "@/shared/utils";
import { CategoriesResponse } from "../interfaces/category.interface";
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

export const getCategories = async ({
  search,
  page,
  per_page,
  callbackUrl = "/categories",
}: SearchParams): Promise<CategoriesResponse> => {
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

    const res = await apiFetch<CategoriesResponse>({
      endpoint: "categories?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          Accept: "application/json",
        },
        next: {
          tags: ["categories"],
          revalidate: 3600,
        },
      },
    });
    const categories = res.categories.map((category) => ({
      ...category,
      created_at: new Date(category.created_at),
    }));
    return {
      ...res,
      categories,
    };
  } catch (error: any) {
    console.log(error);
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    if(error.statusCode === 403){
      redirect(`/error?status=403&message=No tienes permiso para ver esta página`);
    }
    throw new Error("Error al obtener las categorías");
  }
};
