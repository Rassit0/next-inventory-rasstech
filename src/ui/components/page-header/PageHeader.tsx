import { titleFont } from "@/config/fonts/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const PageHeader = ({ title, subtitle, className }: Props) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <h1 className={`${titleFont.className} text-3xl font-semibold`}>{title}</h1>
            {
                subtitle && (
                    <h3 className="text-lg ml-3 text-foreground-400">{subtitle}</h3>
                )
            }
        </div>
    )
}
