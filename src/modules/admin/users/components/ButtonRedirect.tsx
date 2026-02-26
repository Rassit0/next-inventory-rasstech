"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface Props {
  href: string;
  text: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}
export const ButtonRedirect = ({ href, text, color }: Props) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(href);
  };
  return (
    <Button onPress={handleRedirect} color={color} size="sm">
      {text}
    </Button>
  );
};
