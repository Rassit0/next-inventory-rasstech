"use server";

import { apiFetch } from "@/shared/utils";
import { revalidatePath, revalidateTag } from "next/cache";
import { Unit, UnitConversion } from "@/modules/admin/units";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  data: {
    unit_id: number;
    unit_to_id: number;
  };
  callbackUrl?: string;
}

interface Response {
  error: boolean;
  message: string;
  conversion?: UnitConversion;
  errors?: {
    [key: string]: string[]; // Permite cualquier clave de tipo string con un array de strings como valor
  };
}

export const addConversion = async ({
  data,
  callbackUrl = "/units",
}: Props): Promise<Response> => {
  const params = new URLSearchParams();
  params.set("callbackUrl", callbackUrl);

  const session = await auth();
  if (!session?.access_token) {
    redirect(`/login?${params.toString()}`);
  }
  try {
    const resp = await apiFetch<{
      message: string;
      unit_conversion: UnitConversion;
    }>({
      endpoint: `unit-conversions`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      },
    });

    const respFormated = {
      ...resp,
      conversion: {
        ...resp.unit_conversion,
        created_at: new Date(resp.unit_conversion.created_at),
      },
    };

    revalidatePath("/units");
    return {
      error: false,
      message: resp.message,
      conversion: respFormated.conversion,
    };
  } catch (error: any) {
    console.error("Error en addUnit:", error); // Depuración
    if (error.statusCode === 401) {
      redirect(`/login?${params.toString()}`);
    }
    return {
      error: true,
      message: error.message || "Error al editar la unidad",
      errors: error.errors ?? undefined,
    };
    // throw new Error(error instanceof Error ? error.message : 'Error al editar el rol');
  }
};
