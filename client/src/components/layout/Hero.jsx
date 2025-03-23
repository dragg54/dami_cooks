import { Button } from "../button/Button"
import Image from "../image/Image"

const Hero = () => {
  return (
    <div className='md:w-full mt-3 md:h-[480px] overflow-hidden rounded-md shadow-orange-400 bg-secondary md:left-0  top-0 p-6 md:p-12 md:mt-0 flex md:flex-row justify-between items-center'>
      <div className="text-[#d01110] h-full w-2/3  md:w-1/2 flex flex-col justify-center">
        <p className="text-2xl md:text-5xl font-bold">Craving something delicious? {"We've"} got you covered.</p>
        <p className="mt-2 md:mt-6 font-semibold md:text-base text-sm">Authentic african flavour, just a tap away</p>
        <Button className={"!font-semibold !rounded-full mt-4 md:mt-8 md:!py-4 text-[0.8rem] md:!text-[1.1rem]"}>
          Go to menu
        </Button>
      </div>
      <div className=" overflow-hidden -mt-8 w-[200px] md:mr-0 -mr-20 h-[200px] md:w-[400px] md:h-[400px]">
       <Image style={'!rounded-full'} src={'/images/cuisine.png'}/>
      </div>
    </div>
  )
}

export default Hero