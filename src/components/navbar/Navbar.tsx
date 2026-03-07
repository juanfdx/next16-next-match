import { auth } from '../../../auth'
// components
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'
import { LinkButton } from '../ui/LinkButton'
import ThemeToggle from './ThemeToggle'
import { Dropdown } from './Dropdown'




export const Navbar = async () => {

  const session = await auth();
  

  return (
    <nav className='bg-linear-to-r from-purple-500 to-pink-500'>
      <div className='container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 px-7 py-3 '>
        <Logo />
        {session?.user &&
          <NavLinks />
        }

        <div className='flex items-center gap-2'> 
          {/* Auth buttons */} 
          {session?.user ? (
           <>
            <Dropdown />
           </>

          ) : (
           <>
              <LinkButton href='/auth/login' label='Login' />
              <LinkButton href='/auth/register' label='Register' />
           </>
          )}
          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

