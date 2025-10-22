import React, { useEffect, useState } from "react";
import { latestOrders } from "../../../service/OrderService";

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
			<div className="text-center py-6 text-gray-600">Loading orders...</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="text-center py-6 text-gray-500">No orders found.</div>
		);
	}

	return (
		<div className="p-6 min-h-[calc(100vh-4.5rem)] bg-[#2C3335]">
			<h2 className="text-2xl font-semibold text-gray-100 mb-4">
				Recent Orders
			</h2>

			<div className="overflow-x-auto bg-white rounded-xl ">
				<table className="min-w-full border-collapse">
					<thead className="bg-gray-800 text-white">
						<tr>
							<th className="px-4 py-3 text-left text-sm font-medium">
								Order ID
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium">
								Customer
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium">Items</th>
							<th className="px-4 py-3 text-left text-sm font-medium">Total</th>
							<th className="px-4 py-3 text-left text-sm font-medium">
								Payment
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium">
								Status
							</th>
							<th className="px-4 py-3 text-left text-sm font-medium">Date</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 text-gray-700">
						{orders.map((order) => (
							<tr
								key={order.orderId}
								className="hover:bg-gray-50 transition duration-150">
								<td className="px-4 py-3 font-medium text-gray-800">
									{order.orderId}
								</td>
								<td className="px-4 py-3">
									<div>
										<div className="font-semibold">{order.customerName}</div>
										<div className="text-sm text-gray-500">
											{order.phoneNumber}
										</div>
									</div>
								</td>
								<td className="px-4 py-3 text-sm">
									{formatItems(order.items)}
								</td>
								<td className="px-4 py-3 font-semibold text-gray-800">
									₹{order.grandTotal.toFixed(2)}
								</td>
								<td className="px-4 py-3">{order.paymentMethod}</td>
								<td className="px-4 py-3">
									<span
										className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
											order.paymentDetails?.status === "COMPLETED"
												? "bg-green-100 text-green-700"
												: "bg-yellow-100 text-yellow-800"
										}`}>
										{order.paymentDetails?.status || "PENDING"}
									</span>
								</td>
								<td className="px-4 py-3 text-sm">
									{formatDate(order.createdAt)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderHistory;
