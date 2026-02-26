export interface UnitsResponse {
  units: Unit[];
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface Unit {
  id: number;
  name: string;
  description: string;
  state: number;
  conversions: Item[];
  created_at: Date;
}

export interface Parent {
  id: number;
  name: string;
}

export interface UnitsConfigResponse {
  units: Item[];
}

export interface Item {
  id: number;
  name: string;
}

export interface UnitConversion {
  id: number;
  unit: Item;
  unit_to: Item;
  created_at: Date;
}
