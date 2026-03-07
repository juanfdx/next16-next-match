export type NavLink = {
  href: string;
  label: string;
};


export const navLinks: NavLink[] = [
  { href: '/matches', label: 'matches' },
  { href: '/lists', label: 'lists' },
  { href: '/messages', label: 'messages' },
];


export const menuLinks: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/profile', label: 'profile' },

]