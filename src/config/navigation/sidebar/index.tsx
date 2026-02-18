import {
  Home01Icon,
  LockPasswordIcon,
  ProductLoadingIcon,
  RepairIcon,
  Store01Icon,
  Tag01Icon,
  UserMultiple02Icon,
  WarehouseIcon,
  WeightScaleIcon,
} from "hugeicons-react";
import { NavSection } from "@/ui";

export const sidebarNavigation: NavSection[] = [
  {
    items: [
      {
        label: "Inicio",
        href: "/",
        action: "dashboard",
        subject: "home",
        icon: <Home01Icon strokeWidth={2} size={25} />,
      },
    ],
  },
  {
    title: "Acceso",
    items: [
      {
        label: "Roles y Permisos",
        href: "/roles",
        action: "list_role",
        subject: "app",
        icon: <LockPasswordIcon strokeWidth={2} size={25} />,
      },
      {
        label: "Usuarios",
        href: "/users",
        action: "list_user",
        subject: "app",
        icon: <UserMultiple02Icon strokeWidth={2} size={25} />,
      },
      {
        label: "Configuraciones",
        // href: '/dashboard/warehouses',
        action: "settings",
        subject: "app",
        icon: <RepairIcon strokeWidth={2} size={25} />,
        children: [
          {
            label: "Sucursales",
            href: "/branches",
            icon: <Store01Icon strokeWidth={2} size={25} />,
            action: "settings",
            subject: "app",
          },
          {
            label: "Almacenes",
            href: "/warehouses",
            icon: <WarehouseIcon strokeWidth={2} size={25} />,
            action: "settings",
            subject: "app",
          },
          {
            label: "Categorías",
            href: "/categories",
            icon: <Tag01Icon strokeWidth={2} size={25} />,
            action: "settings",
            subject: "app",
          },
          {
            label: "Proveedores",
            href: "/suppliers",
            icon: <Store01Icon strokeWidth={2} size={25} />,
            action: "settings",
            subject: "app",
          },
          {
            label: "Unidades",
            href: "/units",
            icon: <WeightScaleIcon strokeWidth={2} size={25} />,
            action: "settings",
            subject: "app",
          },
        ],
      },
    ],
  },
  {
    title: "Comercial",
    items: [
      // {
      //   label: 'Roles y Permisos',
      //   href: '/roles-permissions',
      //   action: 'read',
      //   subject: 'app',
      //   icon: <LockPasswordIcon strokeWidth={2} size={25} />,
      // },
      // {
      //   label: 'Usuarios',
      //   href: '/users',
      //   action: 'list_user',
      //   subject: 'app',
      //   icon: <UserMultiple02Icon strokeWidth={2} size={25} />,
      // },
      {
        label: "Productos",
        // href: '/dashboard/warehouses',
        action: "settings",
        subject: "app",
        icon: <ProductLoadingIcon strokeWidth={2} size={25} />,
        children: [
          {
            label: "Registrar",
            href: "/products/add",
            action: "settings",
            subject: "app",
          },
          {
            label: "Listar",
            href: "/products",
            action: "settings",
            subject: "app",
          },
        ],
      },
    ],
  },
  // {
  //   title: 'Configuración',
  //   items: [
  //     {
  //       label: 'Sucursales',
  //       // href: '/dashboard/branches',
  //       action: 'read',
  //       subject: 'branches',
  //       icon: <Store01Icon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Ver todas', href: '/dashboard/branches', action: 'read', subject: 'branches' },
  //         { label: 'Crear nueva', href: '/dashboard/branches/create', action: 'create', subject: 'branches' },
  //         { label: 'Crear nueva', href: '/dashboard/branches/create', action: 'create', subject: 'branches' },
  //         { label: 'Crear nueva2', href: '/dashboard/branches/create', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //         {
  //           label: 'SubMenu1', icon: <FaPlus size={25} />, action: 'create', subject: 'branches', children: [
  //             { label: 'SubMenu2', href: '/dashboard/branches/subMenu2', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //             { label: 'SubMenu', href: '/dashboard/branches/subMenu', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //             { label: 'SubMenu3', href: '/dashboard/branches/subMenu3', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //           ],
  //         },
  //         {
  //           label: 'SubMenu2', icon: <FaPlus size={25} />, action: 'create', subject: 'branches', children: [
  //             { label: 'SubMenu22', href: '/dashboard/branches/subMenu2', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //             // { label: 'SubMenu222W', href: '/dashboard/branches/subMenu222', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //             // { label: 'SubMenu23', href: '/dashboard/branches/subMenu23', icon: <FaPlus size={25} />, action: 'create', subject: 'branches' },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Almacenes',
  //       // href: '/dashboard/warehouses',
  //       action: 'read',
  //       subject: 'warehouses',
  //       icon: <WarehouseIcon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Ver todos', href: '/dashboard/warehouses', icon: <FaList size={25} />, action: 'read', subject: 'warehouses' },
  //         { label: 'Crear nuevo', href: '/dashboard/warehouses/create', icon: <FaPlus size={25} />, action: 'create', subject: 'warehouses' },
  //         { label: 'Crear nuevo2', href: '/dashboard/warehouses/create', icon: <FaPlus size={25} />, action: 'create', subject: 'warehouses' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Inventario',
  //   items: [
  //     {
  //       label: 'Productos',
  //       // href: '/dashboard/products',
  //       action: 'read',
  //       subject: 'products',
  //       icon: <ProductLoadingIcon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todos', href: '/dashboard/products', icon: <FaList size={25} />, action: 'read', subject: 'products' },
  //         { label: 'Nuevo producto', href: '/dashboard/products/add', icon: <FaPlus size={25} />, action: 'create', subject: 'products' },
  //         { label: 'Importar', href: '/dashboard/products/import', icon: <FaFileImport size={25} />, action: 'create', subject: 'products' },
  //       ],
  //     },
  //     {
  //       label: 'Categorías',
  //       // href: '/dashboard/categories',
  //       action: 'read',
  //       subject: 'categories',
  //       icon: <Tag01Icon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todas', href: '/dashboard/categories', icon: <FaList size={25} />, action: 'read', subject: 'categories' },
  //         { label: 'Nueva categoría', href: '/dashboard/categories/create', icon: <FaPlus size={25} />, action: 'create', subject: 'categories' },
  //       ],
  //     },
  //     {
  //       label: 'Unidades',
  //       // href: '/dashboard/units',
  //       action: 'read',
  //       subject: 'units',
  //       icon: <WeightScaleIcon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todas', href: '/dashboard/units', icon: <FaList size={25} />, action: 'read', subject: 'units' },
  //         { label: 'Nueva unidad', href: '/dashboard/units/create', icon: <FaPlus size={25} />, action: 'create', subject: 'units' },
  //       ],
  //     },
  //     {
  //       label: 'Inventario',
  //       // href: '/dashboard/inventory',
  //       action: 'read',
  //       subject: 'inventory',
  //       icon: <Archive02Icon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Ver inventario', href: '/dashboard/inventory', icon: <FaList size={25} />, action: 'read', subject: 'inventory' },
  //         { label: 'Ajustes de stock', href: '/dashboard/inventory/adjust', icon: <FaExchangeAlt size={25} />, action: 'update', subject: 'inventory' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Operaciones',
  //   items: [
  //     {
  //       label: 'Pedidos',
  //       // href: '/dashboard/orders',
  //       action: 'read',
  //       subject: 'orders',
  //       icon: <HugeiconsIcon icon={HotelBellIcon} strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todos', href: '/dashboard/orders', icon: <FaList size={25} />, action: 'read', subject: 'orders' },
  //         { label: 'Pendientes', href: '/dashboard/orders/pending', icon: <FaExchangeAlt size={25} />, action: 'update', subject: 'orders' },
  //       ],
  //     },
  //     {
  //       label: 'Cocina',
  //       // href: '/dashboard/kitchen',
  //       action: 'read',
  //       subject: 'kitchen',
  //       icon: <ChefHatIcon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Pedidos en cocina', href: '/dashboard/kitchen', icon: <FaList size={25} />, action: 'read', subject: 'kitchen' },
  //         { label: 'Historial', href: '/dashboard/kitchen/history', icon: <FaList size={25} />, action: 'read', subject: 'kitchen' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Administración',
  //   items: [
  //     {
  //       label: 'Clientes',
  //       // href: '/dashboard/clients',
  //       action: 'manage',
  //       subject: 'clients',
  //       icon: <UserGroupIcon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todos', href: '/dashboard/clients', icon: <FaList size={25} />, action: 'read', subject: 'clients' },
  //         { label: 'Nuevo cliente', href: '/dashboard/clients/create', icon: <FaPlus size={25} />, action: 'create', subject: 'clients' },
  //       ],
  //     },
  //     {
  //       label: 'Usuarios',
  //       // href: '/dashboard/users',
  //       action: 'manage',
  //       subject: 'users',
  //       icon: <UserMultiple02Icon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todos', href: '/dashboard/users', icon: <FaList size={25} />, action: 'read', subject: 'users' },
  //         { label: 'Nuevo usuario', href: '/dashboard/users/create', icon: <FaPlus size={25} />, action: 'create', subject: 'users' },
  //       ],
  //     },
  //     {
  //       label: 'Roles',
  //       // href: '/dashboard/roles',
  //       action: 'manage',
  //       subject: 'roles',
  //       icon: <ShieldUserIcon strokeWidth={2} size={25} />,
  //       children: [
  //         { label: 'Todos', href: '/dashboard/roles', icon: <FaList size={25} />, action: 'read', subject: 'roles' },
  //         { label: 'Nuevo rol', href: '/dashboard/roles/create', icon: <FaPlus size={25} />, action: 'create', subject: 'roles' },
  //       ],
  //     },
  //   ],
  // },
];
