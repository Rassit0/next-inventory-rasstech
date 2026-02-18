import { PageHeader } from "@/ui";
import { redirect } from "next/navigation";

export default function Home() {
    redirect('/dashboard')
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}