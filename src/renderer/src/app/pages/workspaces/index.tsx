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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50)
})

const Page = (): JSX.Element => {
  const [open, setOpen] = useState(false)

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
        name: variables.title,
        description: variables.description
      }
    })
  }
  return (
    <Suspense fallback={'loading...'}>
      <div className="flex justify-between px-8">
        <p className="text-grey-200 font-bold text-2xl">All workspaces</p>
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
      <div className="mt-2 container grid grid-cols-12">
        {data?.listWorkspaces?.map((workspace: WorkSpaceType) => (
          <Card key={workspace.name} className="col-span-4">
            <CardHeader>
              <CardTitle>{workspace.name}</CardTitle>
              <CardDescription>{workspace.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Suspense>
  )
}

export default Page
