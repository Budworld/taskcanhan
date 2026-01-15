import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import type { TaskDto } from './types/task';

const TaskTest: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    try {
      const newTask = await createTask({ title: 'Test', description: 'Test desc' });
      setTasks([...tasks, newTask]);
    } catch {
      setError('Failed to create task');
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await updateTask(id, { title: 'Updated', description: 'Updated desc', isCompleted: true });
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

  return (
    <div>
      <h2>Backend Task API Test</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <button onClick={handleCreate}>Create Test Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description} - {task.isCompleted ? 'Done' : 'Pending'}
            <button onClick={() => handleUpdate(task.id)}>Update</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTest;
