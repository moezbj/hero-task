import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useSearchParams, Link } from 'react-router-dom'
import { z } from 'zod'
import Input from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'
import { signup } from '../../../../requests/auth'
import useUser from '../../../../hooks/useUser'
import useAuth from '../../../../hooks/useAuth'
import AuthWrapper from '../../../components/layout/AuthWrapper'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50)
})

function Page(): JSX.Element {
  const user = useUser()
  const [params] = useSearchParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  })
  const [call] = useAuth({
    mutation: signup,
    options: {
      onError: (e) => {
        console.log(e)
      }
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (variables: any): void => {
    console.log('variables', variables)
    call({
      variables: {
        email: variables.email,
        password: variables.password,
        firstName: variables.firstName,
        lastName: variables.lastName
      }
    })
  }
  if (user) {
    return <Navigate to={params.get('from') || '/'} replace />
  }
  return (
    <AuthWrapper>
      <div>
        <h5 className="mb-8 mt-1 pb-1 text-xl semibold text-grey-250">Register</h5>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2 grid-cols-1">
          <Input label="Email" {...form.register('email')} />
          <Input label="Password" {...form.register('password')} />
          <Input label="FirstName" {...form.register('firstName')} />
          <Input label="LastName" {...form.register('lastName')} />

          <div className="mb-12 pb-1 pt-1 text-center">
            <Button
              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="submit"
            >
              Login
            </Button>

            {/* <a href="#!">Terms and conditions</a> */}
          </div>

          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2">Have an account?</p>
            <Link to="/login">
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Page
