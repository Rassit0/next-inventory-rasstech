import { SidebarSection } from "./SidebarSection";
import { sidebarNavigation } from "@/config/navigation";

interface Props {
  isSidebarOpen: boolean;
  hoverSidebar: boolean;
}

export const SidebarSections = ({ isSidebarOpen, hoverSidebar }: Props) => {
  const sections = sidebarNavigation;

  return (
    <div className={`pb-2 space-y-2`}>
      {sections.map((section, index) => (
        <SidebarSection
          key={index}
          section={section}
          isSidebarOpen={isSidebarOpen}
          hoverSidebar={hoverSidebar}
        />
      ))}
    </div>
  );
};
