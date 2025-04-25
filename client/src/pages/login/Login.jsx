/* eslint-disable react/no-unescaped-entities */
import { Form, Formik } from "formik"
import TextInput from '../../components/input/TextInput'
import { Button } from '../../components/button/Button'
import CheckBoxInput from "../../components/input/CheckBoxInput"
import Image from "../../components/image/Image"
import { PostLogin } from "./api/PostLogin"
import Spinner from "../../components/Spinner"
import { useNavigate } from "react-router-dom"


const Login = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    const navigate = useNavigate()

    const handleSubmit = (values) =>{
        mutate(values)
    }
    const { mutate, isLoading, error } = PostLogin()   
    
    return (
        <div className="w-full h-screen flex">
            <div className='w-full p-4 md:w-1/2 md:px-20 md:pl-40 md:pr-40 md:mt-20'>
                <p className="font-extrabold mt-6 md:text-3xl text-[#d01110] text-[1.6rem] md:text-[1.8rem]">Sign in</p>
                <small className="text-gray-400">Sign in to your account</small>
                <Formik initialValues={initialValues}
                    // validationSchema={() => null}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(values)
                        resetForm()
                    }}>
                    <Form className="w-full mt-8 flex flex-col  items-center gap-x-3 gap-y-3">
                        <div className="w-full">
                            <TextInput  name='email' label='Email' />
                        </div>
                        <div className="w-full">
                            <TextInput type="password" name='password' label='Password' />
                        </div>
                        <div className="w-full">
                            <CheckBoxInput {...{ name: "termsAndCondition", label: "Remember Me", className: "items-center" }} />
                        </div>
                        <p className="mt-3 cursor-pointer" onClick={()=> navigate("/register")}>Don't have an account yet? <span className="text-yellow-600 ">Sign up</span></p>
                        <Button className={'w-full md:py-3 !rounded-full mt-1 !bg-[#d01110]'}>
                            {isLoading ? <Spinner style={'!border-t-white !border-gray-200 !mx-auto !h-5 !w-5'} isLoading={isLoading}/> : "Log in"}
                        </Button>
                        <p className="underline text-gray-600 -mt-1">Forgot password? </p>
                    </Form>
                </Formik>
            </div>
            <div className="hidden md:flex w-1/2 h-full bg-white">
                <Image src={'/images/logiin.jpg'} />
            </div>
        </div>
    )
}

export default Login