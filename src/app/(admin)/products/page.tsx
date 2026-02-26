import {
  ButtonAdd,
  Filters,
  getProductConfig,
  getProducts,
  ProductsTable,
} from "@/modules/admin/products";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    category_id?: string;
    search?: string;
    per_page?: string;
    page?: string;
    branch_id?: string;
    warehouse_id?: string;
    allow_without_stock?: string;
    is_gift?: string;
    state?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const {
    search,
    page,
    per_page,
    category_id,
    branch_id,
    warehouse_id,
    allow_without_stock,
    is_gift,
    state,
  } = await searchParams;

  const [productsResponse, configResponse] = await Promise.all([
    getProducts({
      search,
      page: page || "1",
      per_page: per_page || "5",
      category_id,
      branch_id,
      warehouse_id,
      allow_without_stock,
      is_gift,
      state,
    }),
    getProductConfig(),
  ]);

  return (
    <div className="w-full max-w-full card-shadow space-y-2 py-4">
      <PageHeader
        className="p-2 pb-0"
        title="💻 Productos"
        subtitle="Listado de productos"
      />

      <HeaderTable
        totalItems={productsResponse.meta.total}
        take={per_page || "5"}
        componentsExtra={
          <>
            <Filters config={configResponse} />
          </>
        }
        buttonAdd={<ButtonAdd />}
      />
      <div className="w-full overflow-auto p-2">
        <ProductsTable
          products={productsResponse.products}
          config={configResponse}
        />
        {/* {JSON.stringify(productsResponse)} */}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
          <PaginationUI totalPages={productsResponse.meta.last_page} />
        </div>
      </Suspense>
    </div>
  );
}
