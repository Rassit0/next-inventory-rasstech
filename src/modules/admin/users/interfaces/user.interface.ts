export interface UsersResponse {
    users: User[];
    meta: Meta;
}

export interface Meta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface User {
    id: number;
    name: string;
    surname: null | string;
    full_name: string;
    email: string;
    role_id: number;
    role: Role;
    phone: null | string;
    state: number;
    branch_id: null;
    branch: null;
    avatar: null | string;
    type_document: null;
    n_document: null;
    gender: null | string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null | Date;
}

export interface Role {
    name: string;
}

export interface UsersConfigResponse {
    roles:    Item[];
    branches: Item[];
}

export interface Item {
    id:   number;
    name: string;
}
