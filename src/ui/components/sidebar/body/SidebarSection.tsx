import clsx from "clsx";
import { SidebarItem } from "./SidebarItem";
import { NavSection } from "@/ui";
import { useSession } from "next-auth/react";

interface Props {
  section: NavSection;
  isSidebarOpen: boolean;
  hoverSidebar: boolean;
}

export const SidebarSection = ({
  section,
  isSidebarOpen,
  hoverSidebar,
}: Props) => {
  const { data: session, status, update } = useSession();

  return (
    <div className={`space-y-2 `}>
      {/* Título */}
      {section.title && (
        <div
          className="
                relative 
                flex items-center justify-center 
                font-semibold text-foreground-400
                transition-all duration-500 h-5"
        >
          <span
            className={clsx(
              `ml-5 absolute inset-0 flex items-center justify-start transition-opacity duration-200`,
              {
                "opacity-100": isSidebarOpen,
                "opacity-0 group-hover:opacity-100": !isSidebarOpen,
              },
            )}
          >
            {section.title}
          </span>
          <span
            className={clsx(
              `ml-5 absolute inset-0 flex items-center justify-start pr-2 transition-opacity duration-200`,
              {
                "opacity-0": isSidebarOpen,
                "opacity-100 group-hover:opacity-0": !isSidebarOpen,
              },
            )}
          >
            ...
          </span>
        </div>
      )}

      <div
        className={clsx(`transition-[padding] duration-300 space-y-2`, {
          "pl-6": isSidebarOpen,
          "pl-6 md:pl-2 group-hover:pl-6": !isSidebarOpen,
        })}
      >
        {/* Items */}
        {section.items.map((item) => {
          if (
            session?.user.role.permissions.some((p) => item.action === p) ||
            session?.user.role.name === "Super-Admin"
          ) {
            return (
              <SidebarItem
                key={item.label}
                item={item}
                isSidebarOpen={isSidebarOpen}
                hoverSidebar={hoverSidebar}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
