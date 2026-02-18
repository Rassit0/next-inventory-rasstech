"use client";

import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { GroupUsers } from "./GroupUsers";
import { Delete02Icon, EyeIcon } from "hugeicons-react";
import { DeleteModal, EditModal } from "@/modules/admin/roles";
import { Role } from "@/modules/admin/roles";
import { useSession } from "next-auth/react";

interface Props {
  role: Role;
}

export const CardItem = ({ role }: Props) => {
  const { data } = useSession();

  return (
    <Card className="min-w-fit max-h-[140px] bg-foreground-900">
      <CardHeader className="flex justify-between items-center">
        <span className="text-foreground">
          Total {role.users.length} usuarios
        </span>
        <GroupUsers users={role.users} />
      </CardHeader>
      <CardBody className="flex flex-row justify-between items-center min-w-fit min-h-fit">
        <div>
          <span className="font-bold text-lg text-foreground">{role.name}</span>
          {role.description && (
            <p className="text-sm text-foreground-400">{role.description}</p>
          )}
        </div>

        <div className="flex">
          <Button radius="full" variant="light" color="primary" isIconOnly>
            <EyeIcon />
          </Button>
          {(data?.user.role.permissions.some((r) => r === "edit_role") ||
            data?.user.role.name === "Super-Admin") && (
            <EditModal role={role} />
          )}
          {(data?.user.role.permissions.some((r) => r === "delete_role") ||
            data?.user.role.name === "Super-Admin") && (
            <DeleteModal role={role} />
          )}
        </div>
      </CardBody>
    </Card>
  );
};
