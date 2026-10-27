import  { toast } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { isAxiosError } from 'axios';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiUser, FiAtSign, FiMail, FiCalendar, FiLock, FiLoader } from 'react-icons/fi';
import { SigninSchema , type SigninType } from '../../schemas/SigninSchema';
import AuthContext, { createdContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
    const { token, addDataToToken } = useContext(createdContext);
   const [loading, setloading] = useState(false);
     const nav = useNavigate()
     
    
       const { handleSubmit, register, formState } = useForm({
         defaultValues: {
           name: "",
           username: "",
           email: "",
           dateOfBirth: undefined,
           gender: undefined,
           password: "",
           rePassword: "",
         },

         resolver: zodResolver(SigninSchema),
       });
       
     async function myHandelSubmit(values: SigninType
      
    ) {
       try {
        setloading(true)
        let {data} = await axios.post(
          "https://route-posts.routemisr.com/users/signin",
          values,
        );
         toast.success(data.message)
         addDataToToken(data.data.token)
         console.log(data.data.token)
         nav("/home");
       } catch (error) {
         
        if (isAxiosError(error)) {
          toast.danger(error.message)
          console.log(error.message)
        }
       } finally {
         setloading(false);
      }
    }
   
     
   
         return (
           <>
             <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100  p-4">
               <div className="container mx-auto my-auto flex  items-center justify-center">
                 <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
                   {/* الجزء الشمال: الكلام التعريفي */}
                   <div className="flex flex-col justify-center bg-gradient-to-br from-sky-700 to-indigo-700 p-8 text-white md:p-12">
                     <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                       Your people are already here.
                     </h1>
                     <p className="mt-4 max-w-sm text-sky-100">
                       Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                       Laboriosam incidunt, repudiandae dolore earum molestiae
                       voluptas ducimus vitae esse nobis non blanditiis
                       exercitationem quo?
                     </p>
                   </div>

                   {/* الجزء اليمين: الفورم */}
                   <div className="p-6 sm:p-10">
                     <h2 className="text-2xl font-semibold text-slate-900">
                       Login into your account
                     </h2>

                     <form
                       className="mt-6 space-y-4"
                       onSubmit={handleSubmit(myHandelSubmit)}
                     >
                       

                       {/* Email */}
                       <div>
                         <label
                           htmlFor="email"
                           className="mb-1.5 block text-sm font-medium text-slate-700"
                         >
                           Email
                         </label>
                         <div className="relative">
                           <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input
                             {...register("email")}
                             className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                             id="email"
                             type="email"
                           />
                         </div>
                         {formState.errors.email && (
                           <p className="mt-1.5 text-xs text-red-600">
                             {formState.errors.email.message}
                           </p>
                         )}
                       </div>

                       {/* Password */}
                       <div>
                         <label
                           htmlFor="password"
                           className="mb-1.5 block text-sm font-medium text-slate-700"
                         >
                           Password
                         </label>
                         <div className="relative">
                           <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                           <input
                             {...register("password")}
                             className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                             id="password"
                             type="password"
                           />
                         </div>
                         {formState.errors.password && (
                           <p className="mt-1.5 text-xs text-red-600">
                             {formState.errors.password.message}
                           </p>
                         )}
                       </div>

                       <button
                         type="submit"
                         disabled={loading}
                         className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-700 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
                       >
                         {loading ? (
                           <>
                             <FiLoader className="animate-spin" /> loading
                           </>
                         ) : (
                           "login"
                         )}
                       </button>
                       {/* <button
                         className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-700 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
                         onClick={function(){nav("/signup");}}
                       >
                         I don't have account
                         
                       </button> */}
                     </form>
                   </div>
                 </div>
               </div>
             </div>
           </>
         );
        
  
}
