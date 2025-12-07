import { TopContent, UsersTable } from "@/modules/admin/users";
import { PageHeader, PaginationUI } from "@/ui";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <>
      <div className="w-full max-w-full card-shadow space-y-2 py-4">
        <PageHeader
          className="p-2 pb-0"
          title="👨🏻‍🦰 Usuarios"
          subtitle="Listado de usuarios"
        />

        <TopContent totalItems={50} take={12} />
        <div className="w-full overflow-auto p-2">
          <UsersTable />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full overflow-x-auto overflow-y-hidden flex items-center justify-center mt-3">
            <PaginationUI
              totalPages={10}
            />
          </div>
        </Suspense>
      </div>
    </>
  );
}