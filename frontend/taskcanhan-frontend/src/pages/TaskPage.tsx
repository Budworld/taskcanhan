import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../api/taskApi';
import type { TaskDto, CreateTaskDto, UpdateTaskDto } from '../types/task';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [editing, setEditing] = useState<TaskDto | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setTasks(await getTasks());
    } catch {
      setError('Failed to fetch tasks');
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (data: CreateTaskDto) => {
    try {
      await createTask(data);
      setShowForm(false);
      fetchTasks();
    } catch {
      setError('Failed to create task');
    }
  };

  const handleEdit = (task: TaskDto) => {
    setEditing(task);
    setShowForm(true);
  };

  const handleUpdate = async (data: UpdateTaskDto) => {
    if (!editing) return;
    try {
      await updateTask(editing.id, data);
      setEditing(null);
      setShowForm(false);
      fetchTasks();
    } catch {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch {
      setError('Failed to delete task');
    }
  };

  const handleToggleStatus = async (id: number, isCompleted: boolean) => {
    try {
      await updateTaskStatus(id, isCompleted);
      fetchTasks();
    } catch {
      setError('Failed to update status');
    }
  };

  return (
    <div>
      <h2>Task Manager (API Test)</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={() => { setShowForm(true); setEditing(null); }}>Add Task</button>
      {showForm && (
        <TaskForm
          onCreate={!editing ? handleCreate : undefined}
          onUpdate={editing ? handleUpdate : undefined}
          initial={editing}
          isEdit={!!editing}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default TaskPage;
