import React from "react";

const UserForm = () => {
	return (
		<div className="mx-2 mt-2">
			<div className="flex flex-wrap -mx-3">
				<div className="bg-white rounded-lg shadow p-6 md:w-2/3 max-w-md">
					<form className="space-y-4">
						{/* Name Field */}
						<div className="mb-3">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Enter Your name"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1">
								E-mail
							</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="yourname@example.com"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="********"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						{/* button */}
						<div className="text-right">
							<button
								type="submit"
								className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserForm;
