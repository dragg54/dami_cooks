import { useState } from "react";
import reviews from "../../../constants/Review"
import Review from "./components/Review"
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getScreenSize } from "../../../utils/getScreenSize";

const Reviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevReview = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    const nextReview = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };
    return (
        <div className="w-full md:mt-20 ">
            <p className="md:mb-4 mb-4 font-bold text-2xl w-full text-center md:text-3xl">Customers are saying</p>
            {getScreenSize().isMobile ?
                <div className="flex relative flex-col gap-4 w-full mb-4 px-2">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >

                        <Review review={reviews[currentIndex]} key={reviews[currentIndex].id} />
                    </motion.div>
                    <div className="absolute flex -translate-1/2 top-1/2 -right-3 -left-3  md:-right-6 md:-left-6 justify-between mt-4">
                        <button onClick={prevReview} className="p-2 bg-gray-200 border rounded-full">
                            <ChevronLeft />
                        </button>
                        <button onClick={nextReview} className="p-2 bg-gray-200 border rounded-full">
                            <ChevronRight />
                        </button>
                    </div>
                </div> :
                <div className="w-full flex justify-between">
                    {reviews.map(review => (
                    <div className="md:w-[33%]" key={review.id}>
                        <Review review={review} />
                    </div>
                ))
            }
                </div>
            }
        </div>
    )
}

export default Reviews