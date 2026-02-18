import { apiFetch } from "@/shared/utils";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { BranchesResponse } from "@/modules/admin/branches";

interface SearchParams {
  // page?: string;
  // limit?: string;
  // name?: string;
  search?: string;
  per_page?: string;
  page?: string;
}

export const getBranches = async ({
  search,
  page,
  per_page,
}: SearchParams): Promise<BranchesResponse> => {
  const session = await auth();
  if (!session?.access_token) {
    redirect("/login");
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (per_page) params.set("per_page", per_page);

    const res = await apiFetch<BranchesResponse>({
      endpoint: "branches?" + params.toString(),
      options: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        next: {
          tags: ["branches"],
          revalidate: 3600,
        },
      },
    });
    const branches = res.branches.map((branch) => ({
      ...branch,
      created_at: new Date(branch.created_at),
    }));
    return {
      ...res,
      branches,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener las sucursales");
  }
};
