export interface ProductsResponse {
    products: Product[];
    meta:     Meta;
}

export interface Meta {
    current_page: number;
    last_page:    number;
    per_page:     number;
    total:        number;
}

export interface Product {
    id:                  number;
    title:               string;
    slug:                string;
    image:               string;
    category_id:         number;
    category:            Category;
    sku:                 string;
    description:         string;
    is_gift:             boolean;
    allow_without_stock: boolean;
    stock_status:        'available' | 'low_stock' | 'out_of_stock';
    price_general:       string;
    price_company:       string;
    is_discount:         boolean;
    max_discount:        string;
    state:               boolean;
    warranty_day:        number | null;
    is_taxable:          boolean;
    iva:                 string;
    created_at:          Date;
    product_warehouses:  ProductWarehouse[];
    product_wallets:     ProductWallet[];
}

export interface Category {
    id:   number;
    name: string;
}

export interface ProductWarehouse {
    id:           number;
    warehouse_id: number;
    warehouse:    Unit;
    unit_id:      number;
    unit:         Unit;
    threshold:    string;
    stock:        string;
}

export interface Unit {
    name: string;
}

export interface ProductWallet{
    id:           number,
    unit_id:      number,
    unit:         Unit,
    branch_id:    number,
    branch:       Branch,
    type_client:  string,
    price:        string,
}

export interface Branch {
    name: string;
}


export interface ProductConfig {
    branches:   ItemConfig[];
    warehouses: ItemConfig[];
    units:      ItemConfig[];
    categories: ItemConfig[];
}

export interface ItemConfig {
    id:   number;
    name: string;
}

