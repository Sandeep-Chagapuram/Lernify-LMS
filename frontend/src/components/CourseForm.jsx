import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"
export default function CourseForm() {
    const location = useLocation()
    const user = location.state?.user
    const id = location.state?.id
    // console.log(user, id)
    const [_id, setId] = useState(null)
    useEffect(() => {
        if (id != undefined) {
            setId(id)
        }
        else {
            setId(user._id)
        }
    }, [])

    const [course, setCourse] = useState({
        title: '',
        description: '',
        instructor: null,
        lessons: [''],
        enrollments: 0
    })
    useEffect(() => {
        if (_id) {
            setCourse({ ...course, instructor: _id })
        }
    }, [_id])
    // console.log(course)
    const [lessonCount, setLessonCount] = useState(0)
    function handleChange(e) {
        setCourse({ ...course, [e.target.name]: e.target.value })
    }
    function handleLessonChange(e, idx) {
        const newLessons = [...course.lessons]
        newLessons[idx] = e.target.value
        setCourse({ ...course, lessons: newLessons })
    }
    async function handleClick() {
        const res = await fetch("http://localhost:3000/addcourse", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        })
        setCourse({
            title: '',
            description: '',
            instructor: id,
            lessons: [''],
            enrollments: 0
        })
        setLessonCount(0)
        alert("Add your course.")
        window.location.reload()
    }

    return <>
        <div className=" bg-[#ebf2f9d7] rounded-xl shadow w-2/3 mx-4 my-3 p-5 flex flex-col items-center">
            <h1 className="font-semibold text-xl mb-2">Fill the details</h1>
            <input className="border-1 rounded-lg px-3 py-1 my-2 bg-[#b7cbde9d]" type="text" value={course.title} name="title" placeholder="Enter title of the course" onChange={handleChange} />
            <textarea className="border-1 rounded-lg px-3 py-1 my-2 bg-[#b7cbde9d]" name="description" placeholder="Enter description" value={course.description} onChange={handleChange}></textarea>

            <button className="cursor-pointer hover:bg-[#5a7c9e9d] bg-[#739fcb9d] px-2 py-1 rounded-lg" onClick={() => { setLessonCount(prev => prev + 1) }}>Add lesson</button>
            <div className="flex flex-col items-center bg-[#e4eaed] mt-3 py-2 px-5 rounded-2xl">
                {
                    Array.from({ length: lessonCount }).map((_, idx) => {
                        return <input className="border-1 rounded-lg px-3 py-1 my-2 bg-[#b7cbde9d]" type="text" placeholder="Enter lesson url" key={idx} onChange={(e) => { handleLessonChange(e, idx) }} />
                    })
                }

            </div>

            <button className="bg-[#1b57869d] px-2 py-1 rounded-2xl text-[#f6f6f6] mt-8 transition-all cursor-pointer hover:scale-105" onClick={handleClick}>Add course</button>
        </div>
    </>
}