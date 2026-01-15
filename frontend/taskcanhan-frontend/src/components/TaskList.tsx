import React from 'react';
import type { TaskDto } from '../types/task';

interface TaskListProps {
  tasks: TaskDto[];
  onEdit: (task: TaskDto) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isCompleted: boolean) => void;
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
  margin: '24px 0',
  overflow: 'hidden',
  tableLayout: 'fixed',
};
const thStyle: React.CSSProperties = {
  background: '#f1f5f9',
  padding: '12px 8px',
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 16,
  borderBottom: '2px solid #e0e0e0',
  whiteSpace: 'nowrap',
};
const tdStyle: React.CSSProperties = {
  padding: '10px 8px',
  borderBottom: '1px solid #f0f0f0',
  fontSize: 15,
  textAlign: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
const statusStyle = (done: boolean): React.CSSProperties => ({
  color: done ? 'green' : 'red',
  fontWeight: 'bold',
});
const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: '5px',
  border: 'none',
  background: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  marginRight: '4px',
  fontWeight: 600,
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggleStatus }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={tableStyle}>
      <colgroup>
        <col style={{width: '4%'}} />
        <col style={{width: '16%'}} />
        <col style={{width: '20%'}} />
        <col style={{width: '8%'}} />
        <col style={{width: '15%'}} />
        <col style={{width: '10%'}} />
        <col style={{width: '16%'}} />
        <col style={{width: '6%'}} />
      </colgroup>
      <thead>
        <tr>
          <th style={thStyle}>ID</th>
          <th style={{ ...thStyle, textAlign: 'left' }}>Task Name</th>
          <th style={{ ...thStyle, textAlign: 'left' }}>Description</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Created At</th>
          <th style={thStyle}>Due Date</th>
          <th style={thStyle}>Actions</th>
          <th style={thStyle}>Done</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td style={tdStyle}>{task.id}</td>
            <td style={{ ...tdStyle, textAlign: 'left' }}><b>{task.title}</b></td>
            <td style={{ ...tdStyle, textAlign: 'left' }}>{task.description}</td>
            <td style={{ ...tdStyle, ...statusStyle(task.isCompleted) }}>{task.isCompleted ? 'Done' : 'Pending'}</td>
            <td style={tdStyle}>{task.createdAt ? new Date(task.createdAt).toLocaleString() : ''}</td>
            <td style={tdStyle}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
            <td style={tdStyle}>
              <button style={{...buttonStyle, background: '#6366f1'}} onClick={() => onEdit(task)}>Edit</button>
              <button style={{...buttonStyle, background: '#ef4444'}} onClick={() => onDelete(task.id)}>Delete</button>
              <button style={{...buttonStyle, background: '#22c55e'}} onClick={() => onToggleStatus(task.id, !task.isCompleted)}>
                Mark as {task.isCompleted ? 'Pending' : 'Done'}
              </button>
            </td>
            <td style={tdStyle}>
              <input type="checkbox" checked={task.isCompleted} onChange={() => onToggleStatus(task.id, !task.isCompleted)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TaskList;
