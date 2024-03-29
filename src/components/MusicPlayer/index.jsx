import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Network, Urls } from "../../apiConfiguration";

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  const handleClick = async() => {
    const user = localStorage.getItem("user")
    console.log(user)
    const data = {activeSong, user}
    if (clicked == false) {
      const response = await Network.post(Urls.addLikedSong, data);
      if (!response.ok) { 
        console.log(response.data.message)
      }else{
        setClicked(true); 
      }
    } else {
      const response = await Network.post(Urls.removeLikedSong, data);
      if (!response.ok) { 
        console.log(response.data.message)
      }else{
        setClicked(false); 
      }
    }
  }

  const isLikedSong = async () => {
    try {
      console.log("Hello")
      const user = localStorage.getItem("user")
      const data = {activeSong, user}
      const response = await Network.post(Urls.getLikedSong, data);
      const likedSongs = response.data.liked_songs;
      
      // Check if there exists a liked song with a key equal to activeSong's key
      const isSongLiked = likedSongs.some(song => song.key === activeSong.key);
  
      // If a liked song with activeSong's key exists, setClicked(true)
      if (isSongLiked) {
        setClicked(true);
      }
    } catch (error) {
      console.error('Error fetching liked songs:', error);
      // Handle the error as needed
    }
  };
  

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  useEffect(() => {
    setClicked(false)
    isLikedSong();
  }, [activeSong]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  return (
    <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          isPlaying={isPlaying}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          handlePlayPause={handlePlayPause}
          handlePrevSong={handlePrevSong}
          handleNextSong={handleNextSong}
        />
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />
        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
      <button 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'transparent', 
            border: 'none' 
          }} 
          onClick={handleClick}
        >
          {clicked ? (
            <FaHeart style={{ fontSize: '1.5em', color: '#90e0ef' }} />
          ) : (
            <FaRegHeart style={{ fontSize: '1.5em', color: 'white' }} />
          )}
      </button>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
};

export default MusicPlayer;
