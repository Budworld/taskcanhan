import axios from 'axios';
import type { TaskDto, CreateTaskDto, UpdateTaskDto } from '../types/task';

const API_URL = 'http://localhost:5156/api/tasks';

export const getTasks = async (status?: string): Promise<TaskDto[]> => {
  const res = await axios.get(API_URL, { params: status ? { status } : {} });
  return res.data;
};

export const getTaskById = async (id: number): Promise<TaskDto> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createTask = async (data: CreateTaskDto): Promise<TaskDto> => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateTask = async (id: number, data: UpdateTaskDto): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, data);
};

export const updateTaskStatus = async (id: number, isCompleted: boolean): Promise<void> => {
  await axios.patch(`${API_URL}/${id}/status`, null, { params: { isCompleted } });
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
