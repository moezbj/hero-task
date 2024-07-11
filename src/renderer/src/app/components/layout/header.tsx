import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import logo from '../../../assets/log.png'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface headerData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}
const Header = ({ data }: headerData): JSX.Element => {
  console.log('data', data)
  return (
    <header className="bg-grey-500 shadow-md">
      <div className="container mx-auto px-3 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="w-16">
          <img src={logo} alt="logo" />
        </div>

        {/* Navigation Links */}
        {/*     <nav className="hidden md:flex space-x-6">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </nav> */}

        {/* Profile Button */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/*                 <DropdownMenuLabel className="mx-2">{data.user.firstName} {data.user.lastName}</DropdownMenuLabel>
                 */}{' '}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Log out</DropdownMenuLabel>
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
