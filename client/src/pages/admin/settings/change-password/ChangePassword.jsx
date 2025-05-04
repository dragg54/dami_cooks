import { Field, Form, Formik } from "formik"
import TextInput from "../../../../components/input/TextInput"
import { Button } from "../../../../components/button/Button"
import { useDispatch, useSelector } from "react-redux"
import UpdatePassword from "../api/UpdateUserPassword"
import * as Yup from "yup"
import { useState } from "react"

const ChangePassword = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)?.user
    const [error, setError] = useState("")
    const { mutate } = UpdatePassword({id:user?.id, setError})
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Current password is required'),
        newPassword: Yup.string()
            .min(6, 'New password must be at least 6 characters')
            .required('New password is required'),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Please confirm your new password'),
    });

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    };
    const onSubmit = (values) => {
        mutate(values)
    }
    return (
        <div className="w-ull p-10">
            <h1 className="font-semibold text-xl">Change Password</h1>
            <small className="text-gray-400">Manage admin password</small>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="w-1/2 mt-8 flex flex-col gap-4">
                        <div className="full">
                            <TextInput
                                autoComplete={"off"}
                                name={'oldPassword'}
                                placeholder={"Old Password"} />
                        </div>
                        <div className="full">
                            <TextInput
                                autoComplete={"off"}
                                name={'newPassword'}
                                placeholder={"New Password"} />
                        </div>
                        <div className="full">
                            <TextInput
                                autoComplete={"off"}
                                name={'confirmNewPassword'}
                                placeholder={"Confirm New Password"} />
                        </div>
                        <small className="text-red-700 font-semibold">{error?.response?.data}</small>
                        <Button disabled={isSubmitting} className={'!w-[100px] mt-10 !rounded-full ml-auto'}>
                            Save
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ChangePassword