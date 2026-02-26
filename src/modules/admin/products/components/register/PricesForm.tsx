"use client";
import { ProductConfig } from "@/modules/admin/products";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
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
import { AlertCircleIcon, Delete01Icon } from "hugeicons-react";

interface ProductWallet {
  branch_id: string;
  unit_id: string;
  type_client: "general" | "company";
  price: number;
}

interface Props {
  config: ProductConfig;
  productWallets: ProductWallet[];
  setProductWallets: (wallets: ProductWallet[]) => void;
  error?: string;
}
export const PricesForm = ({
  config,
  productWallets,
  setProductWallets,
  error,
}: Props) => {
  const [branchId, setBranchId] = useState<string>("");
  const [unitId, setUnitId] = useState<string>("");
  const [typeClient, setTypeClient] = useState<"general" | "company">(
    "general",
  );
  const [price, setPrice] = useState<string>("");

  const [errors, setErrors] = useState<string[]>(error ? [error] : []);
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  const addWallet = () => {
    const errorsValidations: string[] = [];
    if (!branchId) errorsValidations.push("La Sucursal es requerida");
    if (errorsValidations.length > 0) {
      setErrors(errorsValidations);
      setIsVisibleAlert(true);
    }
    if (!branchId || !unitId || !price) return;

    const newWallet: ProductWallet = {
      branch_id: branchId,
      unit_id: unitId,
      type_client: typeClient,
      price: parseFloat(price),
    };

    setProductWallets([...productWallets, newWallet]);

    // Reset local state
    setBranchId("");
    setUnitId("");
    setTypeClient("general");
    setPrice("");
  };

  const removeWallet = (index: number) => {
    setProductWallets(productWallets.filter((_, i) => i !== index));
  };
  return (
    <Card className="min-w-fit max-h-fit bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground text-2xl">Multiples Precios</span>
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
              label="Sucursales"
              variant="bordered"
              selectedKeys={branchId ? [branchId] : []}
              onChange={(e) => setBranchId(e.target.value)}
            >
              {config.branches.map((branch) => (
                <SelectItem key={branch.id}>{branch.name}</SelectItem>
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

            <Select
              className="col-span-2"
              
              radius="lg"
              label="Tipo Cliente"
              variant="bordered"
              selectedKeys={[typeClient]}
              onChange={(e) =>
                setTypeClient(e.target.value as "general" | "company")
              }
            >
              <SelectItem key="general">General</SelectItem>
              <SelectItem key="company">Empresa</SelectItem>
            </Select>

            <Input
              className="col-span-2"
              radius="lg"
              label="Precio"
              placeholder="Ingrese el precio"
              type="number"
              step="0.01"
              variant="bordered"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button className="col-span-2" color="primary" onPress={addWallet}>
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
              <TableColumn>SUCURSAL</TableColumn>
              <TableColumn>UNIDAD</TableColumn>
              <TableColumn>TIPO CLIENTE</TableColumn>
              <TableColumn>PRECIO</TableColumn>
              <TableColumn>ACCIONES</TableColumn>
            </TableHeader>
            <TableBody>
              {productWallets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No hay precios agregados
                  </TableCell>
                </TableRow>
              ) : (
                productWallets.map((wallet, index) => {
                  const branchName =
                    config.branches.find(
                      (b) => b.id === Number(wallet.branch_id),
                    )?.name || "Desconocido";
                  const unitName =
                    config.units.find((u) => u.id === Number(wallet.unit_id))
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
                          {branchName}
                        </div>
                      </TableCell>
                      <TableCell>{unitName}</TableCell>
                      <TableCell>
                        {wallet.type_client === "general"
                          ? "General"
                          : "Empresa"}
                      </TableCell>
                      <TableCell>{wallet.price}</TableCell>
                      <TableCell>
                        <Button
                          isIconOnly
                          startContent={<Delete01Icon />}
                          variant="light"
                          color="danger"
                          size="sm"
                          radius="full"
                          onPress={() => removeWallet(index)}
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
