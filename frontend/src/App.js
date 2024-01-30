import React, { useState } from 'react';
import './styles/App.css';
import ImageUpload from './ImageUpload';
import OutputImage from './OutputImage';

function App() {
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Frequency Palette</h1>
      </header>
      <main>
        <table>
          <tbody>
            <tr>
              <td>
                <ImageUpload onUploadSuccess={setIsUploadSuccessful} />
              </td>
              <td>
                {isUploadSuccessful && <OutputImage />}
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;