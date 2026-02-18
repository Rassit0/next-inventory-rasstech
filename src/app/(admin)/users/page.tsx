import {
  AddModal,
  Filters,
  getUsersConfig,
  TopContent,
  UsersTable,
} from "@/modules/admin/users";
import { getUsers } from "@/modules/admin/users/actions/get-users";
import { HeaderTable, PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    search?: string;
    per_page?: string;
    page?: string;
    role_id?: string;
  }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const { search, page, per_page, role_id } = await searchParams;

  const [usersResponse, configResponse] = await Promise.all([
    getUsers({ search, page: page || "1", per_page: per_page || "5", role_id }),
    getUsersConfig(),
  ]);

  return (
    <>
      <div className="w-full max-w-full card-shadow space-y-2 py-4">
        <PageHeader
          className="p-2 pb-0"
          title="👨🏻‍🦰 Usuarios"
          subtitle="Listado de usuarios"
        />

        <HeaderTable
          totalItems={usersResponse.meta.total}
          take={per_page || "5"}
          nameItems="usuarios"
          buttonAdd={
            <AddModal
              textButton="Agregar usuario"
              sizeButton="sm"
              config={configResponse}
            />
          }
          componentsExtra={
            <>
              <Filters config={configResponse} />
            </>
          }
        />
        <div className="w-full overflow-auto p-2">
          <UsersTable
            users={usersResponse.users}
            usersConfig={configResponse}
          />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
            <PaginationUI totalPages={usersResponse.meta.last_page} />
          </div>
        </Suspense>
      </div>
    </>
  );
}
