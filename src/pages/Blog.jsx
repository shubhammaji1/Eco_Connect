import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import InventoryIcon from "@mui/icons-material/Inventory";
import SellIcon from "@mui/icons-material/Sell";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import "../App.css";
import Video from '../components/video/video';
import Bot from "../components/ChatBot/Bot";
import FeedSection from "./Feed";
import CreateReelSection from "./CreateReels";
import Profile from "./Profile";
import Login from "./Login";
import { EProducts } from "./E-Products";
import {EcoNestDecor} from "./EcoNestDecor";
import { EcoEssence } from "./EcoEssence";
import { ECycleHub } from "./ECycleHub";
import { PitchHub } from "./PitchHub";
import { VendorVault } from "./VendorVault";
import logo from '../assets/logo.png';



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
    { title: 'Home', icon: <HomeIcon />, path: "/"},
    { title: 'Reel', icon: <VideoLibraryIcon />, path: "#reel"},
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
                       <img src={logo} alt="Logo" className="logo" ></img>
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

const Blog = () => {
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
                {isLoggedIn && <Bot/>}
                <div className="AIchatbot">
                    <img src="images\roboticon.gif" alt="Chatbot"/>
                </div>
            </div>
        </div>
    );
};

export default Blog;