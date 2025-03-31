import Image from "../../../components/image/Image"

const AboutUs = () => {
    return (
        <div className="w-full p-6 md:flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 w-2/3 flex justify-start  h-[300px]">
                <Image src={'/images/chef2.jpg'} />
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
                <div>
                    <p className="text-4xl text-[#fdb750] font-semibold">About Us</p>
                    <p className="text-gray-700">Welcome to Dami Cooks, your ultimate destination for delicious and authentic Nigerian cuisine, delivered fresh and fast!</p>
                </div>
                <div className="mt-8">
                    <p className="text-4xl text-[#fdb750] font-semibold">Who we are</p>
                    <p className="text-gray-700">
                        At Dami Cooks, we celebrate the rich flavors, spices, and traditions of Nigerian food. Whether {"you're"} craving Jollof Rice, Egusi Soup, Suya, Puff-Puff, Moi Moi, or any other Nigerian delicacy,{" we've"} got you covered!
                    </p>
                </div>
                <div className="mt-8">
                    <p className="text-4xl text-[#fdb750] font-semibold">Why Choose Us?</p>
                    <p className="text-gray-700">
                    Enjoy authentic Nigerian flavors, freshly prepared with love, and delivered hot and on time, with secure payments and the convenience of ordering anytime, anywhere.                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs