import React, { useContext, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import { deleteItem } from "../../../../service/ItemService";
import toast from "react-hot-toast";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";

const ItemList = () => {
	const { itemsData, setItemsData } = useContext(AppContext);
	const [searchItem, setSearchItem] = useState("");

	const filteredItems = itemsData.filter((item) =>
		item.name.toLowerCase().includes(searchItem.toLowerCase())
	);

	const removeItem = async (itemId) => {
		toast(
			(t) => (
				<div className="flex flex-col gap-2">
					<span>Are you sure you want to delete this item?</span>
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
									const response = await deleteItem(itemId);
									if (response.status === 204) {
										setItemsData(itemsData.filter((i) => i.itemId !== itemId));
										toast.success("Item deleted");
									} else {
										toast.error("Unable to delete item");
									}
								} catch (error) {
									console.error(error);
									toast.error("Unable to delete item");
								} finally {
									toast.dismiss(t.id);
								}
							}}>
							Delete
						</button>
					</div>
				</div>
			),
			{ duration: Infinity }
		);
	};

	return (
		<div className="overflow-y-auto overflow-x-hidden">
			{/* Search Bar */}
			<div className="sticky top-0 z-10 bg-[#1e2426] pb-2">
				<div className="flex mb-2 border border-gray-300 rounded-lg overflow-hidden">
					<input
						onChange={(e) => setSearchItem(e.target.value)}
						value={searchItem}
						type="text"
						placeholder="Search by keyword"
						className="flex-1 text-gray-800 px-3 py-2 focus:outline-none"
					/>
					<span className="bg-yellow-400 px-3 flex items-center justify-center">
						<MagnifyingGlassIcon className="h-6 w-6 text-gray-800 cursor-pointer" />
					</span>
				</div>
			</div>

			{/* Items List */}
			<div className="flex flex-col gap-4">
				{filteredItems.length > 0 ? (
					filteredItems.map((item, index) => (
						<div
							key={index}
							className="flex items-center justify-between bg-gray-800/60  border border-gray-600 p-3 rounded-xl shadow-md hover:shadow-lg transition duration-300">
							<div className="flex items-center gap-4">
								<img
									src={item.imgUrl}
									alt={item.name}
									className="w-16 h-16 rounded-lg object-cover"
								/>
								<div>
									<h6 className="font-bold text-lg text-white">{item.name}</h6>
									<p className="text-sm text-gray-300">
										Category: {item.categoryName}
									</p>
									<p className="text-yellow-400 font-semibold">₹{item.price}</p>
								</div>
							</div>
							<button
								onClick={() => removeItem(item.itemId)}
								className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
								title="Delete">
								<TrashIcon className="h-5 w-5 text-white" />
							</button>
						</div>
					))
				) : (
					<p className="mt-2 text-gray-400 text-center">No items found</p>
				)}
			</div>
		</div>
	);
};

export default ItemList;
