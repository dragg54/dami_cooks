import { GiHotMeal } from "react-icons/gi";
import { MdOutlineBakeryDining } from "react-icons/md";
import { motion } from "framer-motion";
import ScrollFadeIn from "@/components/animations/ScrollFadeIn";



const FreshlyCooked = () => {
  return (
       <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className="w-full border p-5 shadow-sm shadow-gray-400 rounded-md border-gray-500 h-[170px] md:h-[200px] flex flex-col items-center justify-start mx-auto text-center mt-5 md:mt-16">
      <p className="text-lg font-semibold flex items-center gap-x-3 text-[#fdb750]"><GiHotMeal /> Authentic Nigerian Meal</p> 
      <p className="mt-3 text-sm text-gray-500 ">From jollof rice, egusi soup, and ayamase to ofada rice and efo riro, we serve dishes that taste just like home. 
        Our meals are prepared by experienced chefs using fresh, locally sourced ingredients and traditional recipes.</p>
    </ScrollFadeIn>
  )
}

export default FreshlyCooked