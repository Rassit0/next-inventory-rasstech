"use server";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

interface ApiFetchOptions {
  endpoint: string;
  options?: RequestInit;
}

export async function apiFetch<T>({
  endpoint,
  options,
}: ApiFetchOptions): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      // "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
    ...options,
  });

  console.log({ res });
  if (res.status === 401) {
    // Token inválido o expirado
    throw {
      statusCode: 401,
      message: "Token inválido o expirado",
    };
  }

  if (res.status === 403) {
    // Token inválido o expirado
    throw {
      statusCode: 403,
      message: "Acceso denegado",
    };
  }

  if (!res.ok) {
    if (res.status === 409) {
      try {
        const errorData = await res.json();
        // Si la API devuelve un JSON con detalles del error
        throw {
          statusCode: 409,
          message: errorData.message || "",
        };
      } catch (e) {
        if (e && typeof e === "object" && "message" in e) {
          throw e;
        }
        // Si la respuesta no es JSON (ruta no existe)
        throw new Error(`[${endpoint} - Error ${res.status}: Conflict`);
      }
    }
    if (res.status === 422) {
      const errorData = await res.json();
      throw {
        statusCode: 422,
        message: "Validation Error",
        errors: errorData.errors || [],
        total_errors: errorData.total_errors,
        remaining_errors: errorData.remaining_errors,
      };
    }

    // Manejar error 404
    if (res.status === 404) {
      try {
        const errorData = await res.json();
        // Si la API devuelve un JSON con detalles del error
        throw {
          statusCode: 404,
          message: errorData.message || "Recurso no encontrado",
          error: errorData.error || "Not Found",
        };
      } catch (e) {
        if (e && typeof e === "object" && "message" in e && "error" in e) {
          throw e;
        }
        // Si la respuesta no es JSON (ruta no existe)
        throw new Error(
          `[${options?.method || "GET"}] ${endpoint} - Error ${res.status}: Route Not Found`,
        );
      }
    }

    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
