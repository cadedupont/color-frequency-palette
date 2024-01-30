import React from 'react';
import './styles/App.css';
import ImageUpload from './ImageUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Frequency Palette</h1>
      </header>
      <main>
        <ImageUpload />
      </main>
    </div>
  );
}

export default App;
