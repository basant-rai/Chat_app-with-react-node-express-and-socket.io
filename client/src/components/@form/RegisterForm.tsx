import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { AppConfig } from '../../config/app.config'
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [username, setUserName] = useState<string>();
  const [message, setMessage] = useState('')


  const handleRegister = useCallback(async () => {
    setMessage('')
    try {
      const res = await axios.post(`${AppConfig.api_url}/register`, {
        email: email,
        password: password,
        user_name: username
      })
      setEmail('')
      setPassword('')
      setUserName('')

      setMessage(res.data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000);

    } catch (error: any) {
      console.log(error)
      setMessage(error.response)
      throw error
    }
  }, [email, password, username])

  return (
    <div className='w-1/4'>
      <h4 className='text-center text-xl py-2 font-bold'>Register</h4>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={password}
          type="password"
          name="floating_password"
          id="floating_password"
          onChange={(e) => setPassword(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={password}
          type="password"
          name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          value={username}
          name="floating_first_name"
          id="floating_first_name"
          onChange={(e) => setUserName(e.target.value)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
      </div>
      <div className="text-center">
        <button
          onClick={handleRegister}
          disabled={!email || !password || !username}
          className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
      </div>

      <div>
        Already have an account?&nbsp;
        <Link to='/' className="text-indigo-800 text-sm">Login</Link>
      </div>
      {
        message &&
        <div className="bg-indigo-800 text-white rounded px-2 py-2 mt-2">{message}</div>
      }

    </div>
  )
}
