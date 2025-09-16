import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../../../assets/assets";
import { addCategory } from "../../../../service/CategoryService";
import { AppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";

const CategoryForm = () => {
	const { categories, setCategories } = useContext(AppContext);
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(false);
	const [data, setData] = useState({
		name: "",
		description: "",
		bgColor: "#2c2c2c",
	});
	useEffect(() => {
		console.log(data);
	}, [data]);
	const onChangeHandler = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setData((data) => ({ ...data, [name]: value }));
	};
	//fetch api
	const onSubmitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!image) {
			toast.error("Please select image for category");
			setLoading(false);
			return;
		}
		const formData = new FormData();
		formData.append("category", JSON.stringify(data));
		formData.append("file", image);
		try {
			const response = await addCategory(formData);
			if (response.status === 201) {
				setCategories([...categories, response.data]);
				toast.success("Category added successfully.");
				setData({
					name: "",
					description: "",
					bgColor: "#2c2c2c",
				});
				setImage(false);
			}
		} catch (err) {
			console.error(err);
			toast.error("Error adding category");
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="mx-2 mt-2">
			<div className="flex flex-wrap -mx-3 ">
				<div className="bg-white rounded-lg shadow p-6 sm:w-full md:w-2/3 max-w-md">
					<form onSubmit={onSubmitHandler} className="space-y-4">
						{/* Image Upload */}
						<div className="flex flex-col">
							<label htmlFor="image" className="cursor-pointer">
								<img
									src={image ? URL.createObjectURL(image) : assets.upload}
									alt="Upload"
									className="w-12 h-12 "
								/>
							</label>
							<input
								type="file"
								name="image"
								id="image"
								className="hidden"
								onChange={(e) => {
									setImage(e.target.files[0]);
								}}
							/>
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
								onChange={onChangeHandler}
								value={data.name}
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
								className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								onChange={onChangeHandler}
								value={data.description}></textarea>
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
								onChange={onChangeHandler}
								value={data.bgColor}
							/>
						</div>
						{/* button */}
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
	);
};

export default CategoryForm;
