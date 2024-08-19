// app/config/navigation.ts

export type NavItem = {
  label: string;
  path: string;
  order?: number;
};

export const navigationItems: NavItem[] = [
  { label: "Home", path: "/", order: 1 },
  { label: "Blog", path: "/blog", order: 2 },
  { label: "About", path: "/bio", order: 4 },
];