
import { NavSection } from '@/ui';
import { SidebarSection } from './SidebarSection';

interface Props {
    sections: NavSection[];
    isSidebarOpen: boolean;
    hoverSidebar: boolean;
}

export const SidebarSections = ({ sections, isSidebarOpen, hoverSidebar }: Props) => {

    return (
        <div className={`pb-2 space-y-4`}>
            {sections.map((section, index) => (
                <SidebarSection key={index} section={section} isSidebarOpen={isSidebarOpen} hoverSidebar={hoverSidebar} />
            ))}
        </div>
    )
}
