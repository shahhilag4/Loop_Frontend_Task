import React, { useState, useEffect } from 'react';
import Sidebar from '../sideBar/sideBar';
import "./bookmark.css"

const BookmarkPage = () => {
  const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarkedRestaurants'));
    if (storedBookmarks) {
      setBookmarkedRestaurants(storedBookmarks);
    }
  }, []);

  const handleRemoveRestaurant = (restaurant) => {
    const newBookmarks = bookmarkedRestaurants.filter((bookmark) => bookmark.id !== restaurant.id);
    setBookmarkedRestaurants(newBookmarks);
    localStorage.setItem('bookmarkedRestaurants', JSON.stringify(newBookmarks));
  };

  return (
    <div className="bookmark-page">
      <h1>Bookmarked Restaurants</h1>
      {bookmarkedRestaurants.map((restaurant) => (
        <div className="bookmark-restaurant" key={restaurant.id}>
          <h2>{restaurant.name}</h2>
          <iframe
            title={restaurant.name}
            width="600"
            height="450"
            loading="lazy"
            allowFullScreen
            src={restaurant.chartUrl}
          ></iframe>
          <button className="bookmark-button" onClick={() => handleRemoveRestaurant(restaurant)}>Remove from bookmarks</button>
        </div>
      ))}
    </div>
  );
};

const BookWrapper = () => {
  return (
    <div className="bookmark-wrapper">
      <Sidebar style={{ flex: 1 }} />
      <BookmarkPage style={{ flex: 2 }} />
    </div>
  );
};

export default BookWrapper;
