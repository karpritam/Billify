import axios from "axios";

//post
export const addItem = async (item) => {
	return await axios.post(`http://localhost:8080/api/v1.0/admin/items`, item, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
};

//delete
export const deleteItem = async (itemId) => {
	return await axios.delete(
		`http://localhost:8080/api/v1.0/admin/items/${itemId}`,
		{
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
};

//get
export const fetchItems = async () => {
	return await axios.get("http://localhost:8080/api/v1.0/items", {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
};
