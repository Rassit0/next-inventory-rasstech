"use client";
import { addToast, Button } from "@heroui/react";
import { FaRegFileExcel } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const DownloadExcel = () => {
  const { data: session, status, update } = useSession();

  const searchParams = useSearchParams();

  const handleDownloadExcel = async () => {
    await update();

    if (!session?.access_token) {
      alert("Sesión no válida. Por favor, inicia sesión nuevamente.");
      return;
    }

    // params
    const params = new URLSearchParams();
    if (searchParams.get("search"))
      params.set("search", searchParams.get("search")!);
    if (searchParams.get("category_id"))
      params.set("category_id", searchParams.get("category_id")!);
    if (searchParams.get("warehouse_id")!)
      params.set("warehouse_id", searchParams.get("warehouse_id")!);
    if (searchParams.get("branch_id"))
      params.set("branch_id", searchParams.get("branch_id")!);
    if (searchParams.get("allow_without_stock"))
      params.set(
        "allow_without_stock",
        searchParams.get("allow_without_stock")!,
      );
    if (searchParams.get("is_gift"))
      params.set("is_gift", searchParams.get("is_gift")!);
    if (searchParams.get("state"))
      params.set("state", searchParams.get("state")!);

    try {
      const response = await fetch(
        `${API_URL}products-excel/export?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "products.xlsx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Excel:", error);
      addToast({
        title: "Error al descargar",
        description: "Error al descargar el Excel. Inténtalo de nuevo.",
        color: "danger",
        timeout: 2000,
        variant: "bordered",
        shouldShowTimeoutProgress: true,
      });
      // alert("Error al descargar el Excel. Inténtalo de nuevo.");
    }
  };

  return (
    <Button
      className="text-foreground"
      // onPress={onOpen}
      color="success"
      variant="solid"
      startContent={<FaRegFileExcel size={25} />}
      onPress={handleDownloadExcel}
    >
      Exportar
    </Button>
  );
};
