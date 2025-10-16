import React, { useContext } from "react";
import { ShoppingCart, Plus } from "lucide-react"; // Tailwind-friendly icon set
import { AppContext } from "../../context/AppContext";

const Item = ({ itemName, itemPrice, itemImage, itemId }) => {
	const { addToCart } = useContext(AppContext);
	const handleAddToCart = () => {
		addToCart({
			name: itemName,
			price: itemPrice,
			quantity: 1,
			itemId: itemId,
		});
	};
	return (
		<div
			className="
				flex items-center p-3 
				bg-gray-800 rounded-lg shadow-md 
				hover:-translate-y-1 
				transition-transform duration-300 
				hover:shadow-lg
			">
			<div className="mr-4">
				<img
					src={itemImage}
					alt={itemName}
					className="
						w-20 h-20 
						rounded-lg border-2 border-white 
						object-cover
					"
				/>
			</div>

			<div className="flex-grow">
				<h6 className="text-white font-semibold mb-1">{itemName}</h6>
				<p className="text-gray-300 font-bold">₹{itemPrice}</p>
			</div>

			<div className="flex flex-col items-center justify-between h-full ml-3 space-y-2">
				<ShoppingCart className="text-yellow-400 w-6 h-6" />
				<button
					className="bg-green-600 hover:bg-green-700 text-white rounded-md p-1"
					onClick={handleAddToCart}>
					<Plus className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default Item;
