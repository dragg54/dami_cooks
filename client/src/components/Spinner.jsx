/* eslint-disable react/prop-types */
const Spinner = ({ style, isLoading, isLogo }) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            {isLogo ? (
                <div className="w-screen h-screen bg-white flex justify-center items-center">
                    <img
                    src="/images/logo.png"
                    alt="Loading"
                    className={`${style} w-28 h-28 animate-pulse -mt-10`}
                />
                </div>
            ) : (
                // 🔄 Normal spinner
                <div
                    className={`${style} w-10 h-10 border-4 border-gray-500 border-t-transparent rounded-full animate-spin`}
                />
            )}
        </div>
    );
};

export default Spinner;
