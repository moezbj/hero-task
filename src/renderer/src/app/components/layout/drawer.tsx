import { useState } from 'react'
import logo from '../../../assets/log.png'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { ProjectType } from '../../../requests/project/projectTypes'
import { Sheet, BookMarked, Inbox } from 'lucide-react'
import { Label } from '../ui/label'

interface DrawerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
  data: ProjectType
  location: string
}

const Drawer = ({ children, data, location }: DrawerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen)
  }

  const nav = [
    { title: 'Backlog', link: 'backlog', Icon: Sheet },
    { title: 'Board', link: 'board', Icon: BookMarked },
    { title: 'Inbox', link: 'inbox', Icon: Inbox }
  ]
  return (
    <div className="flex h-full bg-blue-700">
      <div className={`transition-all duration-300 ${isOpen ? 'w-72' : 'w-16'} text-white h-full`}>
        <div className="h-full flex flex-col">
          <div className="border-b-slate-200 border-b-2">
            <button
              className="p-2 transition-all duration-300 flex items-center"
              onClick={toggleDrawer}
            >
              <div className="w-20">
                <img src={logo} alt="logo" />
              </div>
              {isOpen ? data?.title : ''}
            </button>
          </div>

          <div className="p-4 flex flex-1">
            <div className={` ${isOpen ? 'flex flex-1' : 'hidden'} `}>
              <ul className="flex flex-col">
                {nav.map((nav) => {
                  const isCurrentPath = location.split('/').pop() === nav.link
                  return (
                    <Link
                      key={nav.title}
                      to={nav.link}
                      className={`my-5 w-full flex cursor-pointer items-center hover:text-orange-300 ${isCurrentPath ? 'text-orange-300' : ''}`}
                    >
                      <nav.Icon className="mr-3" size={30} />
                      <Label className="text-lg cursor-pointer font-light">{nav.title}</Label>
                    </Link>
                  )
                })}
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
