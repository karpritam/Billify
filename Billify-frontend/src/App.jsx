import React, { useContext } from "react";
import MenuBar from "./components/MenuBar/MenuBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "./components/pages/Dashboard/DashBoard";
import Explore from "./components/pages/Explore/Explore";
import ManageCategory from "./components/pages/ManageCategory/ManageCategory";
import ManageItems from "./components/pages/ManageItems/ManageItems";
import ManageUsers from "./components/pages/ManageUsers/ManageUsers";
import { Toaster } from "react-hot-toast";
import Login from "./components/pages/Login/Login";
import OrderHistory from "./components/pages/OrderHistory/OrderHistory";
import { AppContext } from "./context/AppContext";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => {
	const location = useLocation();
	const { auth } = useContext(AppContext);

	const LoginRoute = ({ element }) => {
		if (auth.token) {
			return <Navigate to="/dashboard" replace />;
		}
		return element;
	};

	const ProtectedRoute = ({ element, allowedRoles }) => {
		if (!auth.token) {
			return <Navigate to="/login" replace />;
		}

		if (allowedRoles && !allowedRoles.includes(auth.role)) {
			return <Navigate to="/dashboard" replace />;
		}
		return element;
	};

	return (
		<div className="min-h-screen bg-gray-900">
			{location.pathname !== "/login" && <MenuBar />}

			{/*Add top padding only when MenuBar is visible */}
			<div className={location.pathname !== "/login" ? "pt-16" : ""}>
				<Toaster position="top-center" reverseOrder={true} />
				<Routes>
					<Route path="/dashboard" element={<DashBoard />} />
					<Route path="/explore" element={<Explore />} />

					{/* Admin only routes */}
					<Route
						path="/category"
						element={
							<ProtectedRoute
								element={<ManageCategory />}
								allowedRoles={["ROLE_ADMIN"]}
							/>
						}
					/>
					<Route
						path="/items"
						element={
							<ProtectedRoute
								element={<ManageItems />}
								allowedRoles={["ROLE_ADMIN"]}
							/>
						}
					/>
					<Route
						path="/users"
						element={
							<ProtectedRoute
								element={<ManageUsers />}
								allowedRoles={["ROLE_ADMIN"]}
							/>
						}
					/>

					<Route path="/login" element={<LoginRoute element={<Login />} />} />
					<Route path="/orders" element={<OrderHistory />} />
					<Route path="/" element={<DashBoard />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
