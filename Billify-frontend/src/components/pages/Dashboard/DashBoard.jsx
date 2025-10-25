import React, { useEffect, useState } from "react";
import { fetchDashBoardData } from "../../../service/Dashboard";
import toast from "react-hot-toast";
import {
	IndianRupee,
	CheckCircle,
	Clock,
	CreditCard,
	AlertCircle,
} from "lucide-react";

const DashBoard = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await fetchDashBoardData();
				setData(response.data);
			} catch (error) {
				console.error(error);
				toast.error("Unable to view the data");
			} finally {
				setLoading(false);
			}
		};
		loadData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen text-gray-200 text-lg font-medium">
				Loading Dashboard...
			</div>
		);
	}

	if (!data) {
		return (
			<div className="flex items-center justify-center h-screen text-red-400 text-lg font-semibold">
				Failed to load the dashboard data...
			</div>
		);
	}

	// Filter only today's orders
	const today = new Date();
	const todaysOrders = data.recentOrders.filter((order) => {
		const orderDate = new Date(order.createdAt);
		return (
			orderDate.getDate() === today.getDate() &&
			orderDate.getMonth() === today.getMonth() &&
			orderDate.getFullYear() === today.getFullYear()
		);
	});

	// // If there are no orders today, show a message or nothing
	// if (todaysOrders.length === 0) {
	// 	return (
	// 		<div className="flex items-start justify-center h-screen pt-2 text-gray-500 text-lg font-medium bg-gray-900">
	// 			No orders today.
	// 		</div>
	// 	);
	// }

	return (
		<div className=" overflow-y-auto overflow-x-hidden h-[calc(100vh-4.65rem)]  flex flex-col bg-gray-900 text-gray-100 p-6">
			{/* Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-6">
				{/* Today's Sales */}
				<div className="flex items-center bg-gray-800 rounded-xl p-5 hover:cursor-pointer hover:scale-105 transition transform shadow-md">
					<div className="p-3 bg-green-100 text-green-600 rounded-full">
						<IndianRupee size={24} />
					</div>
					<div className="ml-4">
						<h3 className="text-gray-400 text-sm">Today's Sales</h3>
						<p className="text-xl font-semibold text-gray-100">
							₹{data.todaySales.toFixed(2)}
						</p>
					</div>
				</div>

				{/* Today's Orders */}
				<div className="flex items-center bg-gray-800 rounded-xl p-5 hover:cursor-pointer hover:scale-105 transition transform shadow-md">
					<div className="p-3 bg-blue-100 text-blue-600 rounded-full">
						<CheckCircle size={24} />
					</div>
					<div className="ml-4">
						<h3 className="text-gray-400 text-sm">Today's Orders</h3>
						<p className="text-xl font-semibold text-gray-100">
							{todaysOrders.length}
						</p>
					</div>
				</div>
			</div>

			{/* Recent Orders (today only) */}
			<div className="bg-gray-800 rounded-xl p-5 shadow-md">
				<div className="flex items-center gap-2 mb-4 text-gray-100">
					<Clock size={20} />
					<h3 className="text-lg font-semibold">Recent Orders</h3>
				</div>
				<div className="overflow-x-auto rounded-xl">
					<table className="min-w-full border-collapse table-auto text-gray-200">
						<thead>
							<tr className="bg-gray-700">
								<th className="text-left px-4 py-2 font-medium">Order Id</th>
								<th className="text-left px-4 py-2 font-medium">Customer</th>
								<th className="text-left px-4 py-2 font-medium">Amount</th>
								<th className="text-left px-4 py-2 font-medium">Payment</th>
								<th className="text-left px-4 py-2 font-medium">Status</th>
								<th className="text-left px-4 py-2 font-medium">Time</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700">
							{todaysOrders.map((order) => (
								<tr
									key={order.orderId}
									className="hover:bg-gray-600 transition">
									<td className="px-4 py-2">{order.orderId.substring(0, 8)}</td>
									<td className="px-4 py-2">{order.customerName}</td>
									<td className="px-4 py-2">₹{order.grandTotal.toFixed(2)}</td>
									<td className="px-4 py-2">
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
									<td className="px-4 py-2">
										<span
											className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
												order.paymentDetails.status.toLowerCase() === "success"
													? "bg-green-100 text-green-700"
													: order.paymentDetails.status.toLowerCase() ===
													  "failed"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{order.paymentDetails.status.toLowerCase() ===
											"failed" ? (
												<AlertCircle size={14} />
											) : (
												<CheckCircle size={14} />
											)}
											{order.paymentDetails.status}
										</span>
									</td>
									<td className="px-4 py-2">
										{new Date(order.createdAt).toLocaleString([], {
											hour: "2-digit",
											minute: "2-digit",
											day: "2-digit",
											month: "short",
										})}
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

export default DashBoard;
