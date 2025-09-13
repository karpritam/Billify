import CategoryForm from "./CategoryForm/CategoryForm";
import CategoryList from "./CategoryList/CategoryList";

const ManageCategory = () => {
	return (
		<div className="flex gap-20 md:flex-row p-5 h-[calc(100vh-5rem)] bg-[#2C3335]">
			{/* Left Section: Category Form */}
			<div className="flex-[0.7] flex flex-col border border-[#ccc] rounded-lg p-4  h-full ">
				<CategoryForm />
			</div>
			{/* Right Section: Category List */}
			<div className="flex-[0.3] border border-[#ccc] rounded-lg p-4 h-full ">
				<CategoryList />
			</div>
		</div>
	);
};

export default ManageCategory;
