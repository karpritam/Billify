import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Item from "../Item/Item";
import SearchBox from "../SearchBox/SearchBox";

const DisplayItems = ({ selectedCategory }) => {
	const { itemsData } = useContext(AppContext);
	const [searchText, setSearchText] = useState("");
	const filteredItems = itemsData
		.filter((item) => {
			if (!selectedCategory) return true;
			return item.categoryId === selectedCategory;
		})
		.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);

	return (
		<div className="p-3">
			<div className="d-flex justify-between items-center">
				<div></div>
				<div>
					<SearchBox onSearch={setSearchText} />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{filteredItems.map((item, index) => (
					<Item
						key={index}
						itemName={item.name}
						itemPrice={item.price}
						itemImage={item.imgUrl}
						itemId={item.itemId}
					/>
				))}
			</div>
		</div>
	);
};

export default DisplayItems;
