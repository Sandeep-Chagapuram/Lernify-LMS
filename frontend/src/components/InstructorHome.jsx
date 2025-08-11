import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import InstructorCourses from "./InstructorCourses";
import Navbar from "./Navbar";

export default function InstructorHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [_id,setId]= useState(null)
  const user = location.state?.user;
  const id = location.state?.id;
  console.log(`user ${user}, id ${id}`)
  console.log(user)

  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(()=>{
    if(id!=undefined){
      setId(id)
    }
    else{
      setId(user._id)
    }
  },[])


  async function getCourses() {
    console.log(`id sending is ${_id}`)
    const res = await fetch("http://localhost:3000/getInstructorCourses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user, id: _id }),
    });
    const data = await res.json();
    setCourses(data);
  }

  useEffect(() => {
    if(_id){

      getCourses();
    }
  }, [_id]);

  useEffect(() => {
    setShowForm(location.pathname.includes("courseForm"));
  }, [location.pathname]);

  function handleToggle() {
    if (showForm) {
      navigate("/instructorHome", { state: { user, id } });
    } else {
      navigate("courseForm", { state: { user, id } });
    }
  }

  if (!user) {
    return <div>Your data not found</div>;
  }

  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold flex gap-3 mb-8 mx-3 text-[#1a3c73e8]">
        Hello, Instructor {user.name}!
      </h1>

      <button
        className="mx-3 bg-[#7aa5b9d7] px-2 py-1 rounded-2xl"
        onClick={handleToggle}
      >
        {showForm ? "Close form" : "Add course"}
      </button>

      <Outlet />

      <div className="mb-32">
        <h1 className="mx-5 mt-8 mb-3 text-xl font-semibold">Your courses</h1>
        <div className="bg-gray-100 mx-5 rounded-3xl p-5  flex gap-5 flex-wrap">
        {
            courses.length>0?courses.map((item) => (
          <InstructorCourses
            course={item}
            getFunction={getCourses}
            key={item._id}
          />
        )): <h1>You haven’t published any courses yet.</h1>
        }
      </div>
      </div>
    </>
  );
}
