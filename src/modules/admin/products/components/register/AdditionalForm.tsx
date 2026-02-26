"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { ProductConfig } from "@/modules/admin/products";

interface Props {
  config: ProductConfig;
  is_discount: boolean;
  setIs_discount: (value: boolean) => void;
  is_gift: boolean;
  setIs_gift: (value: boolean) => void;
  warranty_day: number | null;
  setWarranty_day: (value: number | null) => void;
  category_id: number | null;
  setCategory_id: (value: number | null) => void;
  max_discount: number | null;
  setMax_discount: (value: number | null) => void;
}

export const AdditionalForm = ({
  config,
  is_discount,
  is_gift,
  setIs_discount,
  setIs_gift,
  setWarranty_day,
  warranty_day,
  category_id,
  setCategory_id,
  max_discount,
  setMax_discount,
}: Props) => {
  return (
    <Card className="min-w-fit max-h-fit bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground text-2xl">Adicionales</span>
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center min-w-fit min-h-fit">
        <div className="w-full grid grid-cols-1 gap-6">
          <Select
            isRequired
            radius="lg"
            label="Categoría"
            variant="bordered"
            selectedKeys={[category_id?.toString() || ""]}
            onSelectionChange={(v) =>
              setCategory_id(v.currentKey ? Number(v.currentKey) : null)
            }
            onChange={(e) => setCategory_id(Number(e.target.value))}
          >
            {config.categories.map((category) => (
              <SelectItem key={category.id}>{category.name}</SelectItem>
            ))}
          </Select>
          <Checkbox
            name="is_gift"
            isSelected={is_gift}
            onValueChange={setIs_gift}
          >
            ¿Es un producto de regalo?
          </Checkbox>
          <Checkbox
            name="is_discount"
            isSelected={is_discount}
            onValueChange={setIs_discount}
          >
            ¿Tiene descuento?
          </Checkbox>
          {is_discount && (
            <Input
              isRequired={is_discount}
              name="max_discount"
              radius="lg"
              label="Descuento Máximo"
              placeholder="Ingrese el descuento"
              type="number"
              startContent="Bs."
              step="0.01"
              variant="bordered"
              value={max_discount?.toString() || ""}
              onValueChange={(v) => setMax_discount(v ? Number(v) : null)}
            />
          )}
          <Input
            name="warranty_day"
            radius="lg"
            label="Días de garantía"
            placeholder="Ingrese los días"
            type="number"
            variant="bordered"
            value={warranty_day?.toString() || ""}
            onValueChange={(v) => setWarranty_day(v ? Number(v) : null)}
          />
        </div>
      </CardBody>
    </Card>
  );
};
