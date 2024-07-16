import { useState } from 'react'
import logo from '../../../assets/log.png'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

interface DrawerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const Drawer = ({ children }: DrawerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen)
  }

  const nav = [
    { title: 'Backloag', link: 'backloag' },
    { title: 'Board', link: 'board' },
    { title: 'Inbox', link: 'inbox' }
  ]
  return (
    <div className="flex h-full dark:bg-neutral-800">
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
          <div className="p-4 flex flex-1">
            <div className={` ${isOpen ? 'flex flex-1' : 'hidden'} `}>
              <ul className="flex flex-col">
                {nav.map((nav) => (
                  <Link key={nav.title} to={nav.link}>
                    {nav.title}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center mb-14">
            <Button variant="secondary" size="lg">
              <p>Invite new member</p>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-slate-800">{children}</div>
    </div>
  )
}

export default Drawer
