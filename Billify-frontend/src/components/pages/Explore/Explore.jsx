import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import DisplayCategory from "../../DisplayCategory/DisplayCategory";
import DisplayItems from "../../DisplayItems/DisplayItems";
import CustomerForm from "../../CustomerForm/CustomerForm";
import CartItems from "../../CartItems/CartItems";
import CartSummary from "../../CartSummary/CartSummary";

const Explore = () => {
	const { categories } = useContext(AppContext);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [customerName, setCustomerName] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");

	return (
		<div className="flex gap-6 h-[calc(100vh-4.56rem)] bg-[#2c3335] text-gray-100 p-6 box-border">
			{/* ---------- Left Section ---------- */}
			<div className="flex-[0.7] flex flex-col border border-gray-700 rounded-xl p-4 bg-[#1e2426] shadow-md">
				{/* Categories */}
				<div className="flex-[0.35] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
					<DisplayCategory
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						categories={categories}
					/>
				</div>

				<hr className="my-4 border-gray-600" />

				{/* Items */}
				<div className="flex-[0.65] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
					<DisplayItems selectedCategory={selectedCategory} />
				</div>
			</div>

			{/* ---------- Right Section ---------- */}
			<div className="flex-[0.3] flex flex-col border border-gray-700 rounded-xl p-4 bg-[#1e2426] shadow-md">
				{/* Customer Form */}
				<div className="h-[15%]">
					<CustomerForm
						customerName={customerName}
						mobileNumber={mobileNumber}
						setCustomerName={setCustomerName}
						setMobileNumber={setMobileNumber}
					/>
				</div>

				<hr className="my-3 border-gray-600" />

				{/* Cart Items */}
				<div className="flex-grow overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
					<CartItems />
				</div>

				<hr className="my-3 border-gray-600" />

				{/* Cart Summary */}
				<div className="mt-auto">
					<CartSummary
						customerName={customerName}
						mobileNumber={mobileNumber}
						setCustomerName={setCustomerName}
						setMobileNumber={setMobileNumber}
					/>
				</div>
			</div>
		</div>
	);
};

export default Explore;
