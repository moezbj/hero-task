import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../../components/ui/accordion'
import { Button } from '../../components/ui/button'
import Input from '../../components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../../components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../components/ui/form'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TASK, LIST_TASKS } from '../../../requests/project/projectRequests'
import { TaskType } from '../../../requests/project/projectTypes'
import { useLocation } from 'react-router-dom'

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  type: z.string().min(2).max(50),
  note: z.string().min(2).max(50)
})

const Backlog = (): JSX.Element => {
  const location = useLocation()
  const projectId = location.pathname.split('project/')[1].split('/')[0]
  console.log('projectId', projectId)

  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      type: '',
      note: ''
    }
  })
  const { data, refetch } = useQuery<{
    tasks: TaskType[]
  }>(LIST_TASKS, { variables: { projectId } })

  const [call] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      refetch()
      setOpen(false)
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (variables: z.infer<typeof formSchema>): void => {
    console.log('variables', variables)

    call({
      variables: {
        title: variables.title,
        description: variables.description,
        type: variables.type,
        note: variables.note,
        projectId: Number(projectId)
      }
    })
  }
  console.log('formState', form.formState.errors)

  const cycles = [
    { name: 'Not ready', value: 'NOT_READY' },
    { name: 'To do', value: 'TO_DO' },
    { name: 'In progress', value: 'IN_PROGRESS' },
    { name: 'Completed', value: 'COMPLETED' },
    { name: 'To test', value: 'TO_TEST' },
    { name: 'To deploy', value: 'TO_DEPLOY' }
  ]

  return (
    <div className="px-10 py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Backlog</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild aria-describedby="trigger">
            <Button variant="default" onClick={() => setOpen(true)}>
              Add Task
            </Button>
          </SheetTrigger>
          <SheetContent side="right" aria-describedby="create">
            <SheetHeader aria-describedby="header">
              <SheetTitle aria-describedby="title">Add task</SheetTitle>
            </SheetHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full mb-4" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full mb-4" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full mb-4" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cycles.map((cycle) => (
                            <SelectItem key={cycle.name} value={cycle.value}>
                              {cycle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col mb-4"></div>
                <Button type="submit">Create</Button>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="mt-20">
        <Accordion type="single" collapsible className="w-full">
          {data?.tasks.map((task, i) => (
            <AccordionItem key={task.title} value={`item-${i}`}>
              <AccordionTrigger>
                <h1 className="font-semibold text-xl">{task.type}</h1>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  <p>{task.description}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default Backlog
/* <p>Collaborator: {task.collaborator?.length}</p> 

                   {workspace.projects?.map((project: ProjectType) => (
                    <Link key={project.title} to={`/project/${project.id}`}>
                      <div>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <p>Participants: {project.participants.length}</p>
                      </div>
                    </Link>
                  ))} */
