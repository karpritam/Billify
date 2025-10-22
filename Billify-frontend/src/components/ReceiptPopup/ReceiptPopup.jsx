import React from "react";
import { CheckCircle } from "lucide-react";

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
	if (!orderDetails) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-gray-900">
			<div className="bg-white rounded-xl shadow-lg w-[400px] max-w-[90%] max-h-[90vh] overflow-y-auto p-6">
				{/* Success Icon */}
				<div className="text-center mb-4">
					<CheckCircle className="text-green-500 w-10 h-10 inline-block" />
				</div>

				{/* Title */}
				<h3 className="text-center text-xl font-semibold mb-4">
					Order Receipt
				</h3>

				{/* Order Info */}
				<div className="space-y-1 text-sm">
					<p>
						<strong>Order ID:</strong> {orderDetails.orderId}
					</p>
					<p>
						<strong>Name:</strong> {orderDetails.customerName}
					</p>
					<p>
						<strong>Phone:</strong> {orderDetails.phoneNumber}
					</p>
				</div>

				<hr className="my-4 border-gray-300" />

				{/* Items List */}
				<h5 className="text-lg font-semibold mb-3">Items Ordered</h5>
				<div className="max-h-40 overflow-y-auto mb-4 space-y-2">
					{orderDetails.items.map((item, index) => (
						<div
							key={index}
							className="flex justify-between text-sm border-b border-gray-100 pb-1">
							<span>
								{item.name} × {item.quantity}
							</span>
							<span>₹{(item.price * item.quantity).toFixed(2)}</span>
						</div>
					))}
				</div>

				<hr className="my-4 border-gray-300" />

				{/* Totals */}
				<div className="flex justify-between mb-2">
					<span className="font-semibold">Subtotal:</span>
					<span>₹{orderDetails.subtotal.toFixed(2)}</span>
				</div>

				<div className="flex justify-between mb-2">
					<span className="font-semibold">Tax (18%):</span>
					<span>₹{orderDetails.tax.toFixed(2)}</span>
				</div>

				<div className="flex justify-between text-lg font-bold mb-4">
					<span>Grand Total:</span>
					<span>₹{orderDetails.grandTotal.toFixed(2)}</span>
				</div>

				{/* Payment Info */}
				<p className="mb-1">
					<strong>Payment Method:</strong> {orderDetails.paymentMethod}
				</p>

				{orderDetails.paymentMethod === "UPI" && (
					<div className="mt-2 text-sm space-y-1">
						<p>
							<strong>Razorpay Order ID:</strong> {orderDetails.razorpayOrderId}
						</p>
						<p>
							<strong>Razorpay Payment ID:</strong>{" "}
							{orderDetails.razorpayPaymentId}
						</p>
					</div>
				)}

				{/* Buttons */}
				<div className="flex justify-end gap-3 mt-6">
					<button
						className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
						onClick={onPrint}>
						Print Receipt
					</button>
					<button
						className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
						onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default ReceiptPopup;
