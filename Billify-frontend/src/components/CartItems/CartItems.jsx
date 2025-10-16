import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Plus, Minus, Trash2 } from "lucide-react";

const CartItems = () => {
	const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext);

	return (
		<div className="p-4 h-full overflow-y-auto ">
			{cartItems.length === 0 ? (
				<p className="text-gray-300 text-center">Your cart is empty</p>
			) : (
				<div className="space-y-4">
					{cartItems.map((item, index) => (
						<div
							key={index}
							className="bg-gray-800 text-gray-100 p-4 rounded-xl shadow-sm border border-gray-700">
							{/* Item Header */}
							<div className="flex justify-between items-center mb-3">
								<h6 className="text-base font-semibold">{item.name}</h6>
								<p className="text-sm font-medium text-gray-300">
									₹{(item.price * item.quantity).toFixed(2)}
								</p>
							</div>

							{/* Quantity Controls */}
							<div className="flex justify-between items-center">
								<div className="flex items-center gap-3">
									<button
										className="p-2 bg-red-600 hover:bg-red-700 rounded-full disabled:opacity-40 transition"
										onClick={() =>
											updateQuantity(item.itemId, item.quantity - 1)
										}
										disabled={item.quantity === 1}>
										<Minus size={16} />
									</button>

									<span className="text-sm font-medium">{item.quantity}</span>

									<button
										className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition"
										onClick={() =>
											updateQuantity(item.itemId, item.quantity + 1)
										}>
										<Plus size={16} />
									</button>
								</div>

								{/* Delete Button */}
								<button
									className="p-2 bg-red-700 hover:bg-red-800 rounded-full transition"
									onClick={() => removeFromCart(item.itemId)}>
									<Trash2 size={16} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CartItems;
