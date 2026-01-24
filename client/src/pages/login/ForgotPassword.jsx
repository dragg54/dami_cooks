import { Button } from "@/components/button/Button"
import { clearUser } from "@/redux/UserSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { PostSendPasswordReset } from "./api/PostSendPasswordReset"
import Login from "./Login"
import PasswordResetLinkSuccess from "./PasswordResetLinkSuccess"

const ForgotPassword = () => {
    const [ inputValues, setInputValues ] = useState()
        const { mutate, isLoading, error, isSuccess } = PostSendPasswordReset()   

        const isValidEmail = () =>{
        const emailValue = inputValues?.replace(/\s/g, "");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(emailValue)
    }
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(clearUser())
    }, [])
    const handleSubmit = (e) =>{
        e.preventDefault()
        mutate({email: inputValues})
    }

    const handleChange = (e) =>{
         setInputValues(e.target.value)
    }

    if(!isLoading && isSuccess){
        return <PasswordResetLinkSuccess />
    }
  return (
    <div className="w-screen h-screen p-12">
        <h1 className="text-3xl font-semibold mt-6 ">Password Reset</h1>
        <p className="mt-4">
            You are about to reset your password. A reset link will be forwarded to your email.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col">
            <input onChange={handleChange} placeholder="Email" type="text" className="w-full md:w-[400px] !border border-gray-400 rounded-md px-3 py-2"/>
            <Button isLoading={isLoading} disabled={!isValidEmail()} className={'!w-20 !py-2 !mt-3'}>Submit</Button>
        </form>
    </div>
  )
}

export default ForgotPassword