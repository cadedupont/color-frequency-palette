// ImageUpload.js
import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      setErrorMessage('Please select an image to upload');
    } else {
      setSelectedImage(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  return (
    <div>
      <label htmlFor="file-upload" className="custom-upload-button">
        Upload Image
      </label>
      <input
        id="file-upload"
        style={{display: 'none'}}
        type="file"
        onChange={handleImageChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Uploaded Image"
            className="uploaded-image"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
