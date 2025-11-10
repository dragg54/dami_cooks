import { MdOutlineBakeryDining } from "react-icons/md";
import { motion } from "framer-motion";
import ScrollFadeIn from "@/components/animations/ScrollFadeIn";


const Pastry = () => {
  return (
       <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} className="w-full shadow-sm shadow-gray-400 border p-3 rounded-md border-gray-500 h-[170px] md:h-[200px] flex flex-col items-center justify-center mx-auto text-center mt-5 md:mt-16">
       <p className="text-lg font-semibold flex items-center gap-x-3 text-[#fdb750]"><MdOutlineBakeryDining />Freshly Baked Pastries & Snacks</p> 
       <p className="mt-3 text-gray-700 text-sm">We offer a variety of beloved Nigerian snacks, including meat pies, puff-puff, chin chin, sausage rolls, buns, and doughnuts — all freshly made and packed with authentic flavour. Whether you're looking for a satisfying breakfast, a quick afternoon bite, or treats for your next party,
        our snacks are the perfect choice for any occasion.</p>
     </ScrollFadeIn>
  )
}

export default Pastry