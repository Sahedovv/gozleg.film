import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Contacts from './pages/Contacts';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<AboutUs />} />
      </Route>
    </Routes>
  );
}

export default App;