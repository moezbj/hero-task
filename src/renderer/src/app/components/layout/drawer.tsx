import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

interface DrawerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any
}

const Drawer = ({ children }: DrawerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = (): void => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="flex h-screen dark:bg-neutral-800">
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'w-72' : 'w-14'
        } bg-gray-500 text-white h-full`}
      >
        <button
          className="p-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300"
          onClick={toggleDrawer}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
        <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Workspaces</AccordionTrigger>
              <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Projects</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components&apos; aesthetic.
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
      </div>
      <div className="flex-grow p-4 bg-slate-800">{children}</div>
    </div>
  )
}

export default Drawer
