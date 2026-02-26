import {
  AddModal,
  CategoriesTable,
  TopContent,
  getCategories,
  getCategoriesConfig,
} from "@/modules/admin/categories";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: Props) {
  const { search, page, per_page } = await searchParams;

  const [categoriesResponse, configResponse] = await Promise.all([
    getCategories({ search, page: page || "1", per_page: per_page || "5" }),
    getCategoriesConfig(),
  ]);

  return (
    <div className="w-full max-w-full card-shadow space-y-2 py-4">
      <PageHeader
        className="p-2 pb-0"
        title="🏷️ Categorías"
        subtitle="Listado de categorías"
      />

      <HeaderTable
        totalItems={50}
        take={per_page || "5"}
        buttonAdd={
          <AddModal
            textButton="Agregar categoría"
            size="sm"
            config={configResponse}
          />
        }
      />
      <div className="w-full overflow-auto p-2">
        <CategoriesTable
          categories={categoriesResponse.categories}
          config={configResponse}
        />
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
          <PaginationUI totalPages={categoriesResponse.last_page} />
        </div>
      </Suspense>
    </div>
  );
}
