import { useState } from "react"
import UserHome from "./UserHome"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Login() {
    const [LoginData, setLoginData] = useState({ email: '', password: '' })
    const [Loggedin, setLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (Loggedin) {
            if (userData.role == 'Learner') {
                navigate('/userHome', { state: { user: userData } })
            }
            if (userData.role == 'Instructor') {
                navigate('/instructorHome', { state: { user: userData } })
            }

        }
    }, [Loggedin])
    async function handleClick() {
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(LoginData)
        })
        if (res.status == 401) {
            alert("Invalid credentials, please check you inputs !")
        }
        else {
            const data = await res.json()
            setLoggedin(true)
            setUserData(data)
        }
    }

    function handleChange(e) {
        setLoginData({ ...LoginData, [e.target.name]: e.target.value })

    }

    return <>
            <form onSubmit={(e)=>{
            e.preventDefault()
             handleClick()}}
              className=" shadow-lg mt-14 bg-[#ebf2f989] rounded-xl flex flex-col items-center py-8 px-5 w-2/3 max-w-96 mx-auto ">
            <input required className="authInp" type="text" name="email" placeholder="Enter email" onChange={handleChange} />

            <input required className="authInp" type="password" name="password" placeholder="Enter password" onChange={handleChange} />

            <button type="submit" className="authBtn">Login</button>
        </form>
    </>
}