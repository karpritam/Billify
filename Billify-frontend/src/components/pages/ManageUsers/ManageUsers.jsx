import React, { useEffect, useState } from "react";
import UserForm from "./UserForm/UserForm";
import UserList from "./UserList/UserList";
import toast from "react-hot-toast";
import { fetchUser } from "../../../service/UserService";

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);

	//fetch api endpoints
	useEffect(() => {
		async function loadUsers() {
			try {
				setLoading(true);
				const response = await fetchUser();
				setUsers(response.data);
			} catch (error) {
				console.error(error);
				toast.error("Unable to fetch users");
			} finally {
				setLoading(false);
			}
		}
		loadUsers();
	}, []);

	return (
		<div className="flex gap-5 box-border p-6 h-[calc(100vh-5rem)] bg-[#2C3335]">
			<div className="flex-[0.7] flex flex-col border border-[#ccc] rounded-lg p-4  h-full text-white">
				<UserForm setUsers={setUsers} />
			</div>
			<div className="flex-[0.3] border border-[#ccc] rounded-lg p-4 h-full text-white">
				<UserList users={users} setUsers={setUsers} />
			</div>
		</div>
	);
};

export default ManageUsers;
