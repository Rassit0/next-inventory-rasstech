"use client";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Popover,
  PopoverTrigger,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@heroui/react";
import { useState } from "react";
import { ProductConfig } from "@/modules/admin/products";
import { AlertCircleIcon, DangerIcon, Delete01Icon } from "hugeicons-react";

interface ProductWarehouse {
  warehouse_id: string;
  unit_id: string;
  threshold?: string | null;
  stock?: number | null;
}

interface Props {
  config: ProductConfig;
  productWarehouses: ProductWarehouse[];
  setProductWarehouses: (warehouses: ProductWarehouse[]) => void;
}
export const StockForm = ({
  config,
  productWarehouses,
  setProductWarehouses,
}: Props) => {
  const [warehouseId, setWarehouseId] = useState<string>("");
  const [unitId, setUnitId] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [threshold, setThreshold] = useState<string>("");

  const [errors, setErrors] = useState<string[]>([]);
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  const addWarehouse = () => {
    const errorsValidations: string[] = [];
    if (!warehouseId) errorsValidations.push("El Almacén es requerido");
    if (errorsValidations.length > 0) {
      setErrors(errorsValidations);
      setIsVisibleAlert(true)
    }
    if (!warehouseId || !unitId) return;

    const newWarehouse: ProductWarehouse = {
      warehouse_id: warehouseId,
      unit_id: unitId,
      stock: stock ? parseInt(stock) : null,
      threshold: threshold || null,
    };

    setProductWarehouses([...productWarehouses, newWarehouse]);
    setErrors([]);
    // Reset local state
    setWarehouseId("");
    setUnitId("");
    setStock("");
    setThreshold("");
  };

  const removeWarehouse = (index: number) => {
    setProductWarehouses(productWarehouses.filter((_, i) => i !== index));
  };
  return (
    <Card className="min-w-fit max-h-fit bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground text-2xl">Existencias</span>
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center min-w-fit min-h-fit">
        <div className="w-full flex flex-col justify-between items-center gap-2">
          {errors.length > 0 && isVisibleAlert && (
            <div className="flex items-center justify-center w-full">
              <Alert
                hideIconWrapper
                color="danger"
                description={
                  <div>
                    {errors.map((error, index) => (
                      <span key={index}>
                        {error}
                        {index < errors.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                }
                title="Error al agregar"
                variant="bordered"
                isVisible={isVisibleAlert}
                onClose={() => setIsVisibleAlert(false)}
              />
            </div>
          )}
          <div className="grid grid-cols-11 gap-4 items-center">
            <Select
              className="col-span-3"
              radius="lg"
              label="Almacenes"
              variant="bordered"
              selectedKeys={warehouseId ? [warehouseId] : []}
              onChange={(e) => setWarehouseId(e.target.value)}
            >
              {config.warehouses.map((warehouse) => (
                <SelectItem key={warehouse.id}>{warehouse.name}</SelectItem>
              ))}
            </Select>

            <Select
              className="col-span-2"
              radius="lg"
              label="Unidad"
              variant="bordered"
              selectedKeys={unitId ? [unitId] : []}
              onChange={(e) => setUnitId(e.target.value)}
            >
              {config.units.map((unit) => (
                <SelectItem key={unit.id}>{unit.name}</SelectItem>
              ))}
            </Select>
            <Input
              className="col-span-2"
              radius="lg"
              label="Stock"
              placeholder="Ingrese el stock"
              type="number"
              variant="bordered"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <Input
              className="col-span-2"
              radius="lg"
              label="Umbral"
              placeholder="Ingrese el umbral"
              type="number"
              variant="bordered"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
            <Button
              className="col-span-2"
              color="primary"
              onPress={addWarehouse}
            >
              +
            </Button>
          </div>
          <Table
            aria-label="Lista de Existencias"
            removeWrapper
            selectionMode="single"
            classNames={{
              th: ["bg-foreground-800", "text-foreground", "font-bold"],
            }}
          >
            <TableHeader>
              <TableColumn>ALMACÉN</TableColumn>
              <TableColumn>UNIDAD</TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>UMBRAL</TableColumn>
              <TableColumn>ACCIONES</TableColumn>
            </TableHeader>
            <TableBody>
              {productWarehouses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No hay existencias agregadas
                  </TableCell>
                </TableRow>
              ) : (
                productWarehouses.map((warehouse, index) => {
                  const warehouseName =
                    config.warehouses.find(
                      (w) => w.id === Number(warehouse.warehouse_id),
                    )?.name || "Desconocido";
                  const unitName =
                    config.units.find((u) => u.id === Number(warehouse.unit_id))
                      ?.name || "Desconocido";
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex gap-1 items-center">
                          <Tooltip
                            closeDelay={0}
                            color="danger"
                            content="Error en la "
                          >
                            <AlertCircleIcon className="text-danger" />
                          </Tooltip>
                          {warehouseName}
                        </div>
                      </TableCell>
                      <TableCell>{unitName}</TableCell>
                      <TableCell>{warehouse.stock ?? 0}</TableCell>
                      <TableCell>{warehouse.threshold ?? 0}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          startContent={<Delete01Icon />}
                          variant="light"
                          color="danger"
                          size="sm"
                          radius="full"
                          onPress={() => removeWarehouse(index)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};
