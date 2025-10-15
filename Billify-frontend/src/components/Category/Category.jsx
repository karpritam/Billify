import React from "react";

const Category = ({
	categoryName,
	imgUrl,
	numberOfItems,
	bgColor,
	isSelected,
	onClick,
}) => {
	return (
		<div
			className="relative flex items-center p-3 rounded-lg category-ondragover transition-transform duration-200 hover:scale-105"
			style={{ backgroundColor: bgColor, cursor: "pointer" }}
			onClick={onClick}>
			<img
				src={imgUrl}
				alt={categoryName}
				className="w-12 h-12 rounded-full object-cover mr-3 border border-white/30"
			/>
			<div>
				<h6 className="text-white font-semibold mb-0">{categoryName}</h6>
				<p className="text-white text-sm mb-0">{numberOfItems} items</p>
			</div>
			{isSelected && (
				<div className="absolute right-2 top-3 transform -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-md"></div>
			)}
		</div>
	);
};

export default Category;
