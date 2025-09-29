import React from "react";
import MenuBar from "./components/MenuBar/MenuBar";
import { Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "./components/pages/Dashboard/DashBoard";
import Explore from "./components/pages/Explore/Explore";
import ManageCategory from "./components/pages/ManageCategory/ManageCategory";
import ManageItems from "./components/pages/ManageItems/ManageItems";
import ManageUsers from "./components/pages/ManageUsers/ManageUsers";
import { Toaster } from "react-hot-toast";
import Login from "./components/pages/Login/Login";

const App = () => {
	const location = useLocation();
	return (
		<div>
			{location.pathname !== "/login" && <MenuBar />}
			<Toaster position="top-center" reverseOrder={true} />
			<Routes>
				<Route path="/dashboard" element={<DashBoard />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/category" element={<ManageCategory />} />
				<Route path="/items" element={<ManageItems />} />
				<Route path="/users" element={<ManageUsers />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<DashBoard />} />
			</Routes>
		</div>
	);
};

export default App;
