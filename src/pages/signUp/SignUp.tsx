import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from 'axios';
import { signupSchema, type signupType } from "../../schemas/SignUp.schema";
import {  toast } from "@heroui/react";
import { useState } from "react";
import {
  FiUser,
  FiAtSign,
  FiMail,
  FiCalendar,
  FiLock,
  FiLoader,
} from "react-icons/fi";
import { useNavigate } from 'react-router-dom';






export default function SignUp() {
  let nav = useNavigate()
  const [loading, setloading] = useState(false);
   

  
 
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

      resolver: zodResolver(signupSchema),
    });
    
  async function myHandelSubmit(values: signupType
   
 ) {
    try {
     setloading(true)
     let res = await axios.post(
       "https://route-posts.routemisr.com/users/signup",
       values,
     );
      toast.success(res.data.message)
      nav("/signin");
      
     console.log(res);
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
        <div className="max-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100  p-4">
          <div className="container mx-auto flex  items-center justify-center">
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
                  Create your account
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  It takes less than a minute.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={handleSubmit(myHandelSubmit)}
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        {...register("name")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        id="name"
                        type="text"
                      />
                    </div>
                    {formState.errors.name && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Username */}
                  <div>
                    <label
                      htmlFor="userName"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      userName
                    </label>
                    <div className="relative">
                      <FiAtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        {...register("username")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        id="userName"
                        type="text"
                      />
                    </div>
                    {formState.errors.username && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {formState.errors.username.message}
                      </p>
                    )}
                  </div>

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

                  {/* Date of birth */}
                  <div>
                    <label
                      htmlFor="birthdate"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Date of birth
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        {...register("dateOfBirth")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        id="birthdate"
                        type="date"
                      />
                    </div>
                    {formState.errors.dateOfBirth && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {formState.errors.dateOfBirth.message}
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

                  {/* Re-password */}
                  <div>
                    <label
                      htmlFor="repassword"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      repassword
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        {...register("rePassword")}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                        id="repassword"
                        type="password"
                      />
                    </div>
                    {formState.errors.rePassword && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {formState.errors.rePassword.message}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-700">
                      gender
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          value="female"
                          className="peer sr-only"
                          {...register("gender")}
                        />
                        <span className="block rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-sm text-slate-600 transition peer-checked:border-sky-600 peer-checked:bg-sky-50 peer-checked:font-medium peer-checked:text-sky-700">
                          female
                        </span>
                      </label>

                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          value="male"
                          className="peer sr-only"
                          {...register("gender")}
                        />
                        <span className="block rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-sm text-slate-600 transition peer-checked:border-sky-600 peer-checked:bg-sky-50 peer-checked:font-medium peer-checked:text-sky-700">
                          male
                        </span>
                      </label>
                    </div>
                    {formState.errors.gender && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {formState.errors.gender.message}
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
                      "submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      );
    

    //=========================================================================//
    // <>
    //   <div className="bg-blue-50 p-5 rounded-3xl">
    //     <div className="flex container min-h-screen justify-around  ">
    //       <div className="md:w-1/3  content-center">
    //         <p>
    //           Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //           Laboriosam incidunt, repudiandae dolore earum molestiae voluptas
    //           ducimus vitae esse nobis non blanditiis exercitationem quo? Iure
    //           voluptate quibusdam modi dolorum unde. Sapiente?
    //         </p>
    //       </div>

    //       <div className=" md:w-1/3 content-center">
    //         <form
    //           className="bg-white p-5"
    //           onSubmit={handleSubmit(myHandelSubmit)}
    //         >
    //           <div className="flex flex-col pb-4  ">
    //             <div>
    //               <label htmlFor="name">Name</label>
    //               <input
    //                 {...register("name")}
    //                 className="border rounded-xl m-1.5 w-1/2"
    //                 id="name"
    //                 type="text"
    //               />

    //               {formState.errors.name && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.name.message}
    //                 </p>
    //               )}
    //             </div>

    //             <div>
    //               <label htmlFor="userName">userName</label>
    //               <input
    //                 {...register("username")}
    //                 className="border rounded-xl m-1.5 w-1/2"
    //                 id="userName"
    //                 type="text"
    //               />
    //               {formState.errors.username && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.username.message}
    //                 </p>
    //               )}
    //             </div>
    //             <div>
    //               <label htmlFor="email">Email</label>
    //               <input
    //                 {...register("email")}
    //                 className="border rounded-xl m-1.5 w-1/2"
    //                 id="email"
    //                 type="email"
    //               />
    //               {formState.errors.email && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.email.message}
    //                 </p>
    //               )}
    //             </div>
    //             <div>
    //               <label htmlFor="birthdate">Date of birth</label>
    //               <input
    //                 {...register("dateOfBirth")}
    //                 className="border rounded-xl m-1.5 w-1/2"
    //                 id="birthdate"
    //                 type="date"
    //               />
    //               {formState.errors.dateOfBirth && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.dateOfBirth.message}
    //                 </p>
    //               )}
    //             </div>
    //             <div>
    //               <label htmlFor="password">Password</label>
    //               <input
    //                 {...register("password")}
    //                 className="border rounded-xl m-1.5 w-1/2"
    //                 id="password"
    //                 type="password"
    //               />
    //               {formState.errors.password && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.password.message}
    //                 </p>
    //               )}
    //             </div>
    //             <div>
    //               <label htmlFor="repassword">repassword</label>
    //               <input
    //                 {...register("rePassword")}
    //                 className="border rounded-xl m-1.5 w-1/2"
    //                 id="repassword"
    //                 type="password"
    //               />
    //               {formState.errors.rePassword && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.rePassword.message}
    //                 </p>
    //               )}
    //             </div>

    //             <div>
    //               <label className="mr-3">gender</label>
    //               <label className="m-2">femail</label>
    //               <input
    //                 type="radio"
    //                 id="gender"
    //                 value ="femail"
    //                 {...register("gender")}
    //               />

    //               <label className="m-2">male</label>
    //               <input
    //                 type="radio"
    //                 id="gender"
    //                 value="male"
    //                 {...register("gender")}
    //               />
    //               {formState.errors.gender && (
    //                 <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
    //                   {formState.errors.gender.message}
    //                 </p>
    //               )}
    //             </div>
    //           </div>

    //           <button
    //             type="submit"
    //             className="p-2 bg-sky-700 rounded-2xl hover:bg-sky-200"
    //           >
    //            {loading ? "loading" : "submit"}
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </>
  
}
