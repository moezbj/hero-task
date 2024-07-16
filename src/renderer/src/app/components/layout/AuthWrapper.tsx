import React from 'react'
import logo from '../../../assets/log.png'

interface AuthWrapperProps {
  children: React.ReactElement
}

const AuthWrapper = ({ children }: AuthWrapperProps): JSX.Element => {
  return (
    <section className="h-screen w-screen dark:bg-neutral-700 p-10">
      <div className="w-full h-full rounded-lg shadow-lg dark:bg-neutral-800">
        <div className="h-full grid grid-cols-12">
          <div className="h-full px-10 col-start-1 col-span-6">
            <div className="md:mx-6 md:p-12">
              <div className="text-center">
                <img className="mx-auto w-48" src={logo} alt="logo" width={300} height={250} />
                <h4 className="mb-6 text-xl font-semibold text-grey-250">We are Hero task Team</h4>
              </div>
            </div>
            {children}
          </div>
          <div
            className="h-full flex items-center rounded-b-lg col-end-12 col-span-4 lg:rounded-r-lg lg:rounded-bl-none"
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
    </section>
  )
}

export default AuthWrapper
