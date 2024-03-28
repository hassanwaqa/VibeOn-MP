import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import Login from "./pages/Login"
import Register from './pages/Register';
import Layout from './pages/Layout';
import { useDispatch } from 'react-redux';
import { setAuthenticatinStatus } from './redux/features/playerSlice';
 
const App = () => {
  
  const dispatch = useDispatch();
  
  const { userAuthenticate } = useSelector((state) => state.player);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    if (userAuthenticate) setIsAuthenticated(true);
  }, [userAuthenticate]);


  const handleLogout = () => {
    dispatch(setAuthenticatinStatus(false));
  };


  return (
    <div >
            <Routes>
              {/* public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* protected routes */}
              <Route path="/" element={ isAuthenticated? <Layout component={Discover} /> : <Navigate to={'/login'} replace /> } />
              <Route path="/top-artists" element={isAuthenticated? <Layout component={TopArtists} /> : <Navigate to={'/login'} replace />} />
              <Route path="/top-charts" element={isAuthenticated? <Layout component={TopCharts} /> : <Navigate to={'/login'} replace />} />
              <Route path="/around-you" element={isAuthenticated? <Layout component={AroundYou} /> : <Navigate to={'/login'} replace />} />
              <Route path="/artists/:id" element={isAuthenticated? <Layout component={ArtistDetails} /> : <Navigate to={'/login'} replace />} />
              <Route path="/songs/:songid" element={isAuthenticated? <Layout component={SongDetails} /> : <Navigate to={'/login'} replace />} />
              <Route path="/search/:searchTerm" element={isAuthenticated? <Layout component={Search} /> : <Navigate to={'/login'} replace />} />
              <Route path="/logout" render={() => {
                handleLogout();
                return <Navigate to={'/login'} replace />;
              }} element={<Navigate to={'/login'} replace />} />
              

              {/* error routes */}
              <Route path="*" element={<div>404 - Not Found</div>} />


            </Routes>
        
    </div>
  );
};

export default App;
