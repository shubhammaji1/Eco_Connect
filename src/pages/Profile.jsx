import React, { useState, useRef } from 'react';
import { FaUser, FaEdit, FaCog, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaCalendarAlt, FaLink, FaMoon, FaBell, FaLock, FaSave } from 'react-icons/fa';
import '../../public/css/profile.css';
import Login from "../pages/Login";

const Profile = ({onLogout}) => {
  const [user, setUser] = useState({
    name: 'Shubham',
    username: 'SM',
    email: 'abc@example.com',
    bio: 'Passionate Web Developer | Travel enthusiast | Coffee lover',
    avatar: 'https://avatar.iran.liara.run/public/6',
    location: 'Asansol, India',
    joinDate: 'September 2024',
    website: 'https://abc.com'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    privateProfile: false
  });
  const [tempSettings, setTempSettings] = useState({...settings});
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically send the updated user data to your server
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({
          ...prevUser,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
    setTempSettings({...settings});
  };

  const handleSettingChange = (setting) => {
    setTempSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  const handleSaveSettings = () => {
    setSettings({...tempSettings});
    setShowSettings(false);
    // Here you would typically send the updated settings to your server
    alert('Settings saved successfully!');
  };

  if (isLoggedOut) {
    return <Login />;
  }

  return (
    <div className={`profile-container ${settings.darkMode ? 'dark-mode' : ''}`}>
      <div className="profile-header">
        <div className="avatar-container">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          {isEditing && (
            <div className="avatar-overlay" onClick={handleAvatarClick}>
              <FaCamera className="camera-icon" />
              <span>Change Avatar</span>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <h1>{user.name}</h1>
        <p className="username">@{user.username}</p>
        <p className="bio">{user.bio}</p>
        <div className="user-details">
          <span><FaMapMarkerAlt /> {user.location}</span>
          <span><FaCalendarAlt /> Joined {user.joinDate}</span>
          <span><FaLink /> <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></span>
        </div>
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSave} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={user.bio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={user.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website:</label>
            <input
              type="url"
              id="website"
              name="website"
              value={user.website}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      ) : (
        <div className="profile-info">
          <button onClick={handleEdit} className="edit-button">
            <FaEdit /> Edit Profile
          </button>
        </div>
      )}
      
      <div className="profile-actions">
        <button className="action-button" onClick={handleSettings}>
          <FaCog /> Settings
        </button>
        <button className="action-button logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <h2>Settings</h2>
          <div className="settings-option">
            <label>
              <input 
                type="checkbox" 
                checked={tempSettings.darkMode}
                onChange={() => handleSettingChange('darkMode')}
              />
              <FaMoon /> Enable dark mode
            </label>
          </div>
          <div className="settings-option">
            <label>
              <input 
                type="checkbox" 
                checked={tempSettings.emailNotifications}
                onChange={() => handleSettingChange('emailNotifications')}
              />
              <FaBell /> Receive notifications
            </label>
          </div>
          <div className="settings-option">
            <label>
              <input 
                type="checkbox" 
                checked={tempSettings.privateProfile}
                onChange={() => handleSettingChange('privateProfile')}
              />
              <FaLock /> Make profile private
            </label>
          </div>
          <button onClick={handleSaveSettings} className="save-settings-button">
            <FaSave /> Save Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;