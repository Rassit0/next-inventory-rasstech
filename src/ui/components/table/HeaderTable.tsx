"use client";
import { Input } from "@heroui/react";
import { Search01Icon } from "hugeicons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  totalItems: number;
  take: string;
  componentsExtra?: React.ReactNode;
  buttonAdd?: React.ReactNode;
  nameItems?: string;
}

export const HeaderTable = ({
  totalItems,
  take,
  componentsExtra,
  buttonAdd,
  nameItems,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchParam, setSearchParam] = useState(
    searchParams.get("search") || "",
  );
  // const [perPage, setPerPage] = useState(searchParams.get('per_page') || '');

  const changeSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("search", search);
    setSearchParam(search);

    router.push(`${pathname}?${params.toString()}`);
  };

  const changePerPage = (perPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    // si no es ninguna de las condiciones
    params.set("per_page", perPage);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setSearchParam(searchParams.get("search") || "");
  }, [searchParams])
  

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
        <div className={clsx("flex-1", {
            "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2": componentsExtra,
        })}>
          <Input
            isClearable
            className={componentsExtra ? "md:col-span-2" : "w-full md:max-w-[90%] lg:max-w-[70%]"}
            classNames={{
              base: "w-full",
              inputWrapper:
                "border-2 border-foreground-300 text-default-foreground bg-transparent w-full",
            }}
            placeholder="Buscar..."
            //   size="sm"
            startContent={<Search01Icon className="text-foreground" />}
            value={searchParam}
            onValueChange={(v) => changeSearch(v)}
          />
          {componentsExtra && <>{componentsExtra}</>}
        </div>
        {buttonAdd && <div className="shrink-0">{buttonAdd}</div>}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {totalItems} {nameItems || "items"}
        </span>
        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
            onChange={(e) => changePerPage(e.target.value)}
            value={take}
            // defaultValue={take}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};
