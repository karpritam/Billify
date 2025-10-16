import React from "react";

const CustomerForm = ({
	customerName,
	mobileNumber,
	setCustomerName,
	setMobileNumber,
}) => {
	return (
		<div className="p-4">
			{/* Customer Name */}
			<div className="mb-4">
				<div className="flex items-center gap-3">
					<label htmlFor="customerName" className="w-1/3 text-sm font-medium ">
						Customer Name
					</label>
					<input
						type="text"
						id="customerName"
						className="w-2/3 border border-gray-300 rounded-md px-3 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter customer name"
						onChange={(e) => setCustomerName(e.target.value)}
						value={customerName}
					/>
				</div>
			</div>

			{/* Mobile Number */}
			<div className="mb-4">
				<div className="flex items-center gap-3">
					<label htmlFor="mobileNumber" className="w-1/3 text-sm font-medium ">
						Mobile Number
					</label>
					<input
						type="text"
						id="mobileNumber"
						className="w-2/3 border border-gray-300 rounded-md px-3 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter mobile number"
						onChange={(e) => setMobileNumber(e.target.value)}
						value={mobileNumber}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomerForm;
