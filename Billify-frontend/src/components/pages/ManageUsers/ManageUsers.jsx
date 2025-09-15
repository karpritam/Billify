import React from "react";
import UserForm from "./UserForm/UserForm";
import UserList from "./UserList/UserList";

const ManageUsers = () => {
	return (
		<div className="flex gap-5 box-border p-6 h-[calc(100vh-5rem)] bg-[#2C3335]">
			<div className="flex-[0.7] flex flex-col border border-[#ccc] rounded-lg p-4  h-full text-white">
				<UserForm />
			</div>
			<div className="flex-[0.3] border border-[#ccc] rounded-lg p-4 h-full text-white">
				<UserList />
			</div>
		</div>
	);
};

export default ManageUsers;
