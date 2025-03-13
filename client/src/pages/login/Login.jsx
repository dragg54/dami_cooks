import { Form, Formik } from "formik"
import TextInput from '../../components/input/TextInput'
import { Button } from '../../components/button/Button'
import CheckBoxInput from "../../components/input/CheckBoxInput"
import Image from "../../components/image/Image"
import { PostLogin } from "./api/PostLogin"


const Login = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    const handleSubmit = (values) =>{
        mutate(values)
    }
    const { mutate, isLoading, error } = PostLogin()   
    
    return (
        <div className="w-full h-screen flex">
            <div className='w-full p-4 md:w-1/2 md:px-20 md:pl-40 md:pr-40 md:mt-20'>
                <p className="font-semibold mt-6 md:text-3xl text-[#013a20] text-[1.2rem]">Sign in</p>
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
                        <p className="mt-3">Not a member yet? <span className="text-yellow-600 ">Sign up</span></p>
                        <Button className={'w-full md:py-3 !rounded-full mt-1 !bg-[#013a20]'}>
                            Log in
                        </Button>
                        <p className="underline text-gray-600 -mt-1">Forgot password? </p>
                    </Form>
                </Formik>
            </div>
            <div className="hidden md:flex w-1/2 h-full bg-white">
                <Image src={'/images/chef.jpg'} />
            </div>
        </div>
    )
}

export default Login