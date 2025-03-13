/* eslint-disable react/prop-types */
const Spinner = ({style, isLoading}) => {
    return (
        <div className={`${style} w-full ${!isLoading && 'hidden'} h-full border-4 border-gray-500 border-t-transparent rounded-full animate-spin`}></div>
    );
  };
  
  export default Spinner;
  