import React, { useState } from 'react';
import {
  FaFlask,
  FaGraduationCap,
  FaPalette,
  FaRunning,
  FaGamepad,
  FaHeartbeat
} from 'react-icons/fa';
import CustomSelect from './components/custom'
import { Category } from './types/types.d';
import './App.scss';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const categories: Category[] = [
    { id: '1', name: 'Science', icon: FaFlask },
    { id: '2', name: 'Education', icon: FaGraduationCap, hasComments: true },
    { id: '3', name: 'Art', icon: FaPalette, hasComments: true },
    { id: '4', name: 'Sport', icon: FaRunning, hasComments: true },
    { id: '5', name: 'Games', icon: FaGamepad, hasComments: true },
    { id: '6', name: 'Health', icon: FaHeartbeat, hasComments: true },
  ];

  return (
    <div className="app-container">
      <div className="app-content">
        <h1>Select Your Category</h1>
        <CustomSelect
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Choose a category..."
          width="400px"
        />
      </div>
    </div>
  );
};

export default App;