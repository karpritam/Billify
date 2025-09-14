import React from "react";

const ItemForm = () => {
	return (
		<div className="item-form-container h-screen md:h-auto overflow-y-auto overflow-x-hidden">
			<div className="mx-2 mt-2">
				<div className="flex flex-wrap -mx-3">
					<div className="bg-white rounded-lg shadow p-6 md:w-2/3 max-w-md">
						<form className="space-y-4">
							{/* Image Upload */}
							<div className="flex flex-col">
								<label htmlFor="image" className="cursor-pointer">
									<img
										src="https://placehold.co/48x48"
										alt="Upload"
										className="w-12 h-12 "
									/>
								</label>
								<input type="file" name="image" id="image" className="hidden" />
							</div>

							{/* Name Field */}
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 mb-1">
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Item Name"
									className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="category"
									className="block text-sm font-medium text-gray-700 mb-2">
									Category
								</label>
								<select
									name="category"
									id="category"
									className="w-full rounded-lg border border-gray-300 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
									<option value="">-- SELECT CATEGORY --</option>
									<option value="Category 1">Category 1</option>
									<option value="Category 2">Category 2</option>
								</select>
							</div>

							<div className="mb-4">
								<label
									htmlFor="price"
									className="block text-sm font-medium text-gray-700 mb-2">
									Price
								</label>
								<input
									type="number"
									name="price"
									id="price"
									className="w-full rounded-lg border border-gray-300 p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="₹200.00"
								/>
							</div>

							{/* description */}
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>

								<textarea
									rows={5}
									name="description"
									id="description"
									placeholder="Write content here..."
									className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
							</div>
							{/* button */}
							<div className="text-right">
								<button
									type="submit"
									className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300">
									Save
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
