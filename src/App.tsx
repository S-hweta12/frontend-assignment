import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';
import ImagesGrid from './components/ImagesComponent/ImagesGrid';

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <ImagesGrid />
      </div>
    </DndProvider>
  );
};

export default App;
