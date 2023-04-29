import { useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks/useRedux"
import { logIn } from "../../redux/slice/authSlice";
import { Link, useNavigate } from "react-router-dom";


export const LoginForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setpassword] = useState<string>();
  const [message, setMessage] = useState('')
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    const value = { email, password }
    setMessage('')

    const response = await dispatch(logIn(value)).unwrap()

    if (response.success) {
      navigate('/chat')
    } else {
      setMessage(response.message)
    }

  }, [dispatch, email, navigate, password])

  return (
    <div className='lg:w-1/4'>
      <h4 className='text-center text-xl py-2 font-bold'>Login</h4>
      <div className='py-2' >
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setpassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="text-center">

          <button
            // type="submit"
            onClick={handleLogin}
            disabled={!email || !password}
            className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </div>
      </div>
      <div>
        Don't have account?&nbsp;
        <Link to='/register' className="text-indigo-800 text-sm">Register</Link>
      </div>
      {
        message &&
        <div className="bg-red-500 text-white rounded px-2 py-2">{message}</div>
      }

    </div>
  )
}
