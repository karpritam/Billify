import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Receipt, CreditCard, Wallet, Phone, Key, Contact } from "lucide-react";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup";
import toast from "react-hot-toast";
import { createOrder, deleteOrder } from "../../service/OrderService";
import { AppConstants } from "../../Util/Constants";
import {
	createRazorpayOrder,
	verifyPayment,
} from "../../service/PaymentService";

const CartSummary = ({
	customerName,
	mobileNumber,
	setCustomerName,
	setMobileNumber,
}) => {
	const { cartItems, clearCart } = useContext(AppContext);

	const [isProcessing, setIsProcessing] = useState(false);
	const [orderDetails, setOrderDetails] = useState(null);
	const [showPopup, setShowPopup] = useState(false);

	const totalAmount = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const tax = totalAmount * 0.18;
	const grandTotal = totalAmount + tax;

	const clearAll = () => {
		setCustomerName("");
		setMobileNumber("");
		clearCart();
	};

	const placeOrder = () => {
		setShowPopup(true);
		clearAll();
	};

	const handlePrintReceipt = () => {
		window.print();
	};

	const loadRazorpayScript = () => {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = "https://checkout.razorpay.com/v1/checkout.js";
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});
	};

	//call the delete order method form db
	const deleteOrderFailure = async (orderId) => {
		try {
			await deleteOrder(orderId);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	const completePayment = async (paymentMode) => {
		if (!customerName || !mobileNumber) {
			toast.error("Please enter customer details");
			return;
		}
		if (cartItems.length === 0) {
			toast.error("Your cart is empty");
			return;
		}
		const orderData = {
			customerName,
			phoneNumber: mobileNumber,
			cartItems,
			subtotal: totalAmount,
			tax,
			grandTotal,
			paymentMethod: paymentMode.toUpperCase(),
		};
		setIsProcessing(true);
		try {
			const response = await createOrder(orderData);
			const saveData = response.data;
			if (response.status === 201 && paymentMode === "cash") {
				toast.success("Cash received");
				setOrderDetails(saveData);
			} else if (response.status === 201 && paymentMode === "upi") {
				const razorpayLoaded = await loadRazorpayScript();
				if (!razorpayLoaded) {
					toast.error("Unable to load razorpay");
					await deleteOrderFailure(saveData.orderId);
					return;
				}

				//create razorpay order
				const razorpayResponse = await createRazorpayOrder({
					amount: grandTotal,
					currency: "INR",
				});
				if (!razorpayResponse || !razorpayResponse.data) {
					toast.error("Failed to create Razorpay order");
					await deleteOrderFailure(saveData.orderId);
					return;
				}
				const options = {
					key: AppConstants.RAZORPAY_KEY_ID,
					amount: razorpayResponse.data.amount,
					currency: razorpayResponse.data.currency,
					order_id: razorpayResponse.data.id,
					name: "PSK Retail Shop",
					description: "Order payment",
					handler: async function (response) {
						await verifyPaymentHandler(response, saveData);
					},
					prefill: {
						name: customerName,
						contact: mobileNumber,
					},
					theme: {
						color: "#3399cc",
					},
					model: {
						ondismiss: async () => {
							await deleteOrderFailure(saveData.orderId);
							toast.error("Payment cancelled");
						},
					},
				};
				const rzp = new window.Razorpay(options);
				rzp.on("payment.failed", async (response) => {
					await deleteOrderFailure(saveData.orderId);
					toast.error("Payment failed");
					console.error(response.error.description);
				});
				rzp.open();
			}
		} catch (error) {
			console.log(error);
			toast.error("Payment processing failed");
		} finally {
			setIsProcessing(false);
		}
	};

	const verifyPaymentHandler = async (response, saveOrder) => {
		const paymentData = {
			razorpayOrderId: response.razorpay_order_id,
			razorpayPaymentId: response.razorpay_payment_id,
			razorpaySignature: response.razorpay_signature,
			orderId: saveOrder.orderId,
		};
		try {
			const paymentResponse = await verifyPayment(paymentData);
			if (paymentResponse.status === 200) {
				toast.success("Payment successful");
				setOrderDetails({
					...saveOrder,
					paymentDetails: {
						razorpayOrderId: response.razorpay_order_id,
						razorpayPaymentId: response.razorpay_payment_id,
						razorpaySignature: response.razorpay_signature,
					},
				});
			} else {
				toast.error("Payment processing failed");
			}
		} catch (error) {
			console.log(error);
			toast.error("Payment failed");
		}
	};

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
				<button
					className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
					onClick={() => completePayment("cash")}
					disabled={isProcessing}>
					<Wallet size={18} />
					{isProcessing ? "Processing..." : "Cash"}
				</button>
				<button
					className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
					onClick={() => completePayment("upi")}
					disabled={isProcessing}>
					<CreditCard size={18} />
					{isProcessing ? "Processing..." : "UPI"}
				</button>
			</div>

			{/* Place Order */}
			<div className="flex gap-3 mt-3">
				<button
					className="flex-1 flex items-center justify-center gap-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition"
					onClick={placeOrder}
					disabled={isProcessing || !orderDetails}>
					<Receipt size={18} />
					Place Order
				</button>
			</div>

			{/* Future use */}
			{/* <ReceiptPopup /> */}
			{showPopup && (
				<ReceiptPopup
					orderDetails={{
						...orderDetails,
						razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
						razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
					}}
					onClose={() => setShowPopup(false)}
					onPrint={handlePrintReceipt}
				/>
			)}
		</div>
	);
};

export default CartSummary;
