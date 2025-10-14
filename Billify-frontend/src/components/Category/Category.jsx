import React from "react";

const Category = ({ categoryName, imgUrl, numberOfItems, bgColor }) => {
	return (
		<div
			className="flex items-center p-3 rounded-lg category-ondragover transition-transform duration-200 hover:scale-105"
			style={{ backgroundColor: bgColor, cursor: "pointer" }}>
			<img
				src={imgUrl}
				alt={categoryName}
				className="w-12 h-12 rounded-full object-cover mr-3 border border-white/30"
			/>
			<div>
				<h6 className="text-white font-semibold mb-0">{categoryName}</h6>
				<p className="text-white text-sm mb-0">{numberOfItems} items</p>
			</div>
		</div>
	);
};

export default Category;
