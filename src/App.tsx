
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './pages/signIn/SignIn'
import SignUp from './pages/signUp/SignUp'
import LayOut from './layOut/LayOut'
import Home from './pages/home/Home'
import { Toast} from "@heroui/react";

let x = createBrowserRouter([

{path : "/signin" , element: <Signin/>},
{path : "/signup" , element: <SignUp/>},
{
    path: "/", element: <LayOut />, children: [
  
 {path: "/home" , element: <Home/>}

]}

])


export default function App() {

  return (
    <>
      <Toast.Provider/>
      <RouterProvider router={x}/>
    </>
  )
}

