import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import InventoryIcon from "@mui/icons-material/Inventory";
import SellIcon from "@mui/icons-material/Sell";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import "./App.css";
import Video from './components/video/video';
import Chatbot from "./components/ChatBot/chatbot";
import FeedSection from "./pages/Feed";
import CreateReelSection from "./pages/CreateReels";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { EProducts } from "./pages/E-Products";
import {EcoNestDecor} from "./pages/EcoNestDecor";
import { EcoEssence } from "./pages/EcoEssence";
import { ECycleHub } from "./pages/ECycleHub";
import { PitchHub } from "./pages/PitchHub";
import { VendorVault } from "./pages/VendorVault";




const BuyOption = ({ isFolded, handleItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    

    if (isFolded) return null;

    return (
        <li>
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
                <InventoryIcon />
                <span>Buy</span>
                <ArrowDropDownIcon />
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li><a href="#e-products" onClick={() => handleItemClick('e-products')}>E-Products</a></li>
                    <li><a href="#econest-decor" onClick={() => handleItemClick('econest-decor')}>EcoNest Decor</a></li>
                    <li><a href="#e-cycle-hub" onClick={() => handleItemClick('e-cycle-hub')}>E-Cycle Hub</a></li>
                    <li><a href="#ecoessence" onClick={() => handleItemClick('ecoessence')}>EcoEssence</a></li>
                    </ul>
            )}
        </li>
    );
};

const SellOption = ({ isFolded, handleItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFactsOpen, setIsFactsOpen] = useState(false);

    if (isFolded) return null;

    return (
        <li>
            <div onClick={() => setIsOpen(!isOpen)} className="dropdown-toggle">
                <SellIcon />
                <span>Sell</span>
                <ArrowDropDownIcon />
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    <li>
                        <div onClick={() => setIsFactsOpen(!isFactsOpen)} className="dropdown-toggle">
                            <span>Facts</span>
                            <ArrowDropDownIcon />
                        </div>
                        {isFactsOpen && (
                            <ul className="dropdown-submenu">
                                <li><a href="#pitchhub" onClick={() => handleItemClick('pitchhub')}>PitchHub</a></li>
                                <li><a href="#vendorvault" onClick={() => handleItemClick('vendorvault')}>VendorVault</a></li>
                            </ul>
                        )}
                    </li>

                </ul>
            )}
        </li>
    );
};

export const SidebarData = [
    { title: 'Home', icon: <HomeIcon />, path: "#home"},
    { title: 'Feeds', icon: <FeedIcon />, path: "#reel" },
    { title: 'Create', icon: <AddBoxIcon />, path: "#create" },
];

const Sidebar = ({ setActiveSection, isFolded, setIsFolded }) => {
    const handleItemClick = (title) => {
        setActiveSection(title.toLowerCase());
    };

    return (
        <div className={`sidebar ${isFolded ? 'folded' : ''}`}>
            <div className="sidebar-header">
                <button className="toggle-sidebar" onClick={() => setIsFolded(!isFolded)}>
                    <MenuIcon />
                </button>
                {!isFolded && (
                    <div className="sidebar-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                            <path fill="#F06225" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 19 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path>
                            <path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
                        </svg>
                    </div>
                )}
            </div>
            <ul className="sidebar-menu">
                {SidebarData.map((item, index) => (
                    <li key={index}>
                        <a href={item.path} onClick={() => handleItemClick(item.title)} title={isFolded ? item.title : ''}>
                            {item.icon}
                            {!isFolded && <span>{item.title}</span>}
                        </a>
                    </li>
                ))}
                {!isFolded && (
                    <>
                        <BuyOption isFolded={isFolded} handleItemClick={handleItemClick} />
                        <SellOption isFolded={isFolded} handleItemClick={handleItemClick} />
                    </>
                )}
                <li>
                    <a href="#profile" onClick={() => handleItemClick('Profile')} title={isFolded ? 'Profile' : ''}>
                        <AccountCircleIcon />
                        {!isFolded && <span>Profile</span>}
                    </a>
                </li>
            </ul>
        </div>
    );
};

const App = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isSidebarFolded, setIsSidebarFolded] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setActiveSection('login');
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'feeds':
                return <FeedSection />;
            case 'create':
                return <CreateReelSection />;
            case 'profile':
                return <Profile onLogout={handleLogout} />;
            case 'login':
                return <Login onLogin={() => setIsLoggedIn(true)} />;
            case 'e-products':
                return <EProducts />;
            case 'econest-decor':
                return <EcoNestDecor />;
            case 'e-cycle-hub':
                return <ECycleHub />;
            case 'ecoessence':
                return <EcoEssence />;
            case 'pitchhub':
                return <PitchHub />;
            case 'vendorvault':
                return <VendorVault />;
            default:
                return (
                    <div className='video-content'>
                        <div className='video'>
                            <Video /> 
                            <Video /> 
                            <Video />
                        </div>
                        <div className="video">
                            <Video /> 
                            <Video /> 
                            <Video />
                        </div>
                        <div className="video">
                            <Video /> 
                            <Video /> 
                            <Video />
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="app">
            {isLoggedIn && (
                <Sidebar 
                    setActiveSection={setActiveSection} 
                    isFolded={isSidebarFolded} 
                    setIsFolded={setIsSidebarFolded}
                />
            )}
            <div className={`main-content ${!isLoggedIn ? 'full-width' : ''} ${isSidebarFolded ? 'sidebar-folded' : ''}`}>
                {renderContent()}
                {isLoggedIn && <Chatbot />}
            </div>
        </div>
    );
};

export default App;