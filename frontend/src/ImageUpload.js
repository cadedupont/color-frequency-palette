// ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Check that file is an image before uploading
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      setSelectedImage(null);
      setErrorMessage('Please select an image to upload');
      return;
    }

    // Display input image to screen and prepare it for upload
    setSelectedImage(URL.createObjectURL(file));
    setErrorMessage(null);
    const formData = new FormData();
    formData.append('image', file);

    // Upload image to server
    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
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
