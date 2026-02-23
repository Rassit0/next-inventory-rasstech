export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_at: number;
  user: User;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  avatar: string | null;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface VerifyTokenResponse {
  user: {
    id: string;
    name: string;
    surname: string | null;
    full_name: string;
    email: string;
    avatar: string | null;
    role: {
      id: number;
      name: string;
      permissions: string[];
    };
  };
}
