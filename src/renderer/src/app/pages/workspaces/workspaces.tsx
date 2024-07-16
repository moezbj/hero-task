import Input from '../../components/ui/input'
import { Label } from '../../components/ui/label'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '../../components/ui/dialog'
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
          <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
              <Button>Add workspace</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-grey-200">Create workspace</DialogTitle>
                <DialogDescription className="text-grey-200">
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-grey-200">
                    name
                  </Label>
                  <Input label="name" {...form.register('name')} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right text-grey-200">
                    description
                  </Label>
                  <Input
                    label="description"
                    {...form.register('description')}
                    className="col-span-3"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild onClick={() => setOpen(false)}>
                    <Button variant="secondary">close</Button>
                  </DialogClose>
                  <Button type="submit" className="text-grey-200">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-2">
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
                            <p>Participants: {project.participant.length}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>

        <div className="mt-2">
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
                          <p>Participants: {project.participant.length}</p>
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
