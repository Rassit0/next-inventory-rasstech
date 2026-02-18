export interface BranchesResponse {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  branches: Branch[];
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  state: number;
  created_at: Date;
}
