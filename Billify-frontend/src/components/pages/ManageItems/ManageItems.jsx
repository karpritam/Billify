import React from "react";

const ManageItems = () => {
	return <div className="flex gap-20 p-5 h-[calc(100vh-5rem)] bg-[#2C3335]">
			<div className="flex-[0.7] flex flex-col border border-[#ccc] rounded-lg p-4  h-full text-white">
				Category form
			</div>
			<div className="flex-[0.3] border border-[#ccc] rounded-lg p-4 h-full text-white">
				List of category
			</div>
		</div>;
};

export default ManageItems;
