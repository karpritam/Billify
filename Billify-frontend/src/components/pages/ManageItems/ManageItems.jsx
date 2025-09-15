import React from "react";
import ItemForm from "./ItemForm/ItemForm";
import ItemList from "./ItemList/ItemList";

const ManageItems = () => {
	return (
		<div className="flex gap-5 box-border p-6 h-[calc(100vh-5rem)] bg-[#2C3335]">
			<div className="flex-[0.7] flex flex-col border border-[#ccc] rounded-lg p-4  h-full text-white">
				<ItemForm />
			</div>
			<div className="flex-[0.3] border border-[#ccc] rounded-lg p-4 h-full text-white">
				<ItemList />
			</div>
		</div>
	);
};

export default ManageItems;
