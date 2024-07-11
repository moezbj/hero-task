import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import logo from '../../../assets/log.png'
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

interface DrawerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const Drawer = ({ children }: DrawerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUser()

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex h-screen dark:bg-neutral-800">
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'w-72' : 'w-16'
        } bg-gray-500 text-white h-full`}
      >
        <div className="h-full flex flex-col">
          <button
            className="p-2 bg-blue-700 transition-all duration-300 flex items-center"
            onClick={toggleDrawer}
          >
            <div className="w-20">
              <img src={logo} alt="logo" />
            </div>
            {isOpen ? 'Hero task' : ''}
          </button>
          <div className={`p-4 ${isOpen ? 'flex flex-1' : 'hidden'} `}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Workspaces</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Projects</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other components&apos;
                  aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Whats new</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-20 flex items-center space-x-4 mb-14">
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
              <DropdownMenuContent className="w-56" align="end" side="right">
                <DropdownMenuLabel className="cursor-pointer text-gray-200">
                  Profile
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="cursor-pointer text-gray-200">
                  Log out
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-slate-800">{children}</div>
    </div>
  )
}

export default Drawer
