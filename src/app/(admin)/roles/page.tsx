import {
  AddModal,
  getRoles,
  RolesCards,
} from "@/modules/admin/roles";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
  }>;
}

export default async function RolesPage({ searchParams }: Props) {
  const { search, page, per_page } = await searchParams;

  const rolesResponse = await getRoles({
    search,
    page,
    per_page,
  });

  return (
    <>
      <PageHeader
        title="🔒 Roles y Permisos"
        subtitle="Un rol proporciona acceso a menús y funciones predefinidos para que, según el rol asignado, un administrador pueda tener acceso a lo que necesita."
        className="p-2 pb-0"
      />
      <HeaderTable
        totalItems={50}
        take={per_page || "5"}
        buttonAdd={<AddModal textButton="Agregar Rol" sizeButton="sm" />}
      />
      <div className="p-2">
        <RolesCards roles={rolesResponse.roles} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
          <PaginationUI totalPages={rolesResponse.last_page} />
        </div>
      </Suspense>
    </>
  );
}
