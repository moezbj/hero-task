/* eslint-disable react/prop-types */
import localforage from 'localforage'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../ui/navigation-menu'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import useUser from '../../../hooks/useUser'
import { logout } from '../../../requests/auth'
import { getToken, setToken } from '../../../config/apollo'
import { AuthContext } from '../../../providers/AuthProvider'

const staticTabs = [
  { title: 'wo1', href: 'workspace/1' },
  { title: 'wo2', href: 'workspace/2' },
  { title: 'wo3', href: 'workspace/3' }
]

const Header = (): JSX.Element => {
  const { setUser } = useContext(AuthContext)
  const user = useUser()
  const [call] = useMutation(logout, {
    onCompleted: () => {
      setToken({
        accessToken: '',
        expiresIn: '',
        refreshToken: '',
        tokenType: ''
      })
      localforage.removeItem('auth')
      setUser(null)
    }
  })

  return (
    <header className="bg-grey-500 shadow-md">
      <div className="container px-3 py-3 flex justify-between items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link to="/">Home</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>WorkSpaces</NavigationMenuTrigger>
              <NavigationMenuContent>
                {staticTabs.map((w) => (
                  <div key={w.title}>
                    <Link to={w.href}>{w.title}</Link>
                  </div>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="w-20 flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <DropdownMenuLabel className="mx-2 text-gray-200">
                  {user?.firstName} {user?.lastName}
                </DropdownMenuLabel>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" side="bottom">
              <DropdownMenuLabel className="cursor-pointer text-gray-200">
                Profile
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel
                className="cursor-pointer text-gray-200"
                onClick={() => {
                  const token = getToken()

                  console.log('token', token)

                  call({
                    variables: {
                      token: token.refreshToken
                    }
                  })
                }}
              >
                Log out
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
