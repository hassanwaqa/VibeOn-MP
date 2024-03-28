import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import Login from "./pages/Login"
import Register from './pages/Register';
import Layout from './pages/Layout';
 
const App = () => {
  // const { activeSong } = useSelector((state) => state.player);
  // const location = useLocation();
  // const isLoginPage = location.pathname === '/login';
  // const isRegisterPage = location.pathname === '/register';
  // const shouldRenderSidebar = !(isLoginPage || isRegisterPage);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // localStorage.setItem('isAuthenticate', 'false'); 
    const value = localStorage.getItem('isAuthenticate');
    console.log("value -----> ", value);
    // setIsAuthenticated(false);
    if (value == "true") setIsAuthenticated(true);
  }, []);



  // var isAuthenticated = false;


  


  return (
    <div >
      {/* {shouldRenderSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-[#fff]">
        {shouldRenderSidebar && <Searchbar />}

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40"> */}
            <Routes>
              {/* public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* protected routes */}
              <Route path="/" element={ isAuthenticated? <Layout component={Discover} /> : <Navigate to={'/login'} replace /> } />
              <Route path="/top-artists" element={isAuthenticated? <TopArtists/> : <Navigate to={'/login'} replace />} />
              <Route path="/top-charts" element={isAuthenticated? <TopCharts/> : <Navigate to={'/login'} replace />} />
              <Route path="/around-you" element={isAuthenticated? <AroundYou/> : <Navigate to={'/login'} replace />} />
              <Route path="/artists/:id" element={isAuthenticated? <ArtistDetails/> : <Navigate to={'/login'} replace />} />
              <Route path="/songs/:songid" element={isAuthenticated? <SongDetails/> : <Navigate to={'/login'} replace />} />
              <Route path="/search/:searchTerm" element={isAuthenticated? <Search/> : <Navigate to={'/login'} replace />} />

              {/* error routes */}
              <Route path="*" element={<div>404 - Not Found</div>} />


            </Routes>
          {/* </div>
          <div className="xl:sticky relative top-0 h-fit">
            {shouldRenderSidebar && <TopPlay />}
          </div> 
        </div>
      </div> */}

      {/* {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
       )}  */}
    </div>
  );
};

export default App;
