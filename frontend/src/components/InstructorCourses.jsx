export default function InstructorCourses({ course, getFunction }) {

    async function handleDelete() {
        await fetch("http://localhost:3000/deleteCourse", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        })
        getFunction()
    }
    return <>
        <div className="flex flex-col bg-[#fafafa] w-44 hover:scale-105 transition-all hover:shadow-2xl shadow-lg rounded-2xl  py-4 px-3">
                <h2 className="text-xl font-bold mb-3">{course.title}</h2>
                <h5 className="text-[12px] text-gray-700 font-medium flex gap-2 mb-1">No of enrollments :<p>{course.enrollments}</p> </h5>
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="h-9 text-[12px] overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-700">{course.description}</p>
            <button className="bg-red-600 rounded-lg hover:bg-red-900 font-medium text-white cursor-pointer transition-all text-[15px] w-5/6 mx-auto" onClick={handleDelete}>Delete course</button>

        </div>
    </>
}