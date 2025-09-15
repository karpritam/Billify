import React, { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import { TrashIcon } from "@heroicons/react/24/solid";

const CategoryList = () => {
	const { categories } = useContext(AppContext);
	return (
		<div className="h-[100vh] overflow-y-auto overflow-x-hidden">
			{/* Search Bar */}
			<div className="row p-2 text-white text-lg font-semibold">Search Bar</div>
			{/* Categories */}
			<div className="flex flex-col gap-4 ">
				{categories.map((category, index) => (
					<div key={index}>
						{/* Left Side: Image and Text */}
						<div
							className="rounded-lg p-3 flex items-center justify-between w-full"
							style={{ backgroundColor: category.bgColor }}>
							<div className="flex items-center">
								<div className="md:mr-4">
									<img
										src={category.imgUrl}
										alt={category.name}
										className="md:w-[70px] h-[60px] rounded-lg border-2 border-white/50 object-cover"
									/>
								</div>
								<div className="flex-grow-1">
									<h5 className="mb-1 sm:pl-2 font-bold md:text-lg  text-white">
										{category.name}
									</h5>
									<p className="mb-0 sm:pl-2 md:text-sm text-white/80">
										{category.items} Items
									</p>
								</div>
							</div>
							{/* Right Side: Delete Button */}
							<div>
								<button
									className="bg-red-600 hover:bg-red-700 p-2 rounded transition-colors duration-300"
									title="Delete">
									<TrashIcon className="h-5 w-5 text-white" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoryList;
