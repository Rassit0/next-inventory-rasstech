import { ConfigTheme } from "@heroui/react";

export const valeryLight: ConfigTheme = {
    extend: 'light',
    layout: {
        radius: {
            small: '4px',
            medium: '6px',
            large: '8px',
        },
        borderWidth: {
            small: '1px',
            medium: '2px',
            large: '3px',
        },
        disabledOpacity: 0.5,
        dividerWeight: '1px',
        fontSize: {
            tiny: '0.75rem',
            small: '0.875rem',
            medium: '1rem',
            large: '1.125rem',
        },
        lineHeight: {
            tiny: '1rem',
            small: '1.25rem',
            medium: '1.5rem',
            large: '1.75rem',
        },
    },
    colors: {
        background: '#f8f8f8f4',
        foreground: {
            DEFAULT: '#242b46',  // texto principal (oscuro)
            '50': '#1d1f2f',    // el más oscuro, perfecto para títulos
            '100': '#2c324e',
            '200': '#3b4360',
            '300': '#545d7a',
            '400': '#6f798f',
            '500': '#8c95a4',
            '600': '#a9afbb',
            '700': '#c6c9d3',
            '800': '#e2e4eb',
            '900': '#f5f6fa',    // muy claro
        },
        default: {
            DEFAULT: '#e4e4e7',
            foreground: '#1f2937', // ✔ correcto (oscuro)
            '50': '#fcfcfd',
            '100': '#f9f9fa',
            '200': '#f0f0f2',
            '300': '#e4e4e7',
            '400': '#c7c7cc',
            '500': '#9c9ca4',
            '600': '#71717a',
            '700': '#52525b',
            '800': '#3f3f46',
            '900': '#27272a',
        },
        primary: {
            foreground: '#f8fafc', // ✔ perfecto
            DEFAULT: '#035AA6',
            '50': '#f0f7ff',
            '100': '#e0effe',
            '200': '#badffd',
            '300': '#7dc5fc',
            '400': '#38a8f8',
            '500': '#0e8de9',
            '600': '#026ec7',
            '700': '#074b85',
            '800': '#0c3f6e',
            '900': '#082849',
        },
        secondary: {
            foreground: '#1f2937', // ✔ mejor contraste que antes
            DEFAULT: '#F49401',
            '50': '#fffbea',
            '100': '#fff3c5',
            '200': '#ffe686',
            '300': '#ffd346',
            '400': '#ffbe1c',
            '500': '#e17300',
            '600': '#bb4e02',
            '700': '#973c09',
            '800': '#7c310b',
            '900': '#481700',
        },
        success: {
            foreground: '#f8fafc', // ✔ ideal
            DEFAULT: '#17c964',
            '50': '#f0fdf4',
            '100': '#dcfce7',
            '200': '#bbf7d0',
            '300': '#86efac',
            '400': '#4ade80',
            '500': '#22c55e',
            '600': '#16a34a',
            '700': '#15803d',
            '800': '#166534',
            '900': '#14532d',
        },
        warning: {
            foreground: '#1f2937', // ✔ mejor que #0f172a (muy negro)
            DEFAULT: '#f5a524',
            '50': '#fffbeb',
            '100': '#fef3c7',
            '200': '#fde68a',
            '300': '#fcd34d',
            '400': '#fbbf24',
            '500': '#f59e0b',
            '600': '#d97706',
            '700': '#b45309',
            '800': '#92400e',
            '900': '#78350f',
        },
        danger: {
            foreground: '#f8fafc', // ✔ correcto
            DEFAULT: '#f31260',
            '50': '#fff1f2',
            '100': '#ffe4e6',
            '200': '#fecdd3',
            '300': '#fda4af',
            '400': '#fb7185',
            '500': '#f43f5e',
            '600': '#e11d48',
            '700': '#be123c',
            '800': '#9f1239',
            '900': '#881337',
        },
    }
};

export const valeryDark: ConfigTheme = {
    extend: 'dark',
    layout: {
        radius: {
            small: '4px',
            medium: '6px',
            large: '8px',
        },
        borderWidth: {
            small: '1px',
            medium: '2px',
            large: '3px',
        },
        disabledOpacity: 0.5,
        dividerWeight: '1px',
        fontSize: {
            tiny: '0.75rem',
            small: '0.875rem',
            medium: '1rem',
            large: '1.125rem',
        },
        lineHeight: {
            tiny: '1rem',
            small: '1.25rem',
            medium: '1.5rem',
            large: '1.75rem',
        },
    },
    colors: {
        background: '#1d1f2f04',
        foreground: {
            DEFAULT: '#f5f6fa',  // color principal claro y limpio
            '50': '#ffffff',     // casi blanco para elementos destacados
            '100': '#f5f6fa',    // ligeros textos o íconos
            '200': '#e2e4eb',    // texto secundario
            '300': '#c6c9d3',    // labels, hints
            '400': '#a9afbb',    // deshabilitado o muted
            '500': '#8c95a4',    // borde sutil
            '600': '#6f798f',    // texto más oscuro
            '700': '#545d7a',    // texto principal en hover o activo
            '800': '#3b4360',    // títulos secundarios
            '900': '#242b46',    // títulos o texto importante
        },
        default: {
            DEFAULT: "#a1a1aa",
            // foreground: "#0f172a",     // gris medio = texto oscuro
            foreground: "#f4f4f5",     // gris medio = texto oscuro
            "50": "#27272a",           // oscuro → blanco
            "100": "#3f3f46",          // oscuro → blanco
            "200": "#52525b",          // oscuro → blanco
            "300": "#71717a",          // medio → oscuro
            "400": "#a1a1aa",          // medio/alto → oscuro
            "500": "#d4d4d8",          // claro → oscuro
            "600": "#e4e4e7",          // claro → oscuro
            "700": "#f4f4f5",          // muy claro → oscuro
            "800": "#fafafa",          // muy claro → oscuro
            "900": "#ffffff",          // blanco → oscuro
        },
        primary: {
            DEFAULT: "#38a8f8",
            foreground: "#ffffff",      // color saturado → blanco
            "50": "#082849",            // oscuro → blanco
            "100": "#0c3f6e",           // oscuro → blanco
            "200": "#074b85",           // oscuro → blanco
            "300": "#026ec7",           // medio oscuro → blanco
            "400": "#0e8de9",           // medio → blanco
            "500": "#38a8f8",           // brillante → blanco
            "600": "#7dc5fc",           // claro → oscuro
            "700": "#badffd",           // muy claro → oscuro
            "800": "#e0effe",           // muy claro → oscuro
            "900": "#f0f7ff",           // muy claro → oscuro
        },
        secondary: {
            DEFAULT: "#ffbe1c",
            foreground: "#0f172a",      // amarillo claro → oscuro
            "50": "#481700",            // muy oscuro → blanco
            "100": "#7c310b",           // oscuro → blanco
            "200": "#973c09",           // oscuro → blanco
            "300": "#bb4e02",           // medio oscuro → blanco
            "400": "#e17300",           // medio → blanco
            "500": "#ffbe1c",           // claro → oscuro
            "600": "#ffd346",           // claro → oscuro
            "700": "#ffe686",           // muy claro → oscuro
            "800": "#fff3c5",           // muy claro → oscuro
            "900": "#fffbea",           // muy claro → oscuro
        },
        success: {
            DEFAULT: "#4ade80",
            foreground: "#0f172a",      // verde claro → oscuro
            "50": "#14532d",            // oscuro → blanco
            "100": "#166534",           // oscuro → blanco
            "200": "#15803d",           // oscuro → blanco
            "300": "#16a34a",           // medio → blanco
            "400": "#22c55e",           // medio → blanco
            "500": "#4ade80",           // claro → oscuro
            "600": "#86efac",           // claro → oscuro
            "700": "#bbf7d0",           // muy claro → oscuro
            "800": "#dcfce7",           // muy claro → oscuro
            "900": "#f0fdf4",           // muy claro → oscuro
        },
        warning: {
            DEFAULT: "#fbbf24",
            foreground: "#0f172a",      // amarillo claro → oscuro
            "50": "#78350f",            // oscuro → blanco
            "100": "#92400e",           // oscuro → blanco
            "200": "#b45309",           // oscuro → blanco
            "300": "#d97706",           // medio oscuro → blanco
            "400": "#f59e0b",           // medio → blanco
            "500": "#fbbf24",           // claro → oscuro
            "600": "#fcd34d",           // claro → oscuro
            "700": "#fde68a",           // muy claro → oscuro
            "800": "#fef3c7",           // muy claro → oscuro
            "900": "#fffbeb",           // muy claro → oscuro
        },
        danger: {
            DEFAULT: "#fb7185",
            foreground: "#ffffff",      // rojo saturado → blanco
            "50": "#881337",            // muy oscuro → blanco
            "100": "#9f1239",           // oscuro → blanco
            "200": "#be123c",           // oscuro → blanco
            "300": "#e11d48",           // medio oscuro → blanco
            "400": "#f43f5e",           // medio → blanco
            "500": "#fb7185",           // saturado → blanco
            "600": "#fda4af",           // claro → oscuro
            "700": "#fecdd3",           // muy claro → oscuro
            "800": "#ffe4e6",           // muy claro → oscuro
            "900": "#fff1f2",           // muy claro → oscuro
        },
    }
};

// Exportar el tema light como default para compatibilidad
export const valery = valeryLight;