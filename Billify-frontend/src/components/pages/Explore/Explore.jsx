import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const Explore = () => {
	const { categories } = useContext(AppContext);
	console.log(categories);
	return (
		<div className="flex gap-10 h-[calc(100vh-5rem)] bg-[#2c3335] text-gray-100 p-8">
			{/* Left Section - Categories & Items */}
			<div className="flex-[0.7] border border-[#ccc] rounded-lg p-4 h-[100%] flex flex-col">
				<div className="flex-[0.3] overflow-y-auto">Categories</div>
				<hr className="my-5 mx-0 border-t border-white" />
				<div className="flex-[0.7] overflow-y-auto">Items</div>
			</div>
			{/* Right Section - Customer Form, Cart Items, Cart Summary */}
			<div className="flex-[0.3] flex-col border border-[#ccc] p-4 h-[100%] rounded-lg">
				<div className="cutomer-form-container h-[15%]">Customer Form</div>
				<hr className="my-3 text-light" />
				<div className="bg-[#2c2c2c] p-[12px] h-[55%] overflow-y-auto">
					Cart Items
				</div>
				<div className="flex-[0.3] border-t border-white h-[30%]">
					Cart Summary
				</div>
			</div>
		</div>
	);
};

export default Explore;
