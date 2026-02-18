export interface SuppliersResponse {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  suppliers: Supplier[];
}

export interface Supplier {
  id: number;
  full_name: string;
  ruc: string;
  email: string | null;
  phone: string;
  address: string | null;
  image: string | null;
  state: number;
  created_at: Date;
  //   updated_at: Date;
  //   deleted_at: Date;
}
