export interface WarehousesResponse {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  warehouses: Warehouse[];
}

export interface Warehouse {
  id: number;
  name: string;
  address: string;
  phone: string | null;
  branch_id: number;
  branch: Item;
  state: number;
  created_at: Date;
//   updated_at: Date;
//   deleted_at: Date;
}

export interface WarehousesConfigResponse {
  branches: Item[];
}

export interface Item {
  id: number;
  name: string;
}
