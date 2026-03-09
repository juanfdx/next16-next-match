export type NavLink = {
  href: string;
  label: string;
};


export const navLinks: NavLink[] = [
  { href: '/members', label: 'members' },
  { href: '/lists', label: 'lists' },
  { href: '/messages', label: 'messages' },
];


export const menuLinks: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/profile', label: 'profile' },
  { href: '/admin', label: 'admin' },
]


export const profileLinks: NavLink[] = [
  { href: '/profile', label: 'profile' },
  { href: '/photos', label: 'photos' },
  { href: '/chat', label: 'chat' },
]