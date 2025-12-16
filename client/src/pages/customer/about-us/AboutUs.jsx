import { Button } from "@/components/button/Button"
import Image from "../../../components/image/Image"
import ScrollFadeIn from "@/components/animations/ScrollFadeIn"
import { getScreenSize } from "@/utils/getScreenSize"

const AboutUs = () => {
    return (
        <div className="w-full  md:mb-[25rem] h-full">

            <ScrollFadeIn className={`${getScreenSize().isMobile && '!w-full'} w-full md:mx-6  md:flex  flex-col md:flex-row gap-4 md:mt-[20px]  z-40 md:h-[770px] relative`}>
                <ScrollFadeIn className={`${getScreenSize().isMobile && '!w-full'}  md:w-2/3 flex object-contain h-[400px] md:h-[550px]`}>
                    <Image style={'!object-contain md:!object-cover'} src={'/images/damicooks.jpg'} />
                </ScrollFadeIn>
                <ScrollFadeIn className="md:w-1/2 mt-6 md:mt-0 md:ml-8 mx-6">
                <ScrollFadeIn></ScrollFadeIn>
                    <ScrollFadeIn>
                        <p className="text-4xl text-[#fdb750] font-semibold">About Us</p>
                        <p className="text-gray-700">Welcome to Dami Cooks, where authentic Nigerian flavors meet modern convenience.

We are a proudly Nigerian online food restaurant dedicated to bringing the rich taste, aroma, and tradition of Nigerian cuisine straight to your table. From beloved local dishes to freshly baked pastries and full-scale catering services, our mission is simple: to serve delicious, high-quality food made with love, authenticity, and excellence.</p>
                    </ScrollFadeIn>
                    <ScrollFadeIn className="mt-6">
                        <p className="text-4xl text-[#fdb750] font-semibold">Our Story</p>
                        <p className="text-gray-700">
                            At Dami Cooks, food is more than a meal—it’s a celebration of culture, heritage, and community. Inspired by the vibrant culinary traditions found across Nigeria, we set out to create a brand that preserves authentic recipes while embracing innovation and convenience.

Every dish we prepare reflects our passion for Nigerian food and our commitment to quality. Whether you’re craving a comforting home-style meal, a sweet pastry treat, or planning a special event, we’re here to make every experience memorable.
                        </p>
                    </ScrollFadeIn>
                    <ScrollFadeIn className="mt-6">
                        <p className="text-4xl text-[#fdb750] font-semibold">Why Choose Us?</p>
                        <p className="text-gray-700">
                            Enjoy authentic Nigerian flavors, freshly prepared with love, and delivered hot and on time, with secure payments and the convenience of ordering anytime, anywhere.                    </p>
                    </ScrollFadeIn>
                    <Button {...{ className: '!rounded-full !mx-6 !mx-auto !w-[200px]  md:!w-[200px] py-3 mt-4 md:mt-8 !font-semibold' }}>Contact Us</Button>
                </ScrollFadeIn>
            </ScrollFadeIn>
            <ScrollFadeIn className="md:absolute  w-full  gap-x-5 mb-0 flex md:justify-between md:pr-[1px] items-center flex-col md:flex-row h-[900px]
                  md:h-[400px] bg-[#fdb750] text-red-700 left-0 md:px-10 py-3 mt-[60px] md:-bottom-[42rem] ">
                <ScrollFadeIn className="md:w-[450px] md:ml-20 ml-20 flex justify-center md:justify-start items-center w-full mx-auto object-cover md:-mt-4 h-[300px] md:h-[100px] ">
                    <img className="flex justify-center mx-auto md:justify-start md:mr-0" src={'/images/FOOD3.png'} />
                </ScrollFadeIn>
                <ScrollFadeIn className="h-[200px]  p-3 md:w-[500px] md:absolute md:left-[500px] md:mr-20  md:mt-0 w-full  flex flex-col items-center">
                    <p className="text-4xl font-extrabold  mb-5">We are ready</p>
                    <p className="text-center">Join thousands of food lovers who trust us to bring a taste of home, every day.</p>
                    <p className="mt-2 text-center">Rediscover the joy of African cuisine. From traditional stews to local street favorites, browse our menu and place your order with ease — we’ll handle the rest.</p>
                    <Button className={'mt-6 !py-3 !rounded-full !w-[200px]'}>Place Order</Button>
                </ScrollFadeIn>
                <ScrollFadeIn className="md:w-[450px] md:ml-60  mt-20 flex justify-center md:justify-end items-center w-full mx-auto object-cover md:-mt-4 h-[300px] md:h-[100px] ">
                    <img src="/images/DeliveryMan.png" />
                </ScrollFadeIn>
            </ScrollFadeIn>
        </div>
    )
}

export default AboutUs