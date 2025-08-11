import { useLocation } from "react-router-dom"
import Courses from "./courses"
import { useEffect } from "react"
import { useState } from "react"
import Navbar from "./Navbar"
export default function UserHome() {
    const location = useLocation()
    const user = location.state?.user
    const id = location.state?.id
    const [_id,set_id]=useState(null)
    const [enrollments,setEnrollments]=useState(null)
    const [updatedUser,setUpdatedUser]=useState(null)
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        if(id!==null && id!==undefined){
            set_id(id)
        }else{
            set_id(user._id)
        }
    },[user,id])
    useEffect(()=>{
        if(_id){
            getUserDetails()
        }
    },[_id])
    useEffect(()=>{
        if(updatedUser && updatedUser.enrolledCourses){
            setEnrollments(updatedUser.enrolledCourses.length)
        }
    },[updatedUser])
    async function getCourses() {
        const res = await fetch("http://localhost:3000/getcourses")
        const data = await res.json()
        setCourses(data)
    }
    async function  getUserDetails() {
         const res = await fetch("http://localhost:3000/getUserDetails",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:_id})
        })
        const data = await res.json()
        setUpdatedUser(data)
    }
    useEffect(() => {
        getCourses()
    }, [])

    return <>
        <Navbar />
        <div className="flex gap-2 justify-end px-5 items-start "><div className="bg-gray-100 px-3 py-2 rounded-3xl shadow-lg mb-2 flex gap-2 items-end"><p className="text-[12px]">Total enrollments :</p> <p className="text-sm font-semibold">{enrollments?enrollments:"none"}</p></div></div>
        <h1 className="text-4xl font-bold mx-3 text-[#a45146]">Welcome, {user.name}!</h1>
        <h3 className="mx-4 mt-2 text-[#4b1b149d]">Ready to learn something new today?</h3>

        <div className="mb-12 mt-10 mx-3">
            <h1 className="text-lg font-medium mb-2">Courses Available</h1>
            <div className="bg-gray-100 rounded-3xl min-h-12 p-5 flex gap-4 flex-wrap">
                {courses.length > 0 ?(courses.map((item) => {
                    return <Courses key={item._id} course={item} user={updatedUser} />
                })):<h3>no courses available</h3>}

            </div>

        </div>

    </>
}