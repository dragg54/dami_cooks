/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */

import MainFormContainer from "./MainFormContainer"

const FormContainer = ({ children, isUpdate, responseStatus, isLoading, title, handleSubmit,
                 initialValues, actionButton, validationSchema, style, formStyle, subTitle, handleDelete,
      }) => {
    return (
        <div className="w-full flex flex-col  items-center gap-x-3 gap-y-2 ">
            <MainFormContainer children={children} {...{style, subTitle, formStyle, title, isUpdate, handleDelete,
                 handleSubmit, initialValues, validationSchema, responseStatus, isLoading, actionButton} } />
        </div>
    )
}

export default FormContainer