export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_at: number;
  user: User;
}

export interface User {
  full_name: string;
  email: string;
  avatar: string;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}
