import CategoryCard from './CategoryCard'

const Category = () => {
    const categoryImages = [{ name: "Meals", image: "/images/Meal.jpg" },
    { name: "Pastries", image: "/images/Pastries.png" },
    { name: "Drinks", image: "/images/Drinks.png" }]
    return (
        <div className='w-full gap-3 flex justify-between pb-4 border-b border-gray-300'>
            {categoryImages.map((catImg, index) => (
                <CategoryCard key={index} {...{ img: catImg}} />
            ))}
        </div>
    )
}

export default Category