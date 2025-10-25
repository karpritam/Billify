import React, { useEffect, useState } from "react";
import { latestOrders } from "../../../service/OrderService";
import {
	Clock,
	CreditCard,
	CheckCircle,
	AlertCircle,
	ShoppingBag,
} from "lucide-react";

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

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-400 text-lg">
				<Clock className="animate-spin mr-2" size={20} /> Loading orders...
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-500 text-lg">
				<ShoppingBag className="mr-2" size={20} /> No orders found.
			</div>
		);
	}

	return (
		<div className="overflow-y-auto overflow-x-hidden h-[calc(100vh-4.65rem)] flex flex-col bg-gray-900 text-gray-100">
			<div className="p-4 flex-none border-b-2 border-gray-700 flex items-center justify-between">
				<h2 className="text-2xl font-semibold flex items-center gap-2">
					<ShoppingBag className="text-blue-400" /> All Orders
				</h2>
			</div>

			<div className="flex-1 overflow-auto p-6">
				<div className="overflow-x-auto bg-gray-800 rounded-xl shadow-md">
					<table className="min-w-full border-collapse">
						<thead>
							<tr className="bg-gray-700 text-gray-200 text-sm uppercase tracking-wider">
								<th className="px-4 py-3 text-left">Order ID</th>
								<th className="px-4 py-3 text-left">Customer</th>
								<th className="px-4 py-3 text-left">Items</th>
								<th className="px-4 py-3 text-left">Total</th>
								<th className="px-4 py-3 text-left">Payment</th>
								<th className="px-4 py-3 text-left">Status</th>
								<th className="px-4 py-3 text-left">Date</th>
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
