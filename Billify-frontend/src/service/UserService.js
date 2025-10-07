import axios from "axios";
//adduser
export const addUser = async (user) => {
	return await axios.post(
		"http://localhost:8080/api/v1.0/admin/register",
		user,
		{
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
};
//delete user
export const deleteUser = async (id) => {
	return await axios.delete(
		`http://localhost:8080/api/v1.0/admin/users/${id}`,

		{
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
};

//getuser
export const fetchUser = async () => {
	return await axios.get(
		"http://localhost:8080/api/v1.0/admin/users",

		{
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
};
