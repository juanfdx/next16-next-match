import { auth } from '../../../auth'
// components
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { Dropdown } from './Dropdown'
import ThemeToggle from './ThemeToggle'



export const Navbar = async () => {

  const session = await auth();
  
  const isAdminUser = session?.user?.role === 'admin';
  const isLoggedIn = !!session?.user;

  const userImage = session?.user?.image ?? null; 


  return (
    <nav className='bg-linear-to-r from-purple-500 to-pink-500'>
      <div className='max-w-350 mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 px-7 py-3 '>
        <Logo />
        {session?.user && <NavLinks /> }

        <div className='flex items-center gap-2'> 
          {/* Auth buttons */} 
          <Dropdown 
            isAdminUser={isAdminUser} 
            isLoggedIn={isLoggedIn} 
            userImage={userImage}     
          />

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

