import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long."})
    .regex(/^[a-zA-Z0-9]+$/, { message: "Username should be only characters and numbers"}),
  email: z
    .string()
    .email({ message: "Please provide a valid email address"}),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long"})
    .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
    .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
    .regex(/[0-9]/, {message: "Password must contain at least one number"})
})



function Register() {
  const [showPassword, setShowPassword] = useState(false)


  return (
    <div className='bg-amber-100 w-screen min-h-screen flex'>
      <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col bg-gray-50">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-xl text-gray-600 font-medium">PingPong</h1>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">Create an account</h2>
              {/* <p className="text-gray-500">Sign up and get 30 day free trial</p> */}
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Full name</label>
                <input
                  type="text"
                  placeholder="Amélie Laurent"
                  className="w-full px-4 py-2 rounded-full border border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="amélielaurent7622@gmail.com"
                  className="w-full px-4 py-2 rounded-full border border-gray-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-full border border-gray-200 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button className="w-full py-2 px-4 rounded-full bg-amber-200 hover:bg-[#FFD147]/90 text-white">
                Submit
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-gray-200" />
                <span className="text-sm text-gray-500">or</span>
                <div className="h-[1px] flex-1 bg-gray-200" />
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-full border border-gray-200">
                  <Image src="/placeholder.svg" alt="Apple logo" width={20} height={20} className="mr-2" />
                  Apple
                </Button>
                <Button variant="outline" className="rounded-full border border-gray-200">
                  <Image src="/placeholder.svg" alt="Google logo" width={20} height={20} className="mr-2" />
                  Google
                </Button>
              </div> */}
            </form>

            <div className="flex justify-between text-sm">
              <p className="text-gray-600">
                Have any account?
                <a href="#" className="text-blue-600 ml-1 hover:underline">
                  Sign in
                </a>
              </p>
              <a href="#" className="text-gray-600 hover:underline">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register
