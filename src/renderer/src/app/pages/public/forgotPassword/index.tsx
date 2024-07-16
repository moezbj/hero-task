import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Navigate, useSearchParams } from 'react-router-dom'

import { Button } from '../../../components/ui/button'
import Input from '../../../components/ui/input'
import { forgotPassword } from '../../../../requests/auth'
import useUser from '../../../../hooks/useUser'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import AuthWrapper from '../../../components/layout/AuthWrapper'

const formSchema = z.object({
  email: z.string().min(2).max(50)
})

function ForgotPassword(): JSX.Element {
  const [params] = useSearchParams()
  const user = useUser()

  const [forgotCall] = useMutation(forgotPassword)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = (variables: { email: string }): void => {
    forgotCall({
      variables
    })
  }

  if (user) {
    return <Navigate to={params.get('from') || '/'} replace />
  }
  return (
    <AuthWrapper>
      <div>
        <h5 className="mb-12 mt-1 pb-1 text-xl semibold text-grey-250">Forgot password</h5>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2 grid-cols-1">
          <Input label="Email" {...form.register('email')} className="text-black"></Input>

          <div className="mb-12 pb-1 pt-1 text-center">
            <Button
              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              type="submit"
              variant="default"
            >
              Send
            </Button>
          </div>

          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2 text-grey-250">Don&apos;t Have an account?</p>
            <Link to="/register">
              <Button type="button" variant="secondary" className="text-grey-250">
                Sign up
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default ForgotPassword
