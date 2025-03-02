import CategoryCard from './CategoryCard'

const Category = () => {
    const categoryImages = [{ name: "Meals", image: "/images/Meal.jpg" },
    { name: "Pastries", image: "/images/Pastries.png" },
    { name: "Drinks", image: "/images/Drinks.png" }]
    return (
        <div className='w-full gap-8 md:gap-12 flex justify-center pb-4 '>
            {categoryImages.map((catImg, index) => (
                <CategoryCard key={index} {...{ img: catImg}} />
            ))}
        </div>
    )
}

export default Category