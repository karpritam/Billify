import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Receipt, CreditCard, Wallet } from "lucide-react";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";

const CartSummary = ({
	customerName,
	mobileNumber,
	setCustomerName,
	setMobileNumber,
}) => {
	const { cartItems } = useContext(AppContext);

	const totalAmount = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const tax = totalAmount * 0.01;
	const grandTotal = totalAmount + tax;

	return (
		<div className="mt-3 text-gray-200">
			{/* Summary Details */}
			<div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-sm mb-4">
				<div className="flex justify-between mb-2">
					<span className="text-sm text-gray-300">Items:</span>
					<span className="font-medium text-gray-100">
						₹{totalAmount.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between mb-2">
					<span className="text-sm text-gray-300">Tax (18%):</span>
					<span className="font-medium text-gray-100">₹{tax.toFixed(2)}</span>
				</div>
				<hr className="border-gray-700 my-2" />
				<div className="flex justify-between items-center">
					<span className="text-base font-semibold text-gray-100">
						Grand Total:
					</span>
					<span className="text-lg font-bold text-green-400">
						₹{grandTotal.toFixed(2)}
					</span>
				</div>
			</div>

			{/* Payment Buttons */}
			<div className="flex gap-3 mb-3">
				<button className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
					<Wallet size={18} />
					Cash
				</button>
				<button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
					<CreditCard size={18} />
					UPI
				</button>
			</div>

			{/* Place Order */}
			<div className="flex gap-3 mt-3">
				<button className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition">
					<Receipt size={18} />
					Place Order
				</button>
			</div>

			{/* Future use */}
			{/* <ReceiptPopup /> */}
		</div>
	);
};

export default CartSummary;
