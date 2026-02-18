
import { appFont } from "@/config/fonts/fonts";
import { Navbar, Sidebar } from "@/ui";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex flex-col h-screen bg-background">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-4">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}