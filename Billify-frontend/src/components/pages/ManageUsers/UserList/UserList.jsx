import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteUser } from "../../../../service/UserService";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Users } from "lucide-react";

const UserList = ({ users, setUsers }) => {
	const [searchItem, setSearchItem] = useState("");

	const filteredUsers = users.filter((user) =>
		user.name?.toLowerCase().includes(searchItem.toLowerCase())
	);

	const deleteByUserId = (id) => {
		toast(
			(t) => (
				<div className="flex flex-col gap-2">
					<span>Are you sure you want to delete this user?</span>
					<div className="flex justify-end gap-2 mt-1">
						<button
							className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
							onClick={() => toast.dismiss(t.id)}>
							Cancel
						</button>
						<button
							className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
							onClick={async () => {
								try {
									await deleteUser(id);
									setUsers((prev) => prev.filter((user) => user.userId !== id));
									toast.success("User deleted");
								} catch (error) {
									console.error(error);
									toast.error("Unable to delete the user");
								} finally {
									toast.dismiss(t.id);
								}
							}}>
							Delete
						</button>
					</div>
				</div>
			),
			{ duration: Infinity }
		);
	};

	return (
		<div className="flex flex-col h-full">
			{/* === Search Bar (Fixed at top) === */}
			<div className="sticky top-0 z-10 bg-[#1e2426] pb-2">
				<div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
					<input
						onChange={(e) => setSearchItem(e.target.value)}
						value={searchItem}
						type="text"
						placeholder="Search by keyword"
						className="flex-1 px-3 py-2 text-gray-800 focus:outline-none"
					/>
					<span className="bg-yellow-400 px-3 flex items-center justify-center cursor-pointer">
						<MagnifyingGlassIcon className="h-6 w-6 text-gray-800" />
					</span>
				</div>
			</div>

			<div className="overflow-y-auto flex-1 pr-1">
				<div className="flex flex-col gap-4 pb-4 mt-2">
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user, index) => (
							<div
								key={index}
								className="flex items-center justify-between bg-gray-800/60 border border-gray-600 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300">
								<div className="flex items-center gap-2">
									<Users className="text-blue-400" size={20} />
									<div>
										<h5 className="text-lg font-semibold text-white">
											{user.name}
										</h5>
										<p className="text-sm text-gray-300">{user.email}</p>
									</div>
								</div>
								<button
									onClick={() => deleteByUserId(user.userId)}
									className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition-colors duration-300"
									title="Delete">
									<TrashIcon className="h-5 w-5 text-white" />
								</button>
							</div>
						))
					) : (
						<p className="mt-2 text-gray-400 text-center">No users found</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserList;
