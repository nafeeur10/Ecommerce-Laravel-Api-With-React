import { LockClosedIcon } from '@heroicons/react/solid'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { createNewUser, selectUser } from '../../features/user/userSlice'
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const user = useSelector(selectUser)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [passwordMissmatch, setPasswordMissmatch] = useState(false)

  const checkPasswordConfirmation = () => {
    if(password!==password_confirmation) {
      setPasswordMissmatch(true)
      return 0
    }
    else {
      setPasswordMissmatch(false)
      return 1
    }
    
  }

  const makeRegistrationDataObject = () => {
    return {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
  }

  const registerNewUser = (e) => {
    e.preventDefault()
    const userData = makeRegistrationDataObject()
    if(checkPasswordConfirmation()) {
      dispatch(createNewUser(userData))
    }
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
          <form className="mt-8 space-y-6" onSubmit={(e) => registerNewUser(e)}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-3">
                    <label htmlFor="name" className="sr-only">
                        Name
                    </label>
                    <input
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

              <div className="!mb-3">
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
              <div className="!mb-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password Confirmation
                </label>
                <input
                  name="password_confirmation"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password Confirmation"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                { passwordMissmatch && <span className="text-red-600">Password Missmatch</span>}
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

export default Register