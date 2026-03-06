export interface NavLink {
  href: string;
  label: string;
};


export const navLinks: NavLink[] = [
  { href: '/matches', label: 'matches' },
  { href: '/lists', label: 'lists' },
  { href: '/messages', label: 'messages' },
];