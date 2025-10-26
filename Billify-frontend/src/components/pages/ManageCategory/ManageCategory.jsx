import CategoryForm from "./CategoryForm/CategoryForm";
import CategoryList from "./CategoryList/CategoryList";

const ManageCategory = () => {
	return (
		<div className="flex gap-5 box-border p-6 h-[calc(100vh-4.64rem)] bg-gray-900">
			{/* Left Section: Category Form */}
			<div className="flex-[0.7] flex flex-col border border-gray-700 rounded-xl p-4 bg-gray-800 shadow-md">
				<CategoryForm />
			</div>
			{/* Right Section: Category List */}
			<div className="flex-[0.3] border border-gray-700 rounded-xl p-4 bg-[#1e2426] shadow-md overflow-auto">
				<CategoryList />
			</div>
		</div>
	);
};

export default ManageCategory;
