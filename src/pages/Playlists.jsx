import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Network, Urls } from "../apiConfiguration";

export default function Playlists() {
    const { data, isFetching, error } = useGetTopChartsQuery();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    if (isFetching) return <Loader title="Loading Top Charts" />;
  
    if (error) return <Error />;

    const [playlists, setPlaylists] = useState([])

    const getPlaylists = async() => {
        console.log("Hello")
        const user = localStorage.getItem("user")
        const data = {activeSong, user}
        const response = await Network.post(Urls.getPlaylists, data);
        console.log(response.data)
        const playlists = response.data.playlists;
        setPlaylists(playlists)

    }

    const handleCreatePlaylist = async () => {
        try {
            const user = localStorage.getItem("user")
            const data = {
                user,
                playlistName : newPlaylistName,
            };
            await Network.post(Urls.createPlaylist, data);
            // Optionally, you can fetch playlists again to update the UI
            // await getPlaylists();
            setNewPlaylistName(''); // Clear the input field after creating the playlist
        } catch (error) {
            console.error('Error creating playlist:', error);
            // Handle error, e.g., show a toast message
        }
    };

    useEffect(() => {
        getPlaylists();
    }, [])

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-black text-left mt-4 mb-10">Playlists</h2>
            
            <div className="flex items-center mb-4">
                <input 
                    type="text" 
                    placeholder="Enter playlist name" 
                    value={newPlaylistName} 
                    onChange={(e) => setNewPlaylistName(e.target.value)} 
                    className="px-3 py-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={handleCreatePlaylist} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Playlist
                </button>
            </div>
            
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {playlists.map((playlist, index) => (
            <div key={index}>
                <h2 class="text-black font-bold text-2xl">{playlist.name}</h2>
                {playlist.songs.map((song, i) => (
                <SongCard
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                />
                ))}
            </div>
))}

            </div>
        </div>
    );
}
