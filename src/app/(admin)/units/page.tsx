import { auth } from "@/auth.config";
import {
  AddModal,
  getUnits,
  getUnitsConfig,
  UnitsTable,
} from "@/modules/admin/units";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>;
}

export default async function UnitsPage({ searchParams }: Props) {
  const session = await auth();
  const { search, page, per_page } = await searchParams;

  const [unitsResponse, configResponse] = await Promise.all([
    getUnits({
      search,
      page: page || "1",
      per_page: per_page || "5",
    }),
    getUnitsConfig(),
  ]);

  return (
    <div className="w-full max-w-full card-shadow space-y-2 py-4">
      <PageHeader
        className="p-2 pb-0"
        title="📦 Unidades"
        subtitle="Listado de unidades"
      />

      <HeaderTable
        totalItems={50}
        take={per_page || "5"}
        buttonAdd={<AddModal textButton="Agregar unidad" size="sm" />}
      />
      <div className="w-full overflow-auto p-2">
        <UnitsTable
          units={unitsResponse.units}
          config={configResponse}
        />
      </div>

      <Suspense fallback={<div>Cargando...</div>}>
        <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
          <PaginationUI totalPages={unitsResponse.last_page} />
        </div>
      </Suspense>
    </div>
  );
}
