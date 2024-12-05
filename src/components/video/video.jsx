import React, { useEffect } from 'react';
import "./video.css";
import { useRef, useState } from 'react';   
import Vid1 from "../../components/videos/vd1.mp4"

const Video = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const vidRef = useRef();

    const onVideoPress = () => {
        if(isPlaying) {
            vidRef.current.pause();
            setIsPlaying(false);
        } else {
            vidRef.current.play();
            setIsPlaying(true);
        }
    }
    useEffect(() => {
        onVideoPress();
    }, [])

    return <div onClick={onVideoPress} className='video-cards'>
            <video controls autoPlay={false} className='video-player' ref={vidRef} src={Vid1} loop />
    </div>
       
            

}

export default Video;
