import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export default function SignUp() {
    const [SignupData, setSignupData] = useState({ name: '', email: '', password: '', role: '' })
    const [Signedin, setSignedin] = useState(false)
    const navigate = useNavigate()
    const [id, setId] = useState(null)
    useEffect(() => {
        if (Signedin && id) {
            // console.log("in signin page")
            // console.log(SignupData)
            if (SignupData.role == 'Learner') {
                navigate('/userHome', { state: { user: SignupData, id: id } })
            }
            if (SignupData.role == 'Instructor') {
                navigate('/instructorHome', { state: { user: SignupData, id: id } })
            }
        }
    }, [Signedin, SignupData, id])


    async function handleClick() {
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(SignupData)
        })
        const data = await res.json()
        setId(data._id)
        setSignedin(true)
    }

    function handleChange(e) {
        setSignupData({ ...SignupData, [e.target.name]: e.target.value })
    }

    return <>
        <form onSubmit={(e) => {
            e.preventDefault()
            handleClick()
        }}
            className="shadow-lg mt-14 bg-[#ebf2f989] rounded-xl flex flex-col items-center py-8 px-5 w-2/3 max-w-96 mx-auto">
            <input required className="authInp" type="text" name="name" placeholder="Enter name" onChange={handleChange} />
            <input required className="authInp" type="text" name="email" placeholder="Enter email" onChange={handleChange} />
            <input required className="authInp" type="password" name="password" placeholder="Enter password" onChange={handleChange} />
            <div className="bg-[#eceff2] w-50 px-3 py-2 rounded-lg mt-2">
                <h3 className="text-sm font-semibold mb-2 text-black">Selet you role</h3>
                <label className="text-md flex gap-1 text-gray-900">
                    <input type="radio" value='Learner' name="role" checked={SignupData.role == 'Learner'} onChange={handleChange} required />
                    Learner

                </label>
                <label className="text-md mr-2 flex gap-1 text-gray-900">
                    <input type="radio" value='Instructor' name="role" checked={SignupData.role == 'Instructor'} onChange={handleChange} required />
                    Instructor
                </label>
            </div>
            <button type="submit" className="authBtn" >Sign up</button>

        </form>
    </>
}