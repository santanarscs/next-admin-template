import React, { useState } from "react";
import { AuthInput } from "../components/auth/AuthInput";
import { WarningIcon } from "../components/icons";
import { useAuth } from "../data/hook/useAuth";

export default function Auth() {
  
  const { register, login, loginGoogle } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')

  function showError(message: string, timer = 5) {
    setError(message)
    setTimeout(() => setError(null), timer * 1000)
  }

  async function submit() {
    try {
      if(mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
    } catch (e) {
      showError(e?.message)
    }
  }
  
  return (
    <div className="flex h-screen items-center justify-center">
      <div className=" hidden md:block md:w-1/2  lg:w-2/3">
        <img src="https://source.unsplash.com/random" alt="Image Auth" className="h-screen object-cover w-full" />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-5">
          {mode === 'login' ? 'Enter with your credentials' : 'Register in our platform'}
        </h1>
        {error ? (
          <div className="flex item-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
            {WarningIcon()}
            <span className="ml-3">{error}</span>
          </div>
        ) : false}
       
        <AuthInput 
          label="E-mail"
          type="email"
          value={email}
          onChangeValue={setEmail}
          required
        />
        <AuthInput 
          label="Password"
          type="password"
          value={password}
          onChangeValue={setPassword}
          required
        />
        <button onClick={submit} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
          {mode === 'login' ? 'SigIn' : 'Register'}
        </button>
        <hr className="my-6 border-gray-300"/>
        <button onClick={loginGoogle} className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3">
          Enter with Google
        </button>
        {mode === 'login' 
          ? (
            <p className="mt-8">
              Do you not have a account ? <a onClick={() => setMode('register')} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">Create a new account here</a>
            </p>
          )
          : (
            <p className="mt-8">
              Do you have a account? <a onClick={() => setMode('login')} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer">Enter with your credentials </a>
            </p>
          )
        }
      </div>
    </div>
  )
}
