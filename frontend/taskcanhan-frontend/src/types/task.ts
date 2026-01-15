export interface TaskDto {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  dueDate?: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskDto {
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
}
