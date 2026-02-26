"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ArrowDown01Icon } from "hugeicons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DownloadExcel,
  ImportExcelModal,
  ProductConfig,
} from "@/modules/admin/products";
import { VscDebugRestart } from "react-icons/vsc";
import { useEffect, useState } from "react";

const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Inactivo", uid: "inactive" },
  // { name: "Vacation", uid: "vacation" },
];

interface Props {
  config: ProductConfig;
}

export const Filters = ({ config }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categoryId, setCategoryId] = useState(
    searchParams.get("category_id") || "",
  );
  const [branchId, setBranchId] = useState(searchParams.get("branch_id") || "");
  const [warehouseId, setWarehouseId] = useState(
    searchParams.get("warehouse_id") || "",
  );
  const [allowWithoutStock, setAllowWithoutStock] = useState(
    searchParams.get("allow_without_stock") || "",
  );
  const [isGift, setIsGift] = useState(searchParams.get("is_gift") || "");
  const [state, setState] = useState(searchParams.get("state") || "");

  // useEffect(() => {
  //     changePerPage(take);
  //     console.log({ take })
  // }, [take])

  const changeCategoryId = (categoryId?: string | number) => {
    const params = new URLSearchParams(searchParams);
    const id = categoryId?.toString();
    if (id) {
      params.set("category_id", id);
    } else {
      params.delete("category_id");
    }
    setCategoryId(id || "");
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeBranchId = (branchId?: string | number) => {
    const params = new URLSearchParams(searchParams);
    const id = branchId?.toString();
    if (id) {
      params.set("branch_id", id);
    } else {
      params.delete("branch_id");
    }
    setBranchId(id || "");
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeWarehouseId = (warehouseId?: string | number) => {
    const params = new URLSearchParams(searchParams);
    const id = warehouseId?.toString();
    if (id) {
      params.set("warehouse_id", id);
    } else {
      params.delete("warehouse_id");
    }
    setWarehouseId(id || "");
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeAllowWithoutStock = (allowWithoutStock?: string | number) => {
    const params = new URLSearchParams(searchParams);
    const id = allowWithoutStock?.toString();
    if (id) {
      params.set("allow_without_stock", id);
    } else {
      params.delete("allow_without_stock");
    }
    setAllowWithoutStock(id || "");
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeIsGift = (isGift?: string | number) => {
    const params = new URLSearchParams(searchParams);
    const id = isGift?.toString();
    if (id) {
      params.set("is_gift", id);
    } else {
      params.delete("is_gift");
    }
    setIsGift(id || "");
    router.push(`${pathname}?${params.toString()}`);
  };

  const changeState = (state?: string | number) => {
    const params = new URLSearchParams(searchParams);
    const value = state?.toString();
    if (value) {
      params.set("state", value);
    } else {
      params.delete("state");
    }
    setState(value || "");
    router.push(`${pathname}?${params.toString()}`);
  };

  const restart = async () => {
    router.push(`${pathname}`);
  };

  useEffect(() => {
    setCategoryId(searchParams.get("category_id") || "");
    setBranchId(searchParams.get("branch_id") || "");
    setWarehouseId(searchParams.get("warehouse_id") || "");
    setAllowWithoutStock(searchParams.get("allow_without_stock") || "");
    setIsGift(searchParams.get("is_gift") || "");
  }, [searchParams]);

  return (
    <>
      {/* Categorias */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
            {categoryId
              ? config.categories.find(
                  (category) => category.id === Number(categoryId),
                )?.name
              : "Categoría"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Categories"
          closeOnSelect={false}
          selectedKeys={categoryId ? [categoryId] : []}
          selectionMode="single"
          onSelectionChange={(keys) =>
            changeCategoryId(Array.from(keys)[0] || "")
          }
        >
          {config.categories.map((category) => (
            <DropdownItem key={category.id} className="capitalize">
              {category.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {/* Almacenes */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
            {branchId
              ? config.branches.find((branch) => branch.id === Number(branchId))
                  ?.name
              : "Sucursal"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Branches"
          closeOnSelect={false}
          selectedKeys={branchId ? [branchId] : []}
          selectionMode="single"
          onSelectionChange={(keys) =>
            changeBranchId(Array.from(keys)[0] || "")
          }
        >
          {config.branches.map((branch) => (
            <DropdownItem key={branch.id} className="capitalize">
              {branch.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Sucursales */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
            {warehouseId
              ? config.warehouses.find(
                  (warehouse) => warehouse.id === Number(warehouseId),
                )?.name
              : "Almacén"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Branches"
          closeOnSelect={false}
          selectedKeys={warehouseId ? [warehouseId] : []}
          selectionMode="single"
          onSelectionChange={(keys) =>
            changeWarehouseId(Array.from(keys)[0] || "")
          }
        >
          {config.warehouses.map((warehouse) => (
            <DropdownItem key={warehouse.id} className="capitalize">
              {warehouse.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {/* Disponibilidad */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
            {allowWithoutStock
              ? allowWithoutStock === "1"
                ? "Permitir sin stock"
                : "No permitir sin stock"
              : "Disponibilidad"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Branches"
          closeOnSelect={false}
          selectedKeys={allowWithoutStock ? [allowWithoutStock] : []}
          selectionMode="single"
          onSelectionChange={(keys) =>
            changeAllowWithoutStock(Array.from(keys)[0] || "")
          }
        >
          <DropdownItem key={1} className="capitalize">
            Permitir sin stock
          </DropdownItem>
          <DropdownItem key={0} className="capitalize">
            No permitir sin stock
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* ¿Regalo? */}
      <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
            {isGift
              ? isGift === "1"
                ? "Es regalo"
                : "No es regalo"
              : "Disponibilidad"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Is_gift"
          closeOnSelect={false}
          selectedKeys={isGift ? [isGift] : []}
          selectionMode="single"
          onSelectionChange={(keys) => changeIsGift(Array.from(keys)[0] || "")}
        >
          <DropdownItem key={1} className="capitalize">
            Es regalo
          </DropdownItem>
          <DropdownItem key={0} className="capitalize">
            No es regalo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Estado */}
     <Dropdown>
        <DropdownTrigger>
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
             {state
              ? state === "1"
                ? "Activo"
                : "Inactivo"
              : "Disponibilidad"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="State"
          closeOnSelect={false}
          selectedKeys={state ? [state] : []}
          selectionMode="single"
          onSelectionChange={(keys) => changeState(Array.from(keys)[0] || "")}
        >
          <DropdownItem key={1} className="capitalize">
            Activo
          </DropdownItem>
          <DropdownItem key={0} className="capitalize">
            Inactivo
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button onPress={restart}>
        <VscDebugRestart size={25} />
      </Button>
      <ImportExcelModal />
      <DownloadExcel />
    </>
  );
};
