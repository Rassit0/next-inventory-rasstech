"use client";

import Image from "next/image";

interface AvatarItemProps {
  radius?: "sm" | "md" | "lg" | "xl" | "full";
  title: string;
  image?: string | null;
  size?: number; // tamaño (ancho/alto)
  className?: string;
  onClick?: () => void;
}

export const AvatarItem = ({
  title,
  image,
  size = 40,
  className = "",
  onClick,
  radius = "md",
}: AvatarItemProps) => {
  // Obtener iniciales
  const getInitials = (str: string) => {
    const words = str.trim().split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(title);

  // Si tiene imagen → mostrar imagen
  if (image) {
    return (
      <div
        onClick={onClick}
        className={`relative rounded-${radius} overflow-hidden bg-transparent ${className} shrink-0 ${onClick ? "cursor-pointer" : ""}`}
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
        }}
      >
        <Image
          src={image}
          alt={title}
          width={size}
          height={size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  // Si NO tiene imagen → mostrar avatar con iniciales
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-center
        rounded-full 
        valery-dark:bg-primary-300 valery-dark:text-primary-foreground
        valery-light:bg-primary-500 valery-light:text-primary-foreground
        font-semibold
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
};
