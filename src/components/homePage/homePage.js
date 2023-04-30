import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sideBar/sideBar';
import "./homePage.css"

const HomePage = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [newlyAddedRestaurant, setNewlyAddedRestaurant] = useState(null);
  const [bookmarkedRestaurants, setBookmarkedRestaurants] = useState([]);
  const [bookmarkedRestaurantsOtherSection, setBookmarkedRestaurantsOtherSection] = useState([]);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [mapZoom, setMapZoom] = useState(14);
  const history = useNavigate();

  const [storedBookmarkedRestaurants, setStoredBookmarkedRestaurants] = useState([]);

  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants'));
    const storedBookmarkedRestaurants = JSON.parse(localStorage.getItem('bookmarkedRestaurants'));
    if (storedRestaurants) {
      if (JSON.stringify(storedRestaurants.filter((restaurant) => !restaurant.isOtherSection)) !== JSON.stringify(bookmarkedRestaurants)) {
        setBookmarkedRestaurants(storedRestaurants.filter((restaurant) => !restaurant.isOtherSection));
      }
      if (JSON.stringify(storedRestaurants.filter((restaurant) => restaurant.isOtherSection)) !== JSON.stringify(bookmarkedRestaurantsOtherSection)) {
        setBookmarkedRestaurantsOtherSection(storedRestaurants.filter((restaurant) => restaurant.isOtherSection));
      }
      if (storedRestaurants[storedRestaurants.length - 1] !== newlyAddedRestaurant) {
        setNewlyAddedRestaurant(storedRestaurants[storedRestaurants.length - 1]);
      }
    }
    if (storedBookmarkedRestaurants) {
      setStoredBookmarkedRestaurants(storedBookmarkedRestaurants);
    }
  }, []);
  
  

  const handleRestaurantNameChange = (event) => {
    const input = event.target.value.toLowerCase(); // convert user's input to lowercase
    setRestaurantName(input);
    if (!input) {
      setAutocompleteOptions([]);
      return;
    }
    fetch(`https://api.airtable.com/v0/appmLNUPo45PBcefP/grid2?fields%5B%5D=Name&filterByFormula=FIND("${input}",LOWER({Name}))=1`, { // convert name of each option to lowercase before comparing
      headers: {
        Authorization: 'Bearer key7NroSVHGsnoDGs',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const options = data.records.map((record) => record.fields.Name);
        setAutocompleteOptions(options);
      });
  };
  
  
  
  const handleAutocompleteOptionClick = (option) => {
    setRestaurantName(option);
    setAutocompleteOptions([]);
    inputRef.current.focus();
  };
  const inputRef = useRef(null);
  

  const handleAddRestaurant = () => {
    const encodedName = encodeURIComponent(restaurantName);
    // TODO: Add logic to add restaurant map to page
    fetch(`https://api.airtable.com/v0/appmLNUPo45PBcefP/grid2?filterByFormula=({Name} = '${encodedName}')`, {
      headers: {
        Authorization: 'Bearer key7NroSVHGsnoDGs',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const restaurant = data.records[0];
        if (restaurant && restaurant.fields && restaurant.fields.Name) {
          const encodedName2 = encodeURIComponent(restaurant.fields.Name);
          const chartUrl = `https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22${encodedName2}%22%7D`;
          setMapZoom(14);
          const newRestaurant = {
            id: restaurant.id,
            name: restaurant.fields.Name,
            chartUrl,
          };
          setNewlyAddedRestaurant(newRestaurant);
          setRestaurantName("");
          // Store the newly added restaurant in localStorage
          const storedRestaurants = JSON.parse(localStorage.getItem('restaurants'));
          const newRestaurants = storedRestaurants ? [...storedRestaurants, newRestaurant] : [newRestaurant];
          localStorage.setItem('restaurants', JSON.stringify(newRestaurants));
           // Add the newly added restaurant to the bookmarkedRestaurants state
        const newBookmarkedRestaurants = [...bookmarkedRestaurants, newRestaurant];
        setBookmarkedRestaurants(newBookmarkedRestaurants);
        }
      });
  };
  
  
    
    const handleLogout = () => {
      localStorage.removeItem('token');
      history('/');
      return;
  };

  const handleBookmarkRestaurant = (restaurant) => {
    // TODO: Add logic to move map to bookmark page and add to bookmarkedRestaurants state
    setMapZoom(14);
    const storedRestaurants1 = JSON.parse(localStorage.getItem('bookmarkedRestaurants'));
    const newBookmarkedRestaurants = storedRestaurants1 ? storedRestaurants1.concat(restaurant) : [restaurant];
    console.log(newBookmarkedRestaurants);
    setBookmarkedRestaurants(newBookmarkedRestaurants);
    localStorage.setItem('bookmarkedRestaurants', JSON.stringify(newBookmarkedRestaurants));
    handleRemoveRestaurant(restaurant);
  };
  
  
  
  const handleRemoveRestaurant = (restaurant) => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants'));
    const updatedRestaurants = storedRestaurants.filter((r) => r.id !== restaurant.id);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    
    // Update bookmarkedRestaurants state
    const updatedBookmarkedRestaurants = updatedRestaurants.filter((restaurant) => !restaurant.isOtherSection);
    setBookmarkedRestaurants(updatedBookmarkedRestaurants);
  };
  
  
  
  return (
    <div className='homepage-container'>
    <h1>Welcome to the Restaurant App!</h1>
  <button className='bookmark-remove' onClick={handleLogout}>Logout</button>
    <div className='search-container'>
      <input type="text" value={restaurantName} onChange={handleRestaurantNameChange} onFocus={() => setAutocompleteOptions([])} ref={inputRef} />
      {autocompleteOptions.length > 0 && (
        <ul>
          {autocompleteOptions.map((option) => (
            <li key={option} onClick={() => handleAutocompleteOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
      <button className='bookmark-add' onClick={handleAddRestaurant}>Add Restaurant</button>
    </div>
   
  {newlyAddedRestaurant && (
      <div className="map-container">
      {bookmarkedRestaurants.map((restaurant) => (
  <div key={restaurant.id}>
    <h2>{restaurant.name}</h2>
    <iframe title={restaurant.name} width="600" height="450" frameborder="0" src={restaurant.chartUrl}></iframe>
          <button className='bookmark-add' onClick={() => handleBookmarkRestaurant(restaurant)}>Bookmark</button>
          <button className='bookmark-remove' onClick={() => handleRemoveRestaurant(restaurant)}>Remove</button>
        </div>
      ))}
    </div>
    
)}

  </div>
);
};
// export default HomePage;

const HomeWrapper = () => {
  return (
    <div className="home-wrapper">
      <Sidebar style={{ flex: 1 }} />
      <HomePage style={{ flex: 2 }} />
    </div>
  );
};

export default HomeWrapper;


  
