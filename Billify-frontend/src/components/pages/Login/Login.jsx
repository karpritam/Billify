import React from "react";
import { assets } from "../../../assets/assets";
function Login() {
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

				<form className="mt-6 space-y-4">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-600">
							Email
						</label>
						<input
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
							id="password"
							type="password"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							placeholder="********"
						/>
					</div>

					<div>
						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-200">
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
