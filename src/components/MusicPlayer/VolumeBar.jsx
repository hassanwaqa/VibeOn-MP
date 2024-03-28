import React, { useState } from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { FaRegHeart, FaHeart } from "react-icons/fa";

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
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
            <FaHeart style={{ fontSize: '1.5em', color: '#90e0ef' }} />
          ) : (
            <FaRegHeart style={{ fontSize: '1.5em', color: 'white' }} />
          )}
        </button>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-end">
        {value <= 1 && value > 0.5 && <BsFillVolumeUpFill size={25} color="#FFF" onClick={() => setVolume(0)} />}
        {value <= 0.5 && value > 0 && <BsVolumeDownFill size={25} color="#FFF" onClick={() => setVolume(0)} />}
        {value === 0 && <BsFillVolumeMuteFill size={25} color="#FFF" onClick={() => setVolume(1)} />}
        <input
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
        />
      </div>
    </>
  );
};

export default VolumeBar;
