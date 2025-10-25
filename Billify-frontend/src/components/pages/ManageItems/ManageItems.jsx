import React from "react";
import ItemForm from "./ItemForm/ItemForm";
import ItemList from "./ItemList/ItemList";

const ManageItems = () => {
	return (
		<div className="flex gap-5 box-border p-6 h-[calc(100vh-4.56rem)] bg-gray-900">
			<div className="flex-[0.7] flex flex-col border border-gray-700 rounded-xl p-4 bg-gray-800 shadow-md">
				<ItemForm />
			</div>
			<div className="flex-[0.3] border border-gray-700 rounded-xl p-4 bg-[#1e2426] shadow-md">
				<ItemList />
			</div>
		</div>
	);
};

export default ManageItems;
