import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import UserHome from './components/UserHome.jsx'
import InstructorHome from './components/InstructorHome.jsx'
import CourseForm from './components/CourseForm.jsx'
import DetailedView from './components/DetailedView.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Page not found!</div>,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      
    ],
  },
  {
    path:'/userHome',
    element:<UserHome/>
  },
  {
    path:'/instructorHome',
    element:<InstructorHome/>,
    children:[
      {
        path:'courseForm',
        element:<CourseForm/>
      }
    ]
  },
  {
    path:"/detailedView",
    element:<DetailedView/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
