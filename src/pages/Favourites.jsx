import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Network, Urls } from "../apiConfiguration";

const Favourites = () => {
//   const { data, isFetching, error } = useGetTopChartsQuery();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

//   if (isFetching) return <Loader title="Loading Favourites" />;

//   if (error) return <Error />;


const [likedSongs, setLikedSongs] = useState([]);

const user = localStorage.getItem("user");

useEffect(() => {
  const isLikedSong = async () => {
    try {
      const user = localStorage.getItem("user");
      console.log(user)
      const data = { user }
      const response = await Network.post(Urls.getLikedSong, data);
      const likedSongs = response.data.liked_songs;
      setLikedSongs(likedSongs);
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };

  isLikedSong(); // Call the function inside useEffect

}, []);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-black text-left mt-4 mb-10">Liked Songs</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8"> 
        {likedSongs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={likedSongs}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
