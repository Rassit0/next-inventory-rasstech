import { getCategoriesConfig } from "@/modules/admin/categories";
import { getProductConfig, RegisterForm } from "@/modules/admin/products";
import { ButtonRedirect } from "@/modules/admin/users";
import { PageHeader } from "@/ui";

export default async function AddProductPage() {
  const [configProduct, configCategory] = await Promise.all([
    getProductConfig(),
    getCategoriesConfig(),
  ]);
  return (
    <div className="flex w-full max-w-full space-y-2 py-4 justify-center">
      <div className="max-w-7xl">
        <div className="w-full flex justify-between items-center">
          <PageHeader
            className="p-2 pb-4"
            title="💻 Agregar Nuevo Producto"
            subtitle="Información General"
          />
          <ButtonRedirect
            href="/products"
            text="Ver Productos"
            color="primary"
          />
        </div>
        <RegisterForm config={configProduct} configCategory={configCategory} />
      </div>
    </div>
  );
}
