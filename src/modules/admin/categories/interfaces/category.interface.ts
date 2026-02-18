export interface CategoriesResponse {
    categories: Category[];
    total: number,
    current_page: number,
    per_page: number,
    last_page: number,
}

export interface Category {
    id: number;
    name: string;
    image: null | string;
    state: number;
    parent_id: number | null;
    parent: Parent | null;
    created_at: Date;
}

export interface Parent {
    id: number;
    name: string;
}

export interface CategoriesConfigResponse {
    categories: CategoryConfig[];
}

export interface CategoryConfig {
    id: number;
    name: string;
}

