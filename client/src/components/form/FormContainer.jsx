/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */

import MainFormContainer from "./MainFormContainer"

const FormContainer = ({ children, isUpdate, responseStatus, isLoading, title, handleSubmit,
                 initialValues, validationSchema, style, formStyle
      }) => {
    return (
        <div className="w-full flex flex-col  items-center gap-x-3 gap-y-2">
            <MainFormContainer children={children} {...{style, formStyle, title, isUpdate,
                 handleSubmit, initialValues, validationSchema, responseStatus, isLoading} } />
        </div>
    )
}

export default FormContainer