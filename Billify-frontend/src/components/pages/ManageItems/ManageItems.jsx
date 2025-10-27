import React from "react";
import ItemForm from "./ItemForm/ItemForm";
import ItemList from "./ItemList/ItemList";

const ManageItems = () => {
	return (
		<div className="flex flex-col md:flex-row gap-5 box-border p-6 md:h-[calc(100vh-4.64rem)] bg-gray-900">
			<div className="flex-[0.7] flex flex-col border border-gray-700 rounded-xl p-4 bg-gray-800 shadow-md">
				<ItemForm />
			</div>
			<div className="flex-[0.3] border border-gray-700 rounded-xl p-4 bg-[#1e2426] shadow-md overflow-auto">
				<ItemList />
			</div>
		</div>
	);
};

export default ManageItems;
