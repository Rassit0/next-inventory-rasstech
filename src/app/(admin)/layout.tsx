
import { appFont } from "@/config/fonts/fonts";
import { Navbar, Sidebar } from "@/ui";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {


    return (
        <div className={`bg-background w-screen h-screen`}>

            <div className="flex h-full">

                {/* Wrapper que anima altura (rápido) */}
                <Sidebar />

                <div className={`flex-1 w-full h-full`}>
                    {/* <nav className="flex flex-row bg-background border-b border-gray-300 h-12"> */}
                    <Navbar />

                    {/* pagina */}
                    <div className="p-4 overflow-y-auto w-full h-[calc(100vh-4rem)]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}