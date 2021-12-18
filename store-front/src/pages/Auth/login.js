import { LockClosedIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { login, selectUser } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Example() {

  const dispatch = useDispatch()
  let navigate = useNavigate()
  const user = useSelector(selectUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const makeLoginDataObject = () => {
    return {
      email: email,
      password: password
    }
  }

  const userLogin = (e) => {
    e.preventDefault()
    const userData = makeLoginDataObject()
    dispatch(login(userData))
  }

  useEffect( () => {
    if(user) {
      navigate("/", { replace: true });
    }
  }, [user])

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto" src="https://img.icons8.com/color/48/000000/nui2.png"/>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            
          </div>
          <form className="mt-8 space-y-6" onSubmit={ (e) => userLogin(e) }>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
