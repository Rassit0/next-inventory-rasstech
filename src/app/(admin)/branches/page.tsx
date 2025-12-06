import { BranchesTable, TopContent } from "@/modules/admin/branches";
import { PaginationUI } from "@/ui";

export default function BranchesPage() {
  return (
      <div className="w-full max-w-full card-shadow space-y-2 py-4">
            <div className="p-2">
              <h1 className="text-3xl text-foreground">🏪 Sucursales</h1>
            </div>
    
            <div className="w-full overflow-auto">
              <TopContent totalItems={50} take={12}/>
              <BranchesTable />
            </div>
    
            <PaginationUI
              className="flex items-center justify-center mt-3"
              totalPages={10}
            />
          </div>
  );
}