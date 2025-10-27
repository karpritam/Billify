import React, { useEffect, useState } from "react";
import { deleteOrder, latestOrders } from "../../../service/OrderService";
import {
	Clock,
	CreditCard,
	CheckCircle,
	AlertCircle,
	ShoppingBag,
} from "lucide-react";
import { TrashIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const OrderHistory = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await latestOrders();
				setOrders(response.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
				toast.error("Failed to load orders");
			} finally {
				setLoading(false);
			}
		};
		fetchOrders();
	}, []);

	const formatItems = (items) =>
		items.map((item) => `${item.name} × ${item.quantity}`).join(", ");

	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "short",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString("en-US", options);
	};

	const deleteByOrderId = async (id) => {
		const toastId = toast.loading("Deleting order...");
		try {
			await deleteOrder(id);
			setOrders((prev) => prev.filter((order) => order.orderId !== id));
			toast.success("Order deleted successfully", { id: toastId });
		} catch (error) {
			console.error(error);
			toast.error("Unable to delete the order", { id: toastId });
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-[calc(100vh-4.64rem)] text-gray-500 text-lg bg-gray-900">
				<Clock className="animate-spin mr-2" size={20} /> Loading orders...
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="flex p-3 items-start justify-center h-screen text-gray-500 text-lg bg-gray-900">
				<ShoppingBag className="mr-2 mt-1" size={20} /> No orders found.
			</div>
		);
	}

	return (
		<div className="relative overflow-y-auto overflow-x-hidden h-[calc(100vh-4.65rem)] flex flex-col bg-gray-900 text-gray-100">
			<div className="p-4 flex-none border-b-2 border-gray-700 flex items-center justify-between">
				<h2 className="text-2xl font-semibold flex items-center gap-2">
					<ShoppingBag className="text-blue-400" /> All Orders
				</h2>
			</div>

			<div className="flex-1 overflow-auto p-6">
				<div className="overflow-x-auto bg-gray-800 rounded-xl shadow-md">
					<table className="min-w-full border-collapse">
						<thead>
							<tr className="bg-gray-700 text-gray-200 text-sm uppercase tracking-wider sticky top-0">
								<th className="px-4 py-3 text-left">Order ID</th>
								<th className="px-4 py-3 text-left">Customer</th>
								<th className="px-4 py-3 text-left">Items</th>
								<th className="px-4 py-3 text-left">Total</th>
								<th className="px-4 py-3 text-left">Payment</th>
								<th className="px-4 py-3 text-left">Status</th>
								<th className="px-4 py-3 text-left">Date</th>
								<th className="px-4 py-3 text-left"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700">
							{orders.map((order) => (
								<tr
									key={order.orderId}
									className="hover:bg-gray-700/40 transition duration-150">
									<td className="px-4 py-3 font-medium text-gray-100">
										{order.orderId}
									</td>
									<td className="px-4 py-3">
										<div>
											<div className="font-semibold text-gray-100">
												{order.customerName}
											</div>
											<div className="text-sm text-gray-400">
												{order.phoneNumber}
											</div>
										</div>
									</td>
									<td className="px-4 py-3 text-sm text-gray-300">
										{formatItems(order.items)}
									</td>
									<td className="px-4 py-3 font-semibold text-green-400">
										₹{order.grandTotal.toFixed(2)}
									</td>
									<td className="px-4 py-3">
										<span
											className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
												order.paymentMethod.toLowerCase() === "upi"
													? "bg-purple-100 text-purple-700"
													: order.paymentMethod.toLowerCase() === "card"
													? "bg-blue-100 text-blue-700"
													: "bg-gray-600 text-gray-100"
											}`}>
											<CreditCard size={14} />
											{order.paymentMethod}
										</span>
									</td>
									<td className="px-4 py-3">
										<span
											className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
												order.paymentDetails?.status === "COMPLETED"
													? "bg-green-100 text-green-700"
													: order.paymentDetails?.status === "FAILED"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{order.paymentDetails?.status === "FAILED" ? (
												<AlertCircle size={14} />
											) : (
												<CheckCircle size={14} />
											)}
											{order.paymentDetails?.status || "PENDING"}
										</span>
									</td>
									<td className="px-4 py-3 text-sm text-gray-300">
										{formatDate(order.createdAt)}
									</td>
									<td className="px-4 py-3">
										<button
											onClick={() => deleteByOrderId(order.orderId)}
											className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
											title="Delete">
											<TrashIcon className="h-4 w-4 text-white" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default OrderHistory;
