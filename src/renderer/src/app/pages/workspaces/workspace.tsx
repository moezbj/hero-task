import Input from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { z } from 'zod'
import { Suspense, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../../components/ui/card'
import { ProjectType } from '../../../requests/project/projectTypes'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../components/ui/dialog'
import { CREATE_PROJECT, LIST_PROJECTS } from '../../../requests/project/projectRequests'
import { Link } from 'react-router-dom'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  delivered: z.boolean().default(false),
  owner: z.number()
})

const Page = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const { data, refetch } = useQuery<{
    listProjects: ProjectType[]
  }>(LIST_PROJECTS)
  const [call] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      refetch()
      setOpen(false)
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      delivered: false,
      owner: 1
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (variables: any): void => {
    console.log('variables', variables)
    call({
      variables: {
        title: variables.title,
        description: variables.description,
        delivered: variables.delivered,
        owner: variables.owner
      }
    })
  }
  return (
    <Suspense fallback={'loading...'}>
      <div className="my-6 mx-12">
        <div className=" flex justify-between px-8">
          <p className="text-grey-200 font-bold text-2xl">All projects</p>
          <Dialog open={open}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setOpen(true)}>
                Create project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-grey-200">Create project</DialogTitle>
                <DialogDescription className="text-grey-200">
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-grey-200">
                    title
                  </Label>
                  <Input label="title" {...form.register('title')} className="col-span-3" />
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
                  <Button type="submit" className="text-grey-200">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-2 container grid grid-cols-12">
          {data?.listProjects?.map((project: ProjectType) => (
            <Link className="col-span-3" key={project.title} to={`project/${project.id}/backlog`}>
              <Card>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Suspense>
  )
}

export default Page
