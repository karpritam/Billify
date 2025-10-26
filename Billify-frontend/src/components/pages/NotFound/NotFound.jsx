import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-center items-center h-[calc(100vh-4.8rem)] bg-gray-100 text-center p-5 overflow-y-hidden">
			<div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg border border-gray-200">
				<div className="flex justify-center mb-4 text-red-600">
					<AlertTriangle size={64} strokeWidth={1.5} />
				</div>

				<h1 className="text-6xl font-extrabold text-gray-800 mb-2">404</h1>
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Oops! Page not found
				</h2>

				<p className="text-gray-500 mb-6 text-lg">
					The page you're looking for doesn't exist or has been removed.
				</p>

				<button
					onClick={() => navigate("/")}
					className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300">
					Go to Homepage
				</button>
			</div>
		</div>
	);
};

export default NotFound;
