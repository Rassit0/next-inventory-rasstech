
import { AddModal, getSuppliers, SuppliersTable } from "@/modules/admin/suppliers";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>
}

export default async function SuppliersPage({ searchParams }: Props) {
  const { search, page, per_page } = await searchParams;

  const suppliersResponse = await getSuppliers({ search, page: page || '1', per_page: per_page || '5' });

  return (
    <div className="w-full max-w-full card-shadow space-y-2 py-4">
      <PageHeader
        className="p-2 pb-0"
        title="🏤 Proveedores"
        subtitle="Listado de proveedores"
      />

      <HeaderTable
        totalItems={50} take={per_page || '5'}
        // componentsExtra={
        //   <Filters />
        // }
        buttonAdd={<AddModal textButton="Agregar proveedor" size="sm" />}
      />
      <div className="w-full overflow-auto p-2">
        <SuppliersTable suppliers={suppliersResponse.suppliers} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
          <PaginationUI
            totalPages={suppliersResponse.last_page}
          />
        </div>
      </Suspense>
    </div>
  );
}