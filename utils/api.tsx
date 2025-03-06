import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

export const getTasks = async () => axios.get(API_URL);
export const createTask = async (data: any) => axios.post(API_URL, data);
export const updateTask = async (id: number, data: any) => axios.put(`${API_URL}/${id}`, data);
export const deleteTask = async (id: number) => axios.delete(`${API_URL}/${id}`);
