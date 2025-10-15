import React from "react";
import Category from "../Category/Category";

const DisplayCategory = ({
	categories,
	selectedCategory,
	setSelectedCategory,
}) => {
	return (
		<div className="w-full">
			<div className="flex flex-wrap m-2 gap-3 justify-start items-start">
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
					<p className="text-center text-gray-500 py-4">
						No categories available
					</p>
				)}
			</div>
		</div>
	);
};

export default DisplayCategory;
