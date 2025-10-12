import React, { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { deleteCategory } from "../../../../service/CategoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
	const { categories, setCategories } = useContext(AppContext);
	const [searchItem, setSearchItem] = useState("");
	const filterCtaegories = categories.filter((category) =>
		category.name.toLowerCase().includes(searchItem.toLowerCase())
	);
	const deleteByCategoryId = (categoryId) => {
		const toastId = toast(
			(t) => (
				<div className="flex flex-col gap-2">
					<span>Are you sure you want to delete this category?</span>
					<div className="flex justify-end gap-2 mt-1">
						<button
							className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
							onClick={() => toast.dismiss(t.id)}>
							Cancel
						</button>
						<button
							className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
							onClick={async () => {
								try {
									const response = await deleteCategory(categoryId);
									if (response.status === 204) {
										const updatedCategories = categories.filter(
											(category) => category.categoryId !== categoryId
										);
										setCategories(updatedCategories);
										toast.success("Category deleted");
									} else {
										toast.error("Unable to delete category");
									}
								} catch (error) {
									console.error(error);
									toast.error("Unable to delete category");
								} finally {
									toast.dismiss(t.id);
								}
							}}>
							Delete
						</button>
					</div>
				</div>
			),
			{
				duration: Infinity, // Keep toast open until user chooses
			}
		);
	};

	return (
		<div className="overflow-y-auto overflow-x-hidden ">
			{/* Search Bar */}
			<div className="mb-4">
				<div className="flex mb-2 border border-gray-300 rounded-lg overflow-hidden">
					<input
						onChange={(e) => setSearchItem(e.target.value)}
						value={searchItem}
						type="text"
						name="keyword"
						id="keyword"
						placeholder="Search by keyword"
						className="flex-1 px-3 py-2 focus:outline-none"
					/>
					<span
						// onClick={(e) => setSearchItem(e.target.value)}
						className="bg-yellow-400 px-3 flex items-center justify-center cursor-pointer">
						<MagnifyingGlassIcon className="h-8 w-6 text-gray-800" />
					</span>
				</div>
			</div>
			{/* Categories */}
			<div className="flex flex-col gap-4 ">
				{filterCtaegories.map((category, index) => (
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
										className="md:w-[70px] h-[70px] rounded-lg border-2 border-white/50 object-cover"
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
									onClick={() => deleteByCategoryId(category.categoryId)}
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
