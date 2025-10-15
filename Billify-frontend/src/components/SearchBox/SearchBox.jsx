import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBox = ({ onSearch }) => {
	const [searchText, setSearchText] = useState("");

	const handleInputChange = (e) => {
		const text = e.target.value;
		setSearchText(text);
		onSearch(text);
	};

	return (
		<div className="flex justify-end mb-4 w-full">
			<div className="w-1/4 min-w-[300px] flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-200">
				<input
					type="text"
					placeholder="Search items..."
					value={searchText}
					onChange={handleInputChange}
					className="flex-1 flex-shrink px-3 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
				/>
				<span className="bg-yellow-400 px-3 py-1  flex items-center justify-center cursor-pointer">
					<MagnifyingGlassIcon className="h-8 w-6 text-gray-800" />
				</span>
			</div>
		</div>
	);
};

export default SearchBox;
