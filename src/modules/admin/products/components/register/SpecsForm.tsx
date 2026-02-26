"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { ProductConfig } from "@/modules/admin/products";

interface Props {
  config: ProductConfig;
  is_taxable: boolean;
  setIs_taxable: (value: boolean) => void;
  iva: number | null;
  setIva: (value: number) => void;
  allow_without_stock: boolean;
  setAllow_without_stock: (value: boolean) => void;
  state: boolean;
  setState: (value: boolean) => void;
}

export const SpecsForm = ({
  config,
  is_taxable,
  setIs_taxable,
  iva,
  setIva,
  allow_without_stock,
  setAllow_without_stock,
  state,
  setState,
}: Props) => {
  return (
    <Card className="min-w-fit max-h-fit bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground text-2xl">Especificaciones</span>
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center min-w-fit min-h-fit">
        <div className="w-full grid grid-cols-1 gap-6">
          <Select
            isRequired
            radius="lg"
            label="Tipo de Impuesto"
            variant="bordered"
            selectedKeys={[is_taxable ? "true" : "false"]}
            onChange={(e) => setIs_taxable(e.target.value === "true")}
          >
            <SelectItem key="false">Libre de Impuesto</SelectItem>
            <SelectItem key="true">IVA 13%</SelectItem>
          </Select>
          <Input
            isRequired
            radius="lg"
            label="Importe IVA"
            placeholder="Ingrese el importe"
            type="number"
            variant="bordered"
            startContent="Bs."
            step="0.01"
            value={iva?.toString()}
            onValueChange={(value) => setIva(parseFloat(value))}
            min={0}
          />
          <Select
            isRequired
            radius="lg"
            label="Disponibilidad"
            variant="bordered"
            selectedKeys={[allow_without_stock ? "true" : "false"]}
            onChange={(e) => setAllow_without_stock(e.target.value === "true")}
          >
            <SelectItem key="false">No vender sin Stock</SelectItem>
            <SelectItem key="true">Vender sin Stock</SelectItem>
          </Select>
          <Switch className="ml-2" isSelected={state} onValueChange={setState}>
            {state ? "Activo" : "Inactivo"}
          </Switch>
        </div>
      </CardBody>
    </Card>
  );
};
