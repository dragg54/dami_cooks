import { Form, Formik } from "formik"
import TextInput from '../../components/input/TextInput'
import { Button } from '../../components/button/Button'
import CheckBoxInput from "../../components/input/CheckBoxInput"
import Image from "../../components/image/Image"
import { PostUser } from "./api/PostUser"
import * as Yup from 'yup'

const Register = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
    
    const SignupSchema = Yup.object({
        firstName: Yup.string()
            .min(3, "Length is too short!")
            .max(15, "Length is too long!")
            .required("First name is required"),
        lastName: Yup.string()
            .min(3, "Length is too short!")
            .max(15, "Length is too long!")
            .required("Last name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(7, "Password too short")
          .required("Password is required")
      });

        const handleSubmit = (values) =>{
            mutate(values)
        }
        const { mutate, isLoading } = PostUser()   
    return (
        <div className="w-full h-screen flex">
            <div className='w-full p-4 md:w-1/2 md:px-20 md:pl-32'>
                <p className="font-semibold mt-6 text-[#d01110] text-[1.4rem] md:text-[1.8rem]">Create Account</p>
                <small className="text-gray-400">Register your account</small>
                <Formik initialValues={initialValues}
                    validationSchema={() => SignupSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(values)
                        resetForm()
                    }}>
                    <Form className="w-full mt-8  flex flex-col  items-center gap-x-3 gap-y-6">
                        <div className="w-full">
                            <TextInput name='firstName' label='First Name' />
                        </div>
                        <div className="w-full">
                            <TextInput name='lastName' label='Last Name' />
                        </div>
                        <div className="w-full">
                            <TextInput name='email' label='Email' />
                        </div>
                        <div className="w-full">
                            <TextInput name='password' label='Password' />
                        </div>
                        <div className="w-full">
                            <CheckBoxInput {...{ name: "termsAndCondition", label: <>By signing up, you agreed to the <span className="text-yellow-600">Terms of use</span> and <span className="text-yellow-600">Privacy Policy</span></> }} />
                        </div>
                        <Button isLoading={isLoading} type="submit" className={'w-full md:py-3 !bg-[#d01110] !rounded-full mt-6'}>
                            Register
                        </Button>
                        <p>Already have an account? <span className="text-yellow-600">Sign in</span></p>
                    </Form>
                </Formik>
            </div>
            <div className="hidden md:flex w-1/2 h-full bg-white">
                <Image src={'/images/logiin.jpg'} />
            </div>
        </div>
    )
}

export default Register