import React, { useState } from "react";
import { addUser } from "../../../../service/UserService";
import toast from "react-hot-toast";

const UserForm = ({ setUsers }) => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		role: "ROLE_USER",
	});
	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (!data.name || !data.email || !data.password) {
			let missingFields = [];

			if (!data.name) missingFields.push("Name");
			if (!data.email) missingFields.push("Email");
			if (!data.password) missingFields.push("Password");

			const message =
				missingFields.length === 1
					? `${missingFields[0]} field is required`
					: `${missingFields.join(", ")} fields are required`;

			toast.error(message);
			return;
		}
		setLoading(true);
		//api call
		try {
			const response = await addUser(data);
			setUsers((prevUsers) => [...prevUsers, response.data]);
			toast.success("User Added");
			setData({
				name: "",
				email: "",
				password: "",
				role: "ROLE_USER",
			});
		} catch (error) {
			console.log(error);
			toast.error("Error adding user");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="mx-2 mt-2">
			<div className="flex flex-wrap -mx-3">
				<div className="bg-white rounded-lg shadow p-6 md:w-2/3 ">
					<form className="space-y-4" onSubmit={onSubmitHandler}>
						{/* Name Field */}
						<div className="mb-3">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								onChange={onChangeHandler}
								value={data.name}
								name="name"
								type="text"
								id="name"
								placeholder="Enter Your name"
								className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1">
								E-mail
							</label>
							<input
								onChange={onChangeHandler}
								value={data.email}
								name="email"
								type="email"
								id="email"
								placeholder="yourname@example.com"
								className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div className="mb-3">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1">
								Password
							</label>
							<input
								onChange={onChangeHandler}
								value={data.password}
								name="password"
								type="password"
								id="password"
								placeholder="********"
								className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>

						{/* button */}
						<div className="text-right">
							<button
								type="submit"
								className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
								disabled={loading}>
								{loading ? "Loading..." : "Save"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UserForm;
