import React from "react";
import Category from "../Category/Category";
import { assets } from "../../assets/assets";

const DisplayCategory = ({
	categories = [],
	selectedCategory,
	setSelectedCategory,
}) => {
	const totalItems = categories.reduce((acc, cat) => acc + (cat.items || 0), 0);

	return (
		<div className="w-full">
			<div className="flex flex-wrap gap-4 p-3 justify-start items-start">
				{/* All Items Card */}
				<div className="w-[180px] h-[80px]">
					<Category
						categoryName="All Items"
						imgUrl={assets.allitems}
						numberOfItems={totalItems}
						bgColor="#6c757d"
						isSelected={selectedCategory === ""}
						onClick={() => setSelectedCategory("")}
					/>
				</div>

				{/* Dynamic Category Cards */}
				{categories.length > 0 ? (
					categories.map((category) => (
						<div key={category.categoryId} className="w-[180px] h-[80px]">
							<Category
								categoryName={category.name}
								imgUrl={category.imgUrl}
								numberOfItems={category.items}
								bgColor={category.bgColor}
								isSelected={selectedCategory === category.categoryId}
								onClick={() => setSelectedCategory(category.categoryId)}
							/>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 py-4 w-full">
						No categories available
					</p>
				)}
			</div>
		</div>
	);
};

export default DisplayCategory;
