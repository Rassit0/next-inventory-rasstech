"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { ArrowDown01Icon, Search01Icon } from "hugeicons-react";
import { CategoriesConfigResponse } from "@/modules/admin/categories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UsersConfigResponse } from "@/modules/admin/users";
import { config } from "../../../../../../proxy";

const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Inactivo", uid: "inactive" },
  // { name: "Vacation", uid: "vacation" },
];

interface Props {
  config: UsersConfigResponse;
}

export const Filters = ({ config }: Props) => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRole = searchParams.get("role_id") || "";

  useEffect(() => {
    if (!config.roles.find((r) => r.id === Number(currentRole))) {
      const params = new URLSearchParams(searchParams);
      params.delete("role_id");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []);

  const changeRole = (role: number) => {
    const params = new URLSearchParams(searchParams);

    // si no es ninguna de las condiciones
    params.set("role_id", role.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
          <Button
            endContent={<ArrowDown01Icon className="text-small" />}
            // size="sm"
            variant="flat"
            color="default"
          >
            {config.roles.find((r) => r.id === Number(currentRole))?.name ||
              "Rol"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Table Columns"
          closeOnSelect={false}
          selectedKeys={[currentRole]}
          selectionMode="multiple"
          onSelectionChange={(value) => {
            if (value.currentKey) {
              changeRole(Number(value.currentKey));
            } else {
              const params = new URLSearchParams(searchParams);
              params.delete("role_id");
              router.replace(`${pathname}?${params.toString()}`);
            }
          }}
        >
          {config.roles.map((role) => (
            <DropdownItem key={role.id} className="capitalize">
              {role.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};
