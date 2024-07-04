"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '../../lib/reduxhooks';
import { useRouter } from 'next/navigation';

export interface user_obj{
  name:string,
  email:string,
  _id:string,
  profile_url:string
}

 export default function SignUpForm() {
  const loggedIn=useAppSelector((s)=>s.auth.isLoggedIn);
  const dispatch=useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  async function handleLogin() {
    try{
    await signIn("google");
    }
    catch(e){
      console.log(e);
    }
  }


  const onSubmit = (data:{}) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-[100%] flex items-center justify-center bg-gray-900">
      <div className="max-w-[600px] w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-8">Create your Account</h2>
        {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Your email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border border-gray-700 rounded-md bg-gray-900 text-white"
                  placeholder="name@company.com"
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{(errors.email.message) as string}</p>}
          </div>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{ required: 'Full Name is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="fullName"
                  className="mt-1 p-2 w-full border border-gray-700 rounded-md bg-gray-900 text-white"
                  placeholder="e.g. Bonnie Green"
                />
              )}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{(errors.fullName.message) as string}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  className="mt-1 p-2 w-full border border-gray-700 rounded-md bg-gray-900 text-white"
                  placeholder="********"
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{(errors.password.message) as string}</p>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Controller
                name="rememberMe"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <input
                    {...field}
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded bg-gray-900"
                  />
                )}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Email me about product updates and resources.
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create an account
            </button>
          </div>
        </form> */}
        <div className="mt-6 text-center text-gray-400">
          {/* <p>Or sign up with:</p> */}
         
          <div className="flex justify-center mt-4 space-x-4">
          <button onClick={()=>handleLogin()} className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
         <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </svg>
         <span>Continue with Google</span>
     </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            By signing up, you are creating a Hustlers account, and you agree to Hustlers{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-4 text-gray-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-blue-500 hover:underline">
              Login here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};







