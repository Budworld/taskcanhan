import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TaskPage from './pages/TaskPage';

const appStyle: React.CSSProperties = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #f8fafc 100%)',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'auto',
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={appStyle}>
      <TaskPage />
    </div>
  );
}

export default App;
