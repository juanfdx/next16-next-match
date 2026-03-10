export type Tab = { 
  id: string, 
  label: string 
}


export const likeTabs: Tab[] = [
  { id: 'source', label: 'Members I have liked' },
  { id: 'target', label: 'Members that like me' },
  { id: 'mutual', label: 'Mutual likes' },
]


// //Shorter UI text
// const likeTabs = [
//   { id: 'sent', label: 'You Liked' },
//   { id: 'received', label: 'Liked You' },
//   { id: 'mutual', label: 'Mutual' },
// ];