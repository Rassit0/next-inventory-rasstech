import { titleFont } from "@/config/fonts/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const PageHeader = ({ title, subtitle, className }: Props) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <h1 className={`text-3xl font-semibold`}>{title}</h1>
            {
                subtitle && (
                    <h3 className="text-lg mb-5">{subtitle}</h3>
                )
            }
        </div>
    )
}
