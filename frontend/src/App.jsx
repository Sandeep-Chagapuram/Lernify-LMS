import { NavLink, Outlet, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"

export default function App() {
  const location = useLocation()
  const isRoot = location.pathname === '/'
  return <>
    <Navbar />
    <section className="-mt-5 pb-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col justify-start pt-15 items-center text-center px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6">
          Learn New Skills, Anytime, Anywhere
        </h2>
        <p className="text-xl mb-8 max-w-2xl">
          Join thousands of learners and instructors on Learnify. Access courses
          in programming, design, marketing, and more.
        </p>
      </div>
      <div>

        <main className={`${isRoot ? "-mt-63" : "mt-4"} gap-2 flex justify-center `}>
          <NavLink to='/login' className={({ isActive }) =>
            isActive ? "authActive " : "authInactive"} >Login</NavLink>
          <NavLink to='/signup' className={({ isActive }) =>
            isActive ? "authActive" : "authInactive"}>Sign up</NavLink>
        </main>
        <div className="mx-5">
          <Outlet />
        </div>
      </div>

    </section>





  </>

}