import axios from "axios";
//PostMapping
export const addCategory = async (category) => {
	return await axios.post(
		"http://localhost:8080/api/v1.0/admin/categories",
		category
	);
};
//DeleteMapping
export const deleteCategory = async (categoryId) => {
	return await axios.delete(
		`http://localhost:8080/api/v1.0/admin/categories/${categoryId}`
	);
};
//GetMapping
export const fetchCategory = async () => {
	return await axios.get("http://localhost:8080/api/v1.0/categories");
};
