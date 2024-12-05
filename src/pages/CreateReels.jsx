import React, { useState, useRef } from 'react';
import { FaVideo, FaImage, FaMusic, FaUpload } from 'react-icons/fa';
import "../../public/css/create-reel.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateReelSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [caption, setCaption] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);
  const fileInputRef = useRef(null);
  const musicInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileType(file.type.split('/')[0]); // 'image' or 'video'
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedMusic(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically send the file to your server
      console.log('Uploading file:', selectedFile);
      console.log('File type:', fileType);
      console.log('Caption:', caption);
      if (selectedMusic) {
        console.log('Music file:', selectedMusic);
      }
      // Reset the form after upload
      setSelectedFile(null);
      setPreview(null);
      setFileType(null);
      setCaption('');
      setSelectedMusic(null);
    } else {
      toast.error('Please select a file to upload');

    }
  };

  const renderPreview = () => {
    if (preview) {
      if (fileType === 'image') {
        return <img src={preview} alt="Preview" className="preview-image" />;
      } else if (fileType === 'video') {
        return (
          <video className="preview-video" controls>
            <source src={preview} type={selectedFile.type} />
            Your browser does not support the video tag.
          </video>
        );
      }
    }
    return (
      <div className="placeholder">
        <FaVideo />
        <p>Select a video or image for your reel</p>
      </div>
    );
  };

  return (
    <div className="create-reel-section">
      <h2>Create a New Reel</h2>
      <div className="reel-preview">
        {renderPreview()}
      </div>
      <div className="reel-actions">
        <button onClick={() => fileInputRef.current.click()} className="action-button">
          <FaImage />
          <span>Choose File</span>
        </button>
        <button onClick={() => musicInputRef.current.click()} className="action-button">
          <FaMusic />
          <span>{selectedMusic ? 'Change Music' : 'Add Music'}</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*,image/*"
          style={{ display: 'none' }}
        />
        <input
          type="file"
          ref={musicInputRef}
          onChange={handleMusicSelect}
          accept="audio/*"
          style={{ display: 'none' }}
        />
      </div>
      {selectedMusic && (
        <div className="selected-music">
          <FaMusic />
          <span>{selectedMusic.name}</span>
        </div>
      )}
      <textarea
        className="reel-caption"
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button onClick={handleUpload} className="upload-button">
        <FaUpload />
        <span>Upload Reel</span>
        <ToastContainer />
      </button>
    </div>
  );
};

export default CreateReelSection;