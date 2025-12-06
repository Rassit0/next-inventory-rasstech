import { TopContent, UsersTable } from "@/modules/admin/users";
import { PaginationUI } from "@/ui";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <>
      {/* <h1 className="text-2xl font-semibold mb-4">Usuarios</h1> */}
      <div className="w-full max-w-full card-shadow space-y-2 py-4">
        <div className="p-2">
          <h1 className="text-3xl text-foreground">👨‍🦰 Usuarios</h1>
        </div>

        <TopContent totalItems={50} take={12} />
        <div className="w-full overflow-auto">
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