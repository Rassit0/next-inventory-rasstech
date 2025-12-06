import { UsersTable } from "@/modules/admin/users";

export default function UsersPage() {
  return (
    <>
      {/* <h1 className="text-2xl font-semibold mb-4">Usuarios</h1> */}
      <div className="card-shadow">
        <div className="p-2">
          <h1 className="text-3xl text-foreground">👨‍🦰 Usuarios</h1>
        </div>
        <UsersTable />
      </div>
    </>
  );
}