import React, { useEffect, useState } from 'react';

const OutputImage = (props) => {
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/palette')
      .then(response => {
        console.log('Response received');
        return response.blob();
      })
      .then(data => {
        console.log('Data received:', data);
        const imageURL = URL.createObjectURL(data);
        setGeneratedImage(imageURL);
      })
      .catch(error => console.error('Error:', error));
    }, []);

return (
  <div>
    <h2>Output Image</h2>
    {generatedImage && (
      <img
        src={generatedImage}
        alt="Output Image"
        className="uploaded-image"
      />
    )}
  </div>
);
};

export default OutputImage;