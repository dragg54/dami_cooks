/* eslint-disable react/prop-types */
import AddButton from '../button/AddButton'
import BackButton from '../button/BackButton'
import Response from '../Response'

const Form = ({children, title}) => {
  return (
    <div className='w-full rounded-md p-4 bg-white h-auto'>
      <h1 className='font-semibold text-lg'>{title}</h1>
      <div className='my-3 border w-full border-gray-200'></div>
      {children}
      <Response />
      <div className='mt-6 border-t pt-4 flex justify-end gap-3'>
        <BackButton />
        <AddButton />
      </div>
    </div>
  )
}

export default Form