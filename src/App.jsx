import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TopBar from './components/topbar';
import BubbleLink from './components/bubble-a';
import WavyMenu from './components/menu';
import BubbleBtn from './components/bubble-btn';


import Home from './pages/home';
import Tab1 from './pages/tab1';
import Tab2 from './pages/tab2';
import Tab3 from './pages/tab3';



function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/tab1" element={<Tab1 />}/>
        <Route path="/tab2" element={<Tab2 />}/>
        <Route path="/tab3" element={<Tab3 />}/>
      </Routes>
    </>
  );
}

//  

export default App
