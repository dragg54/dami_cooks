import { GiPartyPopper } from "react-icons/gi";
import { motion } from "framer-motion";
import ScrollFadeIn from "@/components/animations/ScrollFadeIn";


const Catering = () => {
  return (
       <ScrollFadeIn
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}  className="w-full border p-3 shadow-sm shadow-gray-400 rounded-md border-gray-500 h-[170px] md:h-[200px] flex flex-col items-center justify-start p-5 mt-5 mx-auto text-center md:mt-16">
         <p className="text-lg font-semibold flex items-center gap-x-3 text-[#fdb750]"><GiPartyPopper />Event Catering And Bulk Orders</p>
           <p className="mt-3 text-sm text-gray-500 ">Planning a party, wedding, naming ceremony, or corporate event?
          We provide large-quantity meals and customizable catering packages to suit your needs — with reliable delivery and setup options.</p>
       </ScrollFadeIn>
    )
}

export default Catering