// export type Action = 'read' | 'create' | 'update' | 'delete' | 'manage'
export type Action = string;

export type NavItem = NavItemWithChildren | NavItemWithoutChildren;

export interface NavSection {
  title?: string
  items: NavItem[]
}


interface NavItemWithChildren {
  label: string;
  icon?: React.ReactNode;
  children: NavItem[];     // obligatorio
  action: Action;
  subject: string;
  href?: never;           // explícitamente prohibido
}

interface NavItemWithoutChildren {
  label: string;
  icon?: React.ReactNode;
  href: string;           // obligatorio si no hay subMenu
  action: Action;
  subject: string;
  children?: never;        // no permitido
}