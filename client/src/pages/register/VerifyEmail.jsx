import { Button } from "@/components/button/Button";
import Image from "@/components/image/Image";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyToken } from "./api/VerifyToken";
import { useSelector } from "react-redux";
import { ResendVerificationToken } from "./api/ResendVerificationToken";

const VerifyEmail = () => {
    const state = useLocation().state
    const email = state?.email
    const verifyTokenMutation = VerifyToken()
    const [values, setValues] = useState(Array(6).fill(''));
    const inputs = useRef([]);
    const user = useSelector(state => state.user)
    const resendVerificationToken = ResendVerificationToken()
    const navigate = useNavigate()
     const handleTokenComplete = (token) => {
       verifyTokenMutation.mutate({email, token})
  };
    const handleChange = (val, index) => {
        if (!/^[a-zA-Z0-9]?$/.test(val)) return;
        const newValues = [...values];
        newValues[index] = val;
        setValues(newValues);

        if (val && (index < 5)) {
            inputs.current[index + 1].focus();
        }

        if (newValues.every(v => v !== '')) {
            handleTokenComplete(newValues.join(''));
        }
    };

    useEffect(()=>{
        if(user?.user){
            resendVerificationToken.mutate({email})
        }
    },[])

    const handleResendToken = () =>{
         resendVerificationToken.mutate({email})
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (values[index] === '' && index > 0) {
                inputs.current[index - 1].focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputs.current[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };
    if(!email){
        navigate("/")
    }
    return (
        <div className="w-full md:w-1/3 p-3 md:p-6 mx-auto flex flex-col items-center ">
            <h1 className="font-semibold mt-6 text-4xl">Verify Email Address</h1>
            <Image src={'/images/Email.png'}/>
            <p className="mt-8 text-center">Check your email for a 6-digit OTP has been sent to <strong>{email}</strong></p>
            <div className="mt-5 flex gap-2">
                {values.map((val, i) => (
                    <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        ref={(el) => (inputs.current[i] = el)}
                        className="border border-gray-600 w-10 py-2 p-3 md:w-20 md:p-4 rounded-md"
                    />
                ))}
            </div>
            <small>{"Didn't"} receive code? <strong className="text-red-600" onClick={() => handleResendToken()}>Resend</strong></small>
            <Button isLoading={verifyTokenMutation.isLoading} className={'mt-8 !py-3 !font-semibold'}>Verify Email</Button>
        </div>
    )
}

export default VerifyEmail