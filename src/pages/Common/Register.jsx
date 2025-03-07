import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import userAxiosInstance from '../../axios/UserAxios'; 
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';


const schema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." })
      .regex(/^[a-zA-Z0-9]+$/, { message: "Username should only contain letters and numbers" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string({ required_error: "Confirm password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords must match",
        code: "custom",
      });
    }
  });


function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: {errors, isSubmitting}, clearErrors} = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async(data)=>{
    console.log(data)
    const { username, email, password } = data;
    localStorage.setItem('registeredEmail', email)
    try {
      await userAxiosInstance.post('/register/', { username, email, password });
      navigate('/login')
      toast.success('Successfully registered')

    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed'
      toast.error(errorMessage)
    }
  }



  return (
    <div className='bg-gradient-to-tl from-[#fbffac] to-[#ffff] w-screen min-h-screen flex'>
      <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Username</label>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white"
                />
                {
                  errors.username &&
                  <span className='text-red-400'>{errors.username.message}</span>
                }
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Email</label>
                <input
                  {...register("email")}
                  type=""
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-full border border-gray-200 bg-white"
                />
                {
                  errors.email &&
                  <span className='text-red-400'>{errors.email.message}</span>
                }
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Password</label>
                <div className="relative">
                  <input
                    {...register("password")}
                    placeholder='Enter your password'
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-full border border-gray-200 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {
                  errors.password &&
                  <span className='text-red-400'>{errors.password.message}</span>
                }
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Confirm Password</label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    placeholder='Re-enter your password'
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-full border border-gray-200 pr-10 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {
                  errors.confirmPassword &&
                  <span className='text-red-400'>{errors.confirmPassword.message}</span>
                }
              </div>

              <button className="w-full py-2 px-4 rounded-full bg-[#f7f478] hover:bg-[#fffd7d] text-black">
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
                <Link to="/login" className="text-blue-600 ml-1 hover:underline">
                  Sign in
                </Link>
              </p>
              <a href="#" className="text-gray-600 hover:underline">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-[55%] p-5">
        <video
          src="/public/loginVideo2.mp4"
          alt="Platform preview showing calendar and team collaboration"    
          autoPlay
          muted
          loop
          playsInline
          className="object-cover rounded-lg w-full h-full "
        />
      </div>

      {/* Close Button */}
      {/* <button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button> */}

    </div>
  )
}

export default Register
