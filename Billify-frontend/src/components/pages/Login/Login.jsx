import React, { useContext, useState } from "react";
import { assets } from "../../../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { login } from "../../../service/AuthService";
function Login() {
	const { setAuthData } = useContext(AppContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (!data.email || !data.password) {
			toast.error("Please enter both email and password");
			return;
		}
		setLoading(true);
		try {
			const response = await login(data);
			if (response.status === 200) {
				toast.success("Login Successfull");
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("role", response.data.role);
				setAuthData(response.data.token, response.data.role);
				navigate("/dashboard");
			}
		} catch (error) {
			console.log(error);
			toast.error( "Email/Password Invalid"|| error.message );
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-y-auto overflow-x-hidden">
			<video
				className="absolute inset-0 w-full h-full object-cover"
				autoPlay
				loop
				muted
				playsInline>
				<source src={assets.loginBg} type="video/mp4" />
			</video>

			{/* Overlay */}
			<div className="absolute inset-0 bg-white/50"></div>

			{/* Login card */}
			<div className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
				<div className="text-center">
					<h1 className="text-2xl font-bold">Sign in</h1>
					<p className="text-gray-500 mt-2">
						Sign in below to access your account
					</p>
				</div>

				<form className="mt-6 space-y-4" onSubmit={onSubmitHandler}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-600">
							Email
						</label>
						<input
							onChange={onChangeHandler}
							value={data.email}
							name="email"
							id="email"
							type="email"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							placeholder="yourname@example.com"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-600">
							Password
						</label>
						<input
							onChange={onChangeHandler}
							value={data.password}
							name="password"
							id="password"
							type="password"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							placeholder="********"
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-200"
							disabled={loading}>
							{loading ? "Loading..." : "Sign in"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
