"use client";
import { addToast, Button, Form } from "@heroui/react";
import { FormEvent, useRef, useState } from "react";
import {
  AdditionalForm,
  addProduct,
  InfoGeneralForm,
  PricesForm,
  ProductConfig,
  SpecsForm,
  StockForm,
} from "@/modules/admin/products";
import { ImagesUploadForm } from "./ImagesUploadForm";
import { useRouter } from "next/navigation";

interface Props {
  config: ProductConfig;
}

interface PreviewFile extends File {
  preview: string;
}

interface ProductWarehouse {
  warehouse_id: string;
  unit_id: string;
  threshold?: string | null;
  stock?: number | null;
}

interface ProductWallet {
  branch_id: string;
  unit_id: string;
  type_client: "general" | "company";
  price: number;
}

export const RegisterForm = ({ config }: Props) => {
  const router = useRouter();

  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [priceGeneral, setPriceGeneral] = useState<number | null>(null);
  const [priceCompany, setPriceCompany] = useState<number | null>(null);
  const [description, setDescription] = useState("");

  const [category_id, setCategory_id] = useState<number | null>(null);
  const [is_gift, setIs_gift] = useState(false);
  const [is_discount, setIs_discount] = useState(false);
  const [max_discount, setMax_discount] = useState<number | null>(null);
  const [warranty_day, setWarranty_day] = useState<number | null>(null);

  const [is_taxable, setIs_taxable] = useState(false);
  const [iva, setIva] = useState<number | null>(null);
  const [allow_without_stock, setAllow_without_stock] = useState(false);
  const [state, setState] = useState(true);

  const [files, setFiles] = useState<PreviewFile[]>([]);

  const [productWarehouses, setProductWarehouses] = useState<
    ProductWarehouse[]
  >([]);
  const [productWallets, setProductWallets] = useState<ProductWallet[]>([]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validationErrors: Record<string, string> = {};

    if (!title || title.trim().length < 3) {
      validationErrors.title = "El nombre debe tener al menos 3 caracteres";
    } else if (title.length > 255) {
      validationErrors.title = "El nombre no debe exceder los 255 caracteres";
    }

    // if (!address || address.trim().length < 3) {
    //   validationErrors.description =
    //     "La dirección es obligatoria y debe tener al menos 3 caracteres";
    // } else if (address.length > 500) {
    //   validationErrors.description =
    //     "La dirección no debe exceder los 500 caracteres";
    // }

    // if (phone && phone.length > 20) {
    //   validationErrors.description =
    //     "El teléfono no debe exceder los 20 caracteres";
    // }

    // if (phone && phone.length < 3) {
    //   validationErrors.description =
    //     "El teléfono debe tener al menos 3 caracteres";
    // }
    // if(productWarehouses.length === 0) {
    //   validationErrors.productWarehouses = "Debe agregar al menos un almacén";
    // }

    // if(productWallets.length === 0) {
    //   validationErrors.productWallets = "Debe agregar al menos un precio por sucursal";
    // }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      title: title.trim(),
      category_id: category_id ?? undefined,
      sku: sku.trim(),
      price_general: priceGeneral || 0,
      price_company: priceCompany || 0,
      description: description.trim(),
      iva: iva || 0, // Default IVA
      state, // Default active
      is_gift,
      allow_without_stock,
      is_discount,
      is_taxable,
      warranty_day: warranty_day || undefined,
      max_discount: max_discount || undefined,
      product_warehouses: productWarehouses,
      product_wallets: productWallets,
      image: files.length > 0 ? files[0] : null,
      // state: 1 // Default to active
    };

    // console.log({ data });

    setIsLoading(true);
    const {
      error,
      message,
      product: productCreated,
      errors,
    } = await addProduct({
      data,
      callbackUrl: "/products",
    });
    setIsLoading(false);
    if (errors) {
      setErrors(errors);
      return;
    }

    if (error) {
      // closeAll();
      addToast({
        title: "Error al crear",
        description: message || "Error al crear producto",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    addToast({
      title: "Producto creado",
      description: "Producto creado exitosamente",
      color: "success",
      timeout: 2000,
      variant: "bordered",
      shouldShowTimeoutProgress: true,
    });
    router.push("/products");
  };

  return (
    <Form
      ref={formRef}
      onSubmit={onSubmit}
      validationErrors={errors}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div className="md:col-span-2 grid gap-6 h-fit">
        {/* Informacion General */}
        <InfoGeneralForm
          title={title}
          setTitle={setTitle}
          sku={sku}
          setSku={setSku}
          priceGeneral={priceGeneral}
          setPriceGeneral={setPriceGeneral}
          priceCompany={priceCompany}
          setPriceCompany={setPriceCompany}
          description={description}
          setDescription={setDescription}
        />
        {/* Imagen del Producto */}
        <ImagesUploadForm
          error={errors.image ? errors.image : undefined}
          files={files}
          setFiles={setFiles}
        />
        {/* Existencias */}
        <StockForm
          config={config}
          productWarehouses={productWarehouses}
          setProductWarehouses={setProductWarehouses}
        />
        {/* Multiples precios */}
        <PricesForm
          config={config}
          productWallets={productWallets}
          setProductWallets={setProductWallets}
        />
      </div>
      <div className="grid gap-6 h-fit">
        {/* Adicionales */}
        <AdditionalForm
          config={config}
          category_id={category_id}
          setCategory_id={setCategory_id}
          is_discount={is_discount}
          max_discount={max_discount}
          setMax_discount={setMax_discount}
          is_gift={is_gift}
          setIs_gift={setIs_gift}
          setIs_discount={setIs_discount}
          warranty_day={warranty_day}
          setWarranty_day={setWarranty_day}
        />
        {/* Especificaciones */}
        <SpecsForm
          config={config}
          is_taxable={is_taxable}
          setIs_taxable={setIs_taxable}
          iva={iva}
          setIva={setIva}
          allow_without_stock={allow_without_stock}
          setAllow_without_stock={setAllow_without_stock}
          state={state}
          setState={setState}
        />
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          color="primary"
          onPress={() => formRef.current?.requestSubmit()}
        >
          Crear Producto
        </Button>
      </div>
    </Form>
  );
};
