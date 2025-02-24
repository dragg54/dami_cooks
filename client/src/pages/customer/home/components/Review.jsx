import Image from "../../../../components/image/Image"

/* eslint-disable react/prop-types */
const Review = ({review}) => {
  return (
    <div className="w-full p-4 h-[220px] rounded-md shadow-md shadow-gray-300 border">
        <div className="w-full flex justify-start gap-6 items-center ">
            <div className="w-[70px] h-[70px] rounded-full border overflow-hidden">
            <Image style={"!object-cover "} src={review.image}/>
            </div>
            <p className="font-semibold text-xl">{review.name}</p>
            <div></div>
        </div>
        <div className="mt-2 text-left text-gray-500">{review.comment}</div>
    </div>
  )
}

export default Review