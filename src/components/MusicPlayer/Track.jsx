import React, { useState } from 'react';
import { BsPlusCircleFill, BsPlusCircle } from 'react-icons/bs';

const Track = ({ isPlaying, isActive, activeSong }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="flex-1 flex items-center justify-start">
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
        <img src={activeSong?.images?.coverart} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.title ? activeSong?.title : 'No active Song'}
        </p>
        <p className="truncate text-gray-300">
          {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
        </p>
      </div>
      <div>
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
            <BsPlusCircleFill style={{ fontSize: '1.5em', color: '#90e0ef' }} />
          ) : (
            <BsPlusCircle style={{ fontSize: '1.5em', color: 'white' }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Track;
