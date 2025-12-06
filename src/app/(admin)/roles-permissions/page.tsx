import { RolesCards } from "@/modules/admin/roles-permissions";
import { PageHeader } from "@/ui";

export default function RolesPermissionsPage() {
    return (
        <div>
            <PageHeader
                title="Roles y Permisos"
                subtitle="Un rol proporciona acceso a menús y funciones predefinidos para que, según el rol asignado, un administrador pueda tener acceso a lo que necesita."
                className="mb-2"
            />
            <RolesCards />
        </div>
    );
}