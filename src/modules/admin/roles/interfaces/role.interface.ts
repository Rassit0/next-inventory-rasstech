export interface RolesResponse {
  roles: Role[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface Role {
  id: number;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
  permissions_pluck: string[];
  users: UserRole[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  name: string;
  avatar: string | null;
}
