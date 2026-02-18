export interface UnitsResponse {
    units: Unit[];
    total: number,
    current_page: number,
    per_page: number,
    last_page: number,
}

export interface Unit {
    id: number;
    name: string;
    description: string;
    state: number;
    created_at: Date;
}

export interface Parent {
    id: number;
    name: string;
}

export interface UnitsConfigResponse {
    units: UnitConfig[];
}

export interface UnitConfig {
    id: number;
    name: string;
}

