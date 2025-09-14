import React from "react";

const CategoryForm = () => {
	return (
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
								placeholder="Category Name"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						{/* description */}
						<div className="mb-3">
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
						{/* for choose color */}
						<div className="mb-3">
							<label
								htmlFor="bgcolor"
								className="text-sm font-medium text-gray-700 ">
								Background Color
							</label>
							<br />
							<input
								type="color"
								name="bgColor"
								id="bgColor"
								placeholder="#ffffff"
								className="w-16 h-10 p-1 border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
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
	);
};

export default CategoryForm;
