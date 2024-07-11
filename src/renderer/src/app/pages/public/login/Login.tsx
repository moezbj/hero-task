import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Navigate, useSearchParams } from 'react-router-dom'

import logo from '../../../../assets/log.png'
import { Button } from '../../../components/ui/button'
import Input from '../../../components/ui/input'
import { signin } from '../../../../requests/auth'
import useAuth from '../../../../hooks/useAuth'
import useUser from '../../../../hooks/useUser'

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50)
})

function Login(): JSX.Element {
  const [params] = useSearchParams()
  const user = useUser()

  const [LoginCall] = useAuth({
    mutation: signin,
    options: {
      onError: (e) => {
        console.log(e)
      }
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'alice@prisma.io',
      password: 'myPassword42'
    }
  })

  const onSubmit = (variables: { email: string; password: string }): void => {
    LoginCall({
      variables
    })
  }

  if (user) {
    return <Navigate to={params.get('from') || '/'} replace />
  }
  return (
    <section className="h-screen w-screen bg-neutral-200 dark:bg-neutral-700">
      <div className=" w-full h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={logo}
                        alt="logo"
                        width={300}
                        height={250}
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-grey-250">
                        We are Hero task Team
                      </h4>
                      <h5 className="mb-12 mt-1 pb-1 text-xl semibold text-grey-250">Sign in</h5>
                    </div>
                  </div>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2 grid-cols-1">
                    <Input
                      label="Email"
                      value="alice@prisma.io"
                      {...form.register('email')}
                      className="text-black"
                    ></Input>
                    <Input
                      label="Password"
                      value="myPassword42"
                      {...form.register('password')}
                    ></Input>

                    <div className="mb-12 pb-1 pt-1 text-center">
                      <Button
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        type="submit"
                        variant="default"
                      >
                        Login
                      </Button>

                      <a href="#!" className="text-grey-250">
                        Terms and conditions
                      </a>
                    </div>

                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2 text-grey-250">Don&apos;t Have an account?</p>

                      <Button
                        // href="/home#register"
                        // onClick={toggle}
                        type="button"
                        variant="secondary"
                        className="text-grey-250"
                      >
                        Sign up
                      </Button>
                    </div>
                  </form>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100%',
                    backgroundPosition: 'center',
                    backgroundImage:
                      "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
