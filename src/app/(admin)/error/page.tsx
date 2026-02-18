"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { titleFont } from "@/config/fonts/fonts";
import Image from "next/image";
import Link from "next/link";

type ErrorType = {
  status: string;
  title: string;
  description: string;
};

const errorMessages: Record<string, ErrorType> = {
  "403": {
    status: "403",
    title: "Acceso denegado",
    description: "No tienes permisos para acceder a este recurso.",
  },
  "404": {
    status: "404",
    title: "Página no encontrada",
    description: "La página que estás buscando no existe o ha sido movida.",
  },
  "500": {
    status: "500",
    title: "Error del servidor",
    description:
      "Algo salió mal en nuestro servidor. Por favor, inténtalo de nuevo más tarde.",
  },
  default: {
    status: "Error",
    title: "Algo salió mal",
    description: "Ha ocurrido un error inesperado.",
  },
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get("status") || "default";
  const customMessage = searchParams.get("message");

  const error =
    errorMessages[status as keyof typeof errorMessages] ||
    errorMessages["default"];

  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>
          {error.status}
        </h2>
        <p className="font-semibold text-2xl mt-4">{error.title}</p>
        <p className="font-light text-lg my-4">
          {customMessage || error.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Volver atrás
          </button>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
          >
            Ir al inicio
          </Link>
        </div>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/images/not-found/starman_750x750.png"
          alt="Error"
          className="p-5 sm:p-0"
          width={450}
          height={450}
        />
      </div>
    </div>
  );
}
