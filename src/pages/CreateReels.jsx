import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaVideo, FaImage, FaMusic, FaUpload } from 'react-icons/fa';
import "../../public/css/create-reel.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = "http://localhost:5000"; // Change to your backend URL

const CreateReelSection = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // Multiple files
  const [preview, setPreview] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [caption, setCaption] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);
  const fileInputRef = useRef(null);
  const musicInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      setFileType(files[0].type.split('/')[0]); // Check first file type
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreview(previews);
    }
  };

  const handleMusicSelect = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedMusic(file);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one file to upload');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('files', file));
    formData.append('caption', caption);
    if (selectedMusic) formData.append('music', selectedMusic.name);

    try {
      await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form
      setSelectedFiles([]);
      setPreview([]);
      setFileType(null);
      setCaption('');
      setSelectedMusic(null);
      toast.success('Reels uploaded successfully!');
    } catch (error) {
      console.error('Error uploading reels:', error);
      toast.error('Failed to upload reels');
    }
  };

  return (
    <div className="create-reel-section">
      <h2>Create a New Reel</h2>
      <div className="reel-preview">
        {preview.length > 0 ? (
          preview.map((src, index) => (
            fileType === 'image' ? (
              <img key={index} src={src} alt="Preview" className="preview-image" />
            ) : (
              <video key={index} className="preview-video" controls>
                <source src={src} type={selectedFiles[index]?.type} />
                Your browser does not support the video tag.
              </video>
            )
          ))
        ) : (
          <div className="placeholder">
            <FaVideo />
            <p>Select a video or multiple images for your reel</p>
          </div>
        )}
      </div>
      <div className="reel-actions">
        <button onClick={() => fileInputRef.current.click()} className="action-button">
          <FaImage />
          <span>Choose Files</span>
        </button>
        <button onClick={() => musicInputRef.current.click()} className="action-button">
          <FaMusic />
          <span>{selectedMusic ? 'Change Music' : 'Add Music'}</span>
        </button>
        <input type="file" ref={fileInputRef} multiple onChange={handleFileSelect} accept="video/*,image/*" style={{ display: 'none' }} />
        <input type="file" ref={musicInputRef} onChange={handleMusicSelect} accept="audio/*" style={{ display: 'none' }} />
      </div>
      <textarea className="reel-caption" placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
      <button onClick={handleUpload} className="upload-button">
        <FaUpload />
        <span>Upload Reel</span>
      </button>
      <ToastContainer />
    </div>
  );
};

export default CreateReelSection;
