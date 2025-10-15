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
	console.log(categories);
	return (
		<div className="flex gap-5 box-border h-[calc(100vh-5rem)] bg-[#2c3335] text-gray-100 p-6">
			{/* Left Section - Categories & Items */}
			<div className="flex-[0.7] border border-[#ccc] rounded-lg p-4 h-[100%] flex flex-col">
				<div className="flex-[0.3] overflow-y-auto">
					<DisplayCategory
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						categories={categories}
					/>
				</div>
				<hr className="my-5 mx-0 border-t border-white" />
				<div className="flex-[0.7] overflow-y-auto">
					<DisplayItems selectedCategory={selectedCategory} />
				</div>
			</div>
			{/* Right Section - Customer Form, Cart Items, Cart Summary */}
			<div className="flex-[0.3] flex-col border border-[#ccc] p-4 h-[100%] rounded-lg">
				<div className="cutomer-form-container h-[15%]">
					<CustomerForm />
				</div>
				<hr className="my-3 text-light" />
				<div className=" p-[12px] h-[55%] overflow-y-auto">
					<CartItems />
				</div>
				<div className="flex-[0.3] border-t border-white h-[30%]">
					<CartSummary />
				</div>
			</div>
		</div>
	);
};

export default Explore;
