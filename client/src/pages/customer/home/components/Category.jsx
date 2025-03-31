/* eslint-disable react/prop-types */
import { useState } from 'react'
import { FetchItemCategories } from '../api/fetchItemCategories'
import CategoryCard from './CategoryCard'

const Category = ({selectedCategory, setSelectedCategory, refetch}) => {
    const {data} = FetchItemCategories({})
    const categoryImages = [{ name: "Mains", image: "/images/Meal.jpg" },
    { name: "Pastries", image: "/images/Pastries.png" },
    { name: "Soups", image: "/images/Soup.jpg"},
    { name: "Drinks", image: "/images/Drinks.png" }]
    return (
        <div className='w-full  gap-4 md:gap-12 flex justify-center pb-4 '>
            {data && data.length && data?.map((cat, index) => (
                <CategoryCard refetch={refetch} category={selectedCategory} setSelectedCategory={setSelectedCategory} key={index} 
                {...{ img: categoryImages.find(x => x.name == cat.name)}} />
            ))}
        </div>
    )
}

export default Category