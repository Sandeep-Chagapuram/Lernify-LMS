import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Courses({course,user}){
    const [enrollment,setEnrollment]=useState(course.enrollments)
    const [enrolledCourses,setEnrolledCourses]=useState([])
    useEffect(()=>{
        if(user && user.enrolledCourses){
            setEnrolledCourses(user.enrolledCourses)
        }
    },[user])
    useEffect(()=>{
        if(course&&enrolledCourses){
            setEnrolled(enrolledCourses.includes(course._id))

        }
    },[enrolledCourses])
    const [enrolled,setEnrolled]=useState(false)
    const navigate= useNavigate()

    async function handleEnroll(){
        await fetch(`http://localhost:3000/enroll/${course._id}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({id:user._id})
        })
        setEnrollment(enrollment+1)
        alert(`Enrolled in ${course.title}`)
        setEnrolled(true)
        // window.location.reload()
    }
    function handleClick(course){
        navigate("/detailedView",{state:{course}})
    }
    return<>
        <div className="flex flex-col bg-[#fafafa] w-44 hover:scale-105 transition-all hover:shadow-2xl shadow-lg rounded-2xl  py-4 px-3 hover:cursor-pointer" onClick={()=>{handleClick(course)}}>
            <h1 className="text-xl font-bold mb-3">{course.title}</h1>
            <h4 className="text-[12px] text-gray-700 font-medium flex gap-2 mb-1 items-center">Instructor: <p className="text-gray-800 text-sm">{course.instructor ? course.instructor.name : 'No instructor info'}</p></h4>
            <h5 className="text-[12px] text-gray-700 font-medium flex gap-2 mb-1">No. of enrollments: {enrollment}</h5>
            {
                enrolled?<button className="bg-blue-800 rounded-lg font-medium text-white cursor-pointer transition-all text-[15px] w-5/6 mx-auto mt-2">Enrolled</button>:<button className="bg-green-800 rounded-lg hover:bg-green-900 font-medium text-white cursor-pointer transition-all text-[15px] w-5/6 mx-auto mt-2" onClick={(e)=>{
                e.stopPropagation();handleEnroll()}}>Enroll</button>
            }
            
            <p className="text-center mt-2 text-[10px] text-gray-600">Click to know more</p>
        </div>

    </>
}