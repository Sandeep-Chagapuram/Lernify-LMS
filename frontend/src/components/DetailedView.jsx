import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"
export default function DetailedView() {
    const location = useLocation()
    const course = location.state?.course
    return <>
        <Navbar />
        <div className="text-center text-[#4a72aa] font-extrabold text-3xl">Course Details</div>
        <div className="px-5">
            <div className="flex flex-col gap-5 my-8 mx-auto shadow-2xl max-w-[500px] px-6 py-7 rounded-3xl bg-[#fbfbfb]">
                <h1 className="flex gap-2 font-bold text-2xl items-end">Title: <p className="font-medium text-xl">{course.title}</p></h1>

                <h2 className="font-bold text-2xl items-end">Description: <p className="font-normal text-[15px] text-gray-600 mt-1 ml-3">{course.description?course.description:"No info"}</p></h2>

                <h3 className="flex gap-2 font-bold text-2xl items-end">Instructor: <p className="text-[15px] ml-1 text-gray-700 font-normal">{course.instructor?.name?course.instructor.name:"No info"}</p></h3>
                <h3 className="font-bold text-2xl items-end flex flex-wrap">Instructor email: <p className="text-[15px] text-gray-700 font-normal ml-3">{course.instructor?.email?course.instructor.email:"No info"}</p></h3>
                <h2 className="text-2xl font-bold">Lessons:</h2>
                {
                    course.lessons.map((item, idx) => {
                        return  <a key={idx} href={item} target="_blank"><h5 className="flex justify-between bg-gray-200 py-2 px-5 hover:scale-105 hover:shadow-2xl rounded-lg transition-all hover:font-semibold hover:bg-gray-300" ><p>Lesson {idx + 1}</p><p className="text-sm text-gray-500  ">Click to view</p></h5></a>
                    })
                }
            </div>
        </div>
    </>
}