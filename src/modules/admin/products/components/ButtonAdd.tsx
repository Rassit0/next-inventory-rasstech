"use client";
import { Button } from "@heroui/react";
import { Add01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";

export const ButtonAdd = () => {
  const router = useRouter();
  return (
    <Button color="primary" variant="flat"
    onPress={()=>router.push('/products/add')}
    endContent={<Add01Icon />}>
      Agregar producto
    </Button>
  );
};
