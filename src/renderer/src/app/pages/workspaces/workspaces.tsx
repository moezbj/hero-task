import Input from '../../components/ui/input'
import { z } from 'zod'
import { Suspense, useContext, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { WorkSpaceType } from '../../../requests/workspace/workspaceType'
import { Button } from '../../components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../components/ui/sheet'
import { LIST_WORKSPACES, CREATE_WORKSPACE } from '../../../requests/workspace/workspaceRequests'
import { ProjectType } from '@requests/project/projectTypes'
import { AuthContext } from '../../../providers/AuthProvider'
import { Link } from 'react-router-dom'

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50)
})

const Page = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const { user } = useContext(AuthContext)

  const { data, refetch } = useQuery<{
    listWorkspaces: WorkSpaceType[]
  }>(LIST_WORKSPACES)
  const [call] = useMutation(CREATE_WORKSPACE, {
    onCompleted: () => {
      refetch()
      setOpen(false)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (variables: any): void => {
    console.log('variables', variables)
    call({
      variables: {
        name: variables.name,
        description: variables.description
      }
    })
  }
  return (
    <Suspense fallback={'loading...'}>
      <div className="my-6 mx-12 ">
        <div className="flex justify-between py-4">
          <h1 className="text-grey-200 font-bold text-2xl">All workspaces</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="default" onClick={() => setOpen(true)}>
                Add workspace
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Add workspace</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <div className="flex flex-col  mb-4">
                    <Input label="name" {...form.register('name')} className="w-full" />
                  </div>
                  <div className="flex flex-col mb-4">
                    <Input
                      label="description"
                      {...form.register('description')}
                      className="w-full mb-4"
                    />{' '}
                  </div>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        <div className="mt-8">
          <h2 className="text-grey-200 font-bold text-2xl">My workspaces</h2>
          <Accordion type="single" collapsible className="w-full">
            {data?.listWorkspaces
              ?.filter((w) => w.adminId === Number(user?.id))
              .map((workspace: WorkSpaceType, i: number) => (
                <AccordionItem key={workspace.name} value={`item-${i}`}>
                  <AccordionTrigger>
                    <Link to={`/workspace/${workspace.id}`}>{workspace.name}</Link>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col">
                      <p>{workspace.description}</p>
                      <p>Collaborator: {workspace.collaborator?.length}</p>

                      {workspace.projects?.map((project: ProjectType) => (
                        <Link key={project.title} to={`/project/${project.id}`}>
                          <div>
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                            <p>Participants: {project.participants.length}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>

        <div className="mt-8">
          <h2 className="text-grey-200 font-bold text-2xl">Workspaces working on</h2>
          <Accordion type="single" collapsible className="w-full">
            {data?.listWorkspaces
              ?.filter((w) => user && w.collaborator?.includes(Number(user.id)))
              .map((workspace: WorkSpaceType, i: number) => (
                <AccordionItem key={workspace.name} value={`item-${i}`}>
                  <AccordionTrigger>{workspace.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col">
                      <p>{workspace.description}</p>
                      {workspace.projects?.map((project: ProjectType) => (
                        <div key={project.title}>
                          <h4>{project.title}</h4>
                          <p>{project.description}</p>
                          <p>Participants: {project.participants.length}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </div>
    </Suspense>
  )
}

export default Page
