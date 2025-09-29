import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const MenuBar = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	useEffect(() => {
		if (showMobileMenu) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [showMobileMenu]);
	const handleMenuOpen = () => {
		setTimeout(() => {
			setShowMobileMenu(true);
		}, 250);
	};
	const handleMenuClose = () => {
		setTimeout(() => {
			setShowMobileMenu(false);
		}, 250);
	};
	return (
		<div>
			<nav className="flex justify-between  top-0 left-0 w-full z-10 bg-gray-900">
				<div className="container mx-auto flex justify-start gap-7 items-center py-4 px-6 md:px-20 lg:px-32 ">
					<Link to="/">
						<img
							className="cursor-pointer h-10 w-auto"
							src={assets.bill}
							alt="logo"
						/>
					</Link>
					<ul className="hidden md:flex gap-7 text-white">
						<Link
							to="/dashboard"
							className="cursor-pointer hover:text-green-500">
							DASHBOARD
						</Link>
						<Link to="/explore" className="cursor-pointer hover:text-green-500">
							EXPLORE
						</Link>
						<Link to="/items" className="cursor-pointer hover:text-green-500">
							MANAGE ITEMS
						</Link>
						<Link
							to="/category"
							className="cursor-pointer hover:text-green-500">
							MANAGE CATEGORIES
						</Link>
						<Link to="/users" className="cursor-pointer hover:text-green-500">
							MANAGE USERS
						</Link>
					</ul>
				</div>
				<button className="hidden md:block px-6 py-2 rounded-full text-white">
					Sign Up/Login
				</button>
				<button
					onClick={handleMenuOpen}
					className="md:hidden cursor-pointer pr-10"
					aria-label="Open menu"
					aria-expanded={showMobileMenu}>
					<img src={assets.menuIcon} alt="" className="w-7" />
				</button>
			</nav>
			{/* -----------mobile menu------------- */}
			<nav
				className={`md:hidden ${
					showMobileMenu ? "fixed w-[40%]" : "h-0 w-0"
				} right-0 top-0 bottom-0 rounded-md overflow-hidden bg-green-100 transition-all duration-500 ease-in-out z-20`}>
				<div className="flex justify-end p-6 cursor-pointer pr-8">
					<img
						onClick={handleMenuClose}
						src={assets.crossIcon}
						className="p-2 w-10 cursor-pointer hover:bg-green-500 rounded "
					/>
				</div>
				<ul className="flex flex-col items-start gap-2 mt-5 px-5 text-lg font-medium">
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/dashboard"
						className="px-4 py-2 rounded-full inline-block">
						DASHBOARD
					</Link>
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/explore"
						className="px-4 py-2 rounded-full inline-block">
						EXPLORE
					</Link>
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/items"
						className="px-4 py-2 rounded-full inline-block">
						MANAGE ITEMS
					</Link>
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/category"
						className="px-4 py-2 rounded-full inline-block">
						MANAGE CATEGORIES
					</Link>
					<Link
						onClick={() => setShowMobileMenu(false)}
						to="/users"
						className="px-4 py-2 rounded-full inline-block">
						MANAGE USERS
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default MenuBar;
