import { Button } from "@/components/button/Button"
import Image from "../../../components/image/Image"

const AboutUs = () => {
    return (
        <div className="w-full  md:mb-12 h-full">
            <div className="w-full object-contain md:absolute  overflow-hidden h-[50px] md:h-[200px] left-0 right-0 md:top-[8.5rem]">
                <img className="w-[500px] md:w-[1800px] -mt-24 md:-mt-[22rem] flex-justify-center" src={'/images/FOOD3.jpg'} />
            </div>
            <div className="w-full p-6 md:flex  flex-col md:flex-row gap-4 md:mt-[200px] -mt-10 z-40 md:h-[730px] relative">
                <div className="md:w-1/2 w-2/3 flex justify-start  h-[400px]">
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
            <div className="md:absolute w-full  gap-x-5 mb-0 flex md:justify-start md:pr-[300px] items-center flex-col md:flex-row h-[620px]
                  md:h-[340px] bg-[#fdb750] text-red-700 left-0 md:px-10 py-3 md:-bottom-[30rem] ">
                <div className="md:w-[450px] md:ml-20 ml-20 flex justify-center md:justify-start items-center w-full mx-auto object-cover md:-mt-4 h-[300px] md:h-[100px] ">
                    <img className="flex justify-center mx-auto md:justify-start md:mr-0" src={'/images/FOOD3.png'} />
                </div>
                <div className="h-[200px] p-3 md:w-[500px] md:absolute md:left-[500px] md:mr-20  md:mt-0 w-full  flex flex-col items-center">
                    <p className="text-4xl font-extrabold  mb-5">We are ready</p>
                    <p className="text-center">Join thousands of food lovers who trust us to bring a taste of home, every day.</p>
                    <p className="mt-2 text-center">Rediscover the joy of African cuisine. From traditional stews to local street favorites, browse our menu and place your order with ease — we’ll handle the rest.</p>
                    <Button className={'mt-6 !py-3 !rounded-full !w-[200px]'}>Place Order</Button>
                </div>
            </div>
        </div>
    )
}

export default AboutUs