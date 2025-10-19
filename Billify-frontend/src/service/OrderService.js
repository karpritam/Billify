import axios from "axios";

export const latestOrders = async () => {
	return await axios.get("localhost:8080/api/v1.0/latest", {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
};

export const createOrder = async () => {
	return await axios.get("localhost:8080/api/v1.0/orders", {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
};

export const deleteOrder = async () => {
	return await axios.get(`localhost:8080/api/v1.0/orders/${id}`, {
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	});
};
