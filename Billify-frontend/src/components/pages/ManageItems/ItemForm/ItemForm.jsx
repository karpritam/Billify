import React, { useContext, useState } from "react";
import { assets } from "../../../../assets/assets";
import { AppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";
import { addItem } from "../../../../service/ItemService";

const ItemForm = () => {
	const { categories, setItemsData, itemsData, setCategories } =
		useContext(AppContext);
	const [image, setImage] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({
		name: "",
		categoryId: "",
		price: "",
		description: "",
	});

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (!image || !data.name || !data.categoryId || !data.price) {
			let missingFields = [];
			if (!image) missingFields.push("Image");
			if (!data.name) missingFields.push("Name");
			if (!data.categoryId) missingFields.push("Category");
			if (!data.price) missingFields.push("Price");
			toast.error(
				missingFields.length === 1
					? `${missingFields[0]} field is required`
					: `${missingFields.join(", ")} fields are required`
			);
			return;
		}

		if (data.price <= 0) {
			toast.error("Price must be greater than 0");
			return;
		}

		setLoading(true);
		const formData = new FormData();
		formData.append("item", JSON.stringify(data));
		formData.append("file", image);

		try {
			const response = await addItem(formData);
			if (response.status === 201) {
				setItemsData([...itemsData, response.data]);
				setCategories((prevCategories) => {
					return prevCategories.map((category) =>
						category.categoryId === data.categoryId
							? { ...category, items: category.items + 1 }
							: category
					);
				});
				toast.success("Item added successfully!");

				// Reset form
				setData({ name: "", categoryId: "", price: "", description: "" });
				setImage(false);
			} else {
				toast.error("Unable to add item");
			}
		} catch (error) {
			console.error(error);
			toast.error("Unable to add item");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="md:h-auto overflow-y-auto overflow-x-hidden">
			<div className="mx-2 mt-2">
				<div className="flex flex-wrap">
					<div className="bg-white rounded-lg shadow p-6 sm:w-full md:w-2/3">
						<form onSubmit={onSubmitHandler} className="space-y-4">
							{/* Image Upload */}
							<div className="flex flex-col">
								<label htmlFor="image" className="cursor-pointer">
									<img
										src={image ? URL.createObjectURL(image) : assets.upload}
										alt="Upload"
										className="w-12 h-12"
									/>
								</label>
								<input
									type="file"
									name="image"
									id="image"
									className="hidden"
									onChange={(e) => setImage(e.target.files[0])}
								/>
							</div>

							{/* Name */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Name
								</label>
								<input
									onChange={onChangeHandler}
									value={data.name}
									required
									type="text"
									name="name"
									placeholder="Item Name"
									className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							{/* Category */}
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Category
								</label>
								<select
									onChange={onChangeHandler}
									value={data.categoryId}
									required
									name="categoryId"
									className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
									<option value="">-- SELECT CATEGORY --</option>
									{categories.map((category, index) => (
										<option key={index} value={category.categoryId}>
											{category.name}
										</option>
									))}
								</select>
							</div>

							{/* Price */}
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Price
								</label>
								<input
									onChange={onChangeHandler}
									value={data.price}
									required
									type="number"
									name="price"
									placeholder="₹200.00"
									className="w-full rounded-lg border border-gray-300 text-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							{/* Description */}
							<div className="mb-4">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									onChange={onChangeHandler}
									value={data.description}
									rows={5}
									name="description"
									placeholder="Write content here..."
									className="w-full border border-gray-300 text-gray-800 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
							</div>

							{/* Button */}
							<div className="text-right">
								<button
									type="submit"
									disabled={loading}
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
									{loading ? "Loading..." : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ItemForm;
