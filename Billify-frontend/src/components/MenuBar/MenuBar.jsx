import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const MenuBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setAuthData, auth } = useContext(AppContext);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setAuthData(null, null);
		navigate("/login", { replace: true });
		toast.success("Logged out successfully");
	};

	// prevent scrolling when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showMobileMenu]);

	const isActive = (path) => {
		return location.pathname.startsWith(path);
	};

	const isAdmin = auth.role === "ROLE_ADMIN";

	return (
		<div className="relative">
			{/* ----------- Top Navigation ------------- */}
			<nav className="fixed flex justify-between items-center top-0 left-0 w-full z-20 bg-gray-900 border-b">
				<div className="container mx-auto flex justify-start gap-7 items-center py-4 md:px-6 sm:px-6 lg:px-6">
					<Link to="/dashboard">
						<img
							className="cursor-pointer h-10 w-auto"
							src={assets.bill}
							alt="logo"
						/>
					</Link>

					{/* Desktop Menu */}
					<ul className="hidden md:flex gap-7 text-white font-medium">
						<li>
							<Link
								to="/dashboard"
								className={`cursor-pointer hover:text-green-500 ${
									isActive("/dashboard")
										? "font-bold text-warning text-green-500"
										: ""
								}`}>
								DASHBOARD
							</Link>
						</li>
						<li>
							<Link
								to="/explore"
								className={`cursor-pointer hover:text-green-500 ${
									isActive("/explore")
										? "font-bold text-warning text-green-500"
										: ""
								}`}>
								EXPLORE
							</Link>
						</li>
						{isAdmin && (
							<>
								<li>
									<Link
										to="/items"
										className={`cursor-pointer hover:text-green-500 ${
											isActive("/items")
												? "font-bold text-warning text-green-500"
												: ""
										}`}>
										MANAGE ITEMS
									</Link>
								</li>
								<li>
									<Link
										to="/category"
										className={`cursor-pointer hover:text-green-500 ${
											isActive("/category")
												? "font-bold text-warning text-green-500"
												: ""
										}`}>
										MANAGE CATEGORIES
									</Link>
								</li>
								<li>
									<Link
										to="/users"
										className={`cursor-pointer hover:text-green-500 ${
											isActive("/users")
												? "font-bold text-warning text-green-500"
												: ""
										}`}>
										MANAGE USERS
									</Link>
								</li>
							</>
						)}
						<li>
							<Link
								to="/orders"
								className={`cursor-pointer hover:text-green-500 ${
									isActive("/orders")
										? "font-bold text-warning text-green-500"
										: ""
								}`}>
								ORDER HISTORY
							</Link>
						</li>
					</ul>
				</div>

				{/* ----------- Profile Dropdown (Desktop) ----------- */}
				<div className="relative m-3 z-10 right-5">
					<img
						src={assets.profile}
						alt="User profile"
						height={52}
						width={52}
						onClick={() => setShowProfileMenu(!showProfileMenu)}
						className="cursor-pointer hover:scale-105 transition-transform duration-200"
					/>
					{showProfileMenu && (
						<ul className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-md z-50 animate-fadeIn">
							<li>
								<a
									href="#"
									className="block px-4 py-2 hover:bg-gray-300 hover:rounded-md">
									Settings
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block px-4 py-2 hover:bg-gray-300 hover:rounded-md">
									Activity Log
								</a>
							</li>
							<li>
								<hr className="border-gray-300" />
							</li>
							<li>
								<button
									onClick={logout}
									className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white hover:rounded-md">
									Logout
								</button>
							</li>
						</ul>
					)}
				</div>

				{/* ----------- Mobile Menu Button ----------- */}
				<button
					onClick={() => setShowMobileMenu(true)}
					className="md:hidden cursor-pointer pr-6"
					aria-label="Open menu"
					aria-expanded={showMobileMenu}>
					<img src={assets.menuIcon} alt="menu" className="w-8" />
				</button>
			</nav>

			{/* ----------- Mobile Slide Menu ----------- */}
			<nav
				className={`fixed top-0 right-0 h-full w-[70%] sm:w-[40%] bg-green-100 z-40 transition-transform duration-500 ease-in-out ${
					showMobileMenu ? "translate-x-0" : "translate-x-full"
				}`}>
				{/* Close Button */}
				<div className="flex justify-end p-6">
					<img
						onClick={() => setShowMobileMenu(false)}
						src={assets.crossIcon}
						alt="Close menu"
						className="p-2 w-10 cursor-pointer hover:bg-green-400 rounded-md transition"
					/>
				</div>

				{/* Menu Links */}
				<ul className="flex flex-col items-start gap-3 mt-5 px-6 text-lg font-medium">
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/dashboard"
						className={`px-4 py-2 rounded-full hover:bg-green-200 inline-block ${
							isActive("/dashboard")
								? "rounded-full text-warning bg-green-200"
								: ""
						}`}>
						DASHBOARD
					</Link>
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/explore"
						className={`px-4 py-2 rounded-full hover:bg-green-200 inline-block ${
							isActive("/explore")
								? "rounded-full text-warning bg-green-200"
								: ""
						}`}>
						EXPLORE
					</Link>
					{isAdmin && (
						<>
							<Link
								onClick={() => setShowMobileMenu(false)}
								to="/items"
								className={`px-4 py-2 rounded-full hover:bg-green-200 inline-block ${
									isActive("/items")
										? "rounded-full text-warning bg-green-200"
										: ""
								}`}>
								MANAGE ITEMS
							</Link>
							<Link
								onClick={() => setShowMobileMenu(false)}
								to="/category"
								className={`px-4 py-2 rounded-full hover:bg-green-200 inline-block ${
									isActive("/category")
										? "rounded-full text-warning bg-green-200"
										: ""
								}`}>
								MANAGE CATEGORIES
							</Link>
							<Link
								onClick={() => setShowMobileMenu(false)}
								to="/users"
								className={`px-4 py-2 rounded-full hover:bg-green-200 inline-block ${
									isActive("/users")
										? "rounded-full text-warning bg-green-200"
										: ""
								}`}>
								MANAGE USERS
							</Link>
						</>
					)}
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/orders"
						className={`px-4 py-2 rounded-full hover:bg-green-200 inline-block ${
							isActive("/orders")
								? "rounded-full text-warning bg-green-200"
								: ""
						}`}>
						ORDER HISTORY
					</Link>
				</ul>
			</nav>
			{/* Overlay Background when Mobile Menu Open */}
			{showMobileMenu && (
				<div
					onClick={() => setShowMobileMenu(false)}
					className="fixed inset-0 bg-black bg-opacity-40 z-30"></div>
			)}
		</div>
	);
};

export default MenuBar;
