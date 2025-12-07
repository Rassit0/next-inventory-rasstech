import { RolesCards, TopContent } from "@/modules/admin/roles-permissions";
import { PageHeader } from "@/ui";
import clsx from 'clsx';

export default function RolesPermissionsPage() {
    return (
        <>
            <PageHeader
                title="🔒 Roles y Permisos"
                subtitle="Un rol proporciona acceso a menús y funciones predefinidos para que, según el rol asignado, un administrador pueda tener acceso a lo que necesita."
                className="p-2 pb-0"
            />
            <TopContent totalItems={10} take={5} />
            <div className="p-2">
                <RolesCards />
            </div>
        </>
    );
}