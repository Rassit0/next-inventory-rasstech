"use client";
import { Card, CardBody, CardHeader, Input, Textarea } from "@heroui/react";

interface Props {
  title: string;
  setTitle: (value: string) => void;
  sku: string;
  setSku: (value: string) => void;
  priceGeneral: number | null;
  setPriceGeneral: (value: number) => void;
  priceCompany: number | null;
  setPriceCompany: (value: number) => void;
  description: string;
  setDescription: (value: string) => void;
}
export const InfoGeneralForm = ({
  title,
  setTitle,
  sku,
  setSku,
  priceGeneral,
  setPriceGeneral,
  priceCompany,
  setPriceCompany,
  description,
  setDescription,
}: Props) => {
  return (
    <Card className="min-w-fit max-h-fit bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground text-2xl">Información General</span>
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center min-w-fit min-h-fit">
        <div className="w-full grid grid-cols-3 gap-4">
          <Input
            isRequired
            name="title"
            className="col-span-3"
            radius="lg"
            label="Nombre"
            placeholder="Ingrese el nombre del producto"
            type="text"
            variant="bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            isRequired
            name="sku"
            radius="lg"
            label="SKU"
            placeholder="Ingrese el SKU del producto"
            type="text"
            variant="bordered"
            value={sku}
            onValueChange={(value) => setSku(value)}
          />
          <Input
            isRequired
            name="price_general"
            radius="lg"
            label="Precio (Cliente Final)"
            placeholder="Ingrese el precio"
            type="number"
            step="0.01"
            variant="bordered"
            value={priceGeneral?.toString()}
            min={0}
            onValueChange={(value) => setPriceGeneral(parseFloat(value))}
          />
          <Input
            isRequired
            name="price_company"
            radius="lg"
            label="Precio (Cliente Empresa)"
            placeholder="Ingrese el precio"
            type="number"
            step="0.01"
            variant="bordered"
            value={priceCompany?.toString()}
            min={0}
            onValueChange={(value) => setPriceCompany(parseFloat(value))}
          />
          <Textarea
            isRequired
            className="col-span-3"
            name="description"
            radius="lg"
            label="Descripción"
            placeholder="Ingrese descripción del producto"
            type="text"
            variant="bordered"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardBody>
    </Card>
  );
};
