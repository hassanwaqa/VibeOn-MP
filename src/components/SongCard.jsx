import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { Network, Urls } from "../apiConfiguration";


const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const putRecentlyPlayed = async (values) => {
    console.log(values)
		// setLoading(true)
		const response = await Network.put(Urls.addRecentlyPlayed, values);
		// setLoading(false)
		console.log("Response ------> ",response);
		console.log("Done")

		if (!response.ok) return showErrorMessage(response.data.error);
		else {
			return showSuccessMessage(response.data.message)
		}
  };

  const handlePlayClick = () => {

    const req = {
      email: localStorage.getItem('user'),
      song: song
    }
  putRecentlyPlayed(req)
  .then(req => console.log(req)).catch(error => console.error('Error:', error));

    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} className="w-full h-full rounded-lg" />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-black truncate">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p>
        <p className="text-sm truncate text-black-300 mt-1">
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
