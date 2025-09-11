import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

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
			<nav className="absolute top-0 left-0 w-full z-10 bg-gray-900">
				<div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 ">
					<a href="#">
						<img
							className="cursor-pointer h-10 w-auto"
							src={assets.bill}
							alt="logo"
						/>
					</a>
					<ul className="hidden md:flex gap-7 text-white">
						<a href="#" className="cursor-pointer hover:text-green-500">
							DASHBOARD
						</a>
						<a href="#" className="cursor-pointer hover:text-green-500">
							EXPLORE
						</a>
						<a href="#" className="cursor-pointer hover:text-green-500">
							MANAGE ITEMS
						</a>
						<a href="#" className="cursor-pointer hover:text-green-500">
							MANAGE CATEGORIES
						</a>
						<a href="#" className="cursor-pointer hover:text-green-500">
							MANAGE USERS
						</a>
					</ul>
					<button className="hidden md:block px-8 py-2 rounded-full">
						Sign Up/Login
					</button>
					<img
						onClick={handleMenuOpen}
						src={assets.menuIcon}
						alt="menu"
						className="md:hidden w-7 cursor-pointer"
					/>
                    
				</div>
			</nav>
			{/* -----------mobile menu------------- */}
			<nav
				className={`md:hidden ${
					showMobileMenu ? "fixed w-[30%]" : "h-0 w-0"
				} right-0 top-0 bottom-0 rounded-md overflow-hidden bg-green-200 transition-all duration-500 ease-in-out`}>
				<div className="flex justify-start p-6 cursor-pointer">
					<img
						onClick={handleMenuClose}
						src={assets.crossIcon}
						className="p-2 w-10 cursor-pointer hover:bg-green-500 rounded transition-transform duration-300"
					/>
				</div>
				<ul className="flex flex-col items-start gap-2 mt-5 px-5 text-lg font-medium">
					<a
						onClick={() => setShowMobileMenu(false)}
						href="#"
						className="px-4 py-2 rounded-full inline-block">
						DASHBOARD
					</a>
					<a
						onClick={() => setShowMobileMenu(false)}
						href="#"
						className="px-4 py-2 rounded-full inline-block">
						EXPLORE
					</a>
					<a
						onClick={() => setShowMobileMenu(false)}
						href="#"
						className="px-4 py-2 rounded-full inline-block">
						MANAGE ITEMS
					</a>
					<a
						onClick={() => setShowMobileMenu(false)}
						href="#"
						className="px-4 py-2 rounded-full inline-block">
						MANAGE CATEGORIES
					</a>
					<a
						onClick={() => setShowMobileMenu(false)}
						href="#"
						className="px-4 py-2 rounded-full inline-block">
						MANAGE USERS
					</a>
				</ul>
			</nav>
		</div>
	);
};

export default MenuBar;
