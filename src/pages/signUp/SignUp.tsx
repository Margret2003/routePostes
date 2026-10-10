import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from 'axios';
import { schema , type signupType} from "../../schemas/SignUp.schema";
import {  toast } from "@heroui/react";
import { useState } from "react";


const [loading, setloading] = useState(false)




export default function SignUp() {
 
    let { handleSubmit , register ,formState}=  useForm({
      defaultValues: {
        name: "",
        username: "",
        email: "",
        dateOfBirth: "",
        gender: 'male',
        password: "",
        rePassword: "",
      },

      resolver: zodResolver(schema)
    });
    
  async function myHandelSubmit(values: signupType
   
 ) {
    try {
     setloading(true)
     let res = await axios.post(
       "https://route-posts.routemisr.com/users/signup",
       values,
     );
      toast(res.data.message)
      
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
        <div className="bg-blue-50 p-5 rounded-3xl">
          <div className="flex container min-h-screen justify-around  ">
            <div className="md:w-1/3  content-center">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Laboriosam incidunt, repudiandae dolore earum molestiae voluptas
                ducimus vitae esse nobis non blanditiis exercitationem quo? Iure
                voluptate quibusdam modi dolorum unde. Sapiente?
              </p>
            </div>

            <div className=" md:w-1/3 content-center">
              <form
                className="bg-white p-5"
                onSubmit={handleSubmit(myHandelSubmit)}
              >
                <div className="flex flex-col pb-4  ">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      {...register("name")}
                      className="border rounded-xl m-1.5 w-1/2"
                      id="name"
                      type="text"
                    />

                    {formState.errors.name && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="userName">userName</label>
                    <input
                      {...register("username")}
                      className="border rounded-xl m-1.5 w-1/2"
                      id="userName"
                      type="text"
                    />
                    {formState.errors.username && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.username.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      {...register("email")}
                      className="border rounded-xl m-1.5 w-1/2"
                      id="email"
                      type="email"
                    />
                    {formState.errors.email && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="birthdate">Date of birth</label>
                    <input
                      {...register("dateOfBirth")}
                      className="border rounded-xl m-1.5 w-1/2"
                      id="birthdate"
                      type="date"
                    />
                    {formState.errors.dateOfBirth && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      {...register("password")}
                      className="border rounded-xl m-1.5 w-1/2"
                      id="password"
                      type="password"
                    />
                    {formState.errors.password && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="repassword">repassword</label>
                    <input
                      {...register("rePassword")}
                      className="border rounded-xl m-1.5 w-1/2"
                      id="repassword"
                      type="password"
                    />
                    {formState.errors.rePassword && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.rePassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mr-3">gender</label>
                    <label className="m-2">femail</label>
                    <input
                      type="radio"
                      id="gender"
                      value ="femail"
                      {...register("gender")}
                    />

                    <label className="m-2">male</label>
                    <input
                      type="radio"
                      id="gender"
                      value="male"
                      {...register("gender")}
                    />
                    {formState.errors.gender && (
                      <p className="bg-red-300 text-red-600 w-fit p-2 rounded-3xl">
                        {formState.errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="p-2 bg-sky-700 rounded-2xl hover:bg-sky-200"
                >
                 {loading ? "loading" : "submit"} 
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}
