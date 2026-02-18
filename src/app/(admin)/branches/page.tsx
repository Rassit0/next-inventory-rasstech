import { AddModal, BranchesTable, getBranches, TopContent } from "@/modules/admin/branches";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>
}

export default async function BranchesPage({ searchParams }: Props) {
  const { search, page, per_page } = await searchParams;

  const branchesResponse = await getBranches({ search, page: page || '1', per_page: per_page || '5' });

  return (
    <div className="w-full max-w-full card-shadow space-y-2 py-4">
      <PageHeader
        className="p-2 pb-0"
        title="🏪 Sucursales"
        subtitle="Listado de sucursales"
      />

      <HeaderTable
        totalItems={50} take={per_page || '5'}
        // componentsExtra={
        //   <Filters />
        // }
        buttonAdd={<AddModal textButton="Agregar sucursal" size="sm" />}
      />
      <div className="w-full overflow-auto p-2">
        <BranchesTable branches={branchesResponse.branches} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
          <PaginationUI
            totalPages={branchesResponse.last_page}
          />
        </div>
      </Suspense>
    </div>
  );
}