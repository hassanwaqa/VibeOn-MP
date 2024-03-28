import React from 'react'

import { useSelector } from 'react-redux';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from '../components';
import Discover from './Discover';


function Layout({ component: Component }) {

    const { activeSong } = useSelector((state) => state.player);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const shouldRenderSidebar = !(isLoginPage || isRegisterPage);
  return (
    <div className="relative flex">
      {shouldRenderSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-white to-[#fff]">
        {shouldRenderSidebar && <Searchbar />}

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Component />
          </div>
          <div className='xl:sticky top-0 h-full overflow-y-auto'>
            <div className="h-96">
              {shouldRenderSidebar && <TopPlay />}
            </div>
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
       )} 
    </div>
  )
}

export default Layout