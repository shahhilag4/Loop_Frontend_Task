import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './components/signIn/signIn';
import HomePage from './components/homePage/homePage';
import BookmarkPage from './components/bookMark/bookmark';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<SignInPage />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
      </Routes>
    </Router>
  );
};

export default App;
