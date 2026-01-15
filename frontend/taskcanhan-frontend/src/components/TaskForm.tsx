import React, { useState, useEffect } from 'react';
import type { CreateTaskDto, UpdateTaskDto, TaskDto } from '../types/task';

interface TaskFormProps {
  onCreate?: (data: CreateTaskDto) => void;
  onUpdate?: (data: UpdateTaskDto) => void;
  initial?: TaskDto | null;
  isEdit?: boolean;
  onCancel?: () => void;
}

const formContainer: React.CSSProperties = {
  maxWidth: 480,
  margin: '32px auto',
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};
const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
};
const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  marginBottom: 4,
};
const buttonRow: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  marginTop: 12,
};
const submitBtn: React.CSSProperties = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  padding: '10px 20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: 16,
};
const cancelBtn: React.CSSProperties = {
  ...submitBtn,
  background: '#6c757d',
};

const TaskForm: React.FC<TaskFormProps> = ({ onCreate, onUpdate, initial, isEdit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description || '');
      setDueDate(initial.dueDate ? initial.dueDate.substring(0, 10) : '');
      setIsCompleted(initial.isCompleted);
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && onUpdate) {
      onUpdate({ title, description, isCompleted, dueDate: dueDate || undefined });
    } else if (onCreate) {
      onCreate({ title, description, dueDate: dueDate || undefined });
    }
  };

  return (
    <form style={formContainer} onSubmit={handleSubmit}>
      <label style={labelStyle}>Title</label>
      <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <label style={labelStyle}>Description</label>
      <input style={inputStyle} value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <label style={labelStyle}>Due Date</label>
      <input style={inputStyle} type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      {isEdit && (
        <label style={labelStyle}>
          <input type="checkbox" checked={isCompleted} onChange={e => setIsCompleted(e.target.checked)} />
          {' '}Completed
        </label>
      )}
      <div style={buttonRow}>
        <button type="submit" style={submitBtn}>{isEdit ? 'Update' : 'Create'}</button>
        {onCancel && <button type="button" style={cancelBtn} onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default TaskForm;
