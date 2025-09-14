import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({setIsOpen, setIsLogin}) {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [isSignUp,setIsSignUp]=useState(false)
    const [error,setError]=useState("")

    const handleOnSubmit=async(e)=>{
        e.preventDefault()
        let endpoint=(isSignUp) ? "signUp" : "login"
        await axios.post(`http://localhost:3000/${endpoint}`,{email,password})
            .then((res)=>{
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                if (setIsLogin) setIsLogin(true);
                if (isSignUp) {
                    alert("Signup successful!")
                } else {
                    alert("Login successful!")
                }
                setIsOpen()
            })
            .catch(data=>{
                setError(data.response?.data?.error)
                if (isSignUp) {
                    alert("Signup failed: " + (data.response?.data?.error || "Unknown error"))
                } else {
                    alert("Login failed: " + (data.response?.data?.error || "Wrong credentials"))
                }
            })
    }

    return (
        <>
            <form className='form' onSubmit={handleOnSubmit}>
                <div className='form-control'>
                    <label>Email</label>
                    <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)} required></input>
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)} required></input>
                </div>
                <button type='submit'>{(isSignUp) ? "Sign Up": "Login"}</button><br></br>
                { (error =="") && <h6 className='error'>{error}</h6>}<br></br>
                <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Already have an account": "Create new account"}</p>
            </form>
        </>
    )
}