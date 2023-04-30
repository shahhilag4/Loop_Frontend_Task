import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../components/homePage/homePage';

export default {
  title: 'HomePage',
  component: HomePage,
};

const Template = (args) => (
  <Router>
    <HomePage {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  restaurantName: 'Restaurant',
  newlyAddedRestaurant: { name: 'New Restaurant' },
  bookmarkedRestaurants: [
    { id: 1, name: 'Bookmarked Restaurant 1', chartUrl: 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22Bookmarked%20Restaurant%201%22%7D' },
    { id: 2, name: 'Bookmarked Restaurant 2', chartUrl: 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22Bookmarked%20Restaurant%202%22%7D' },
  ],
  bookmarkedRestaurantsOtherSection: [],
  autocompleteOptions: ['Option 1', 'Option 2', 'Option 3'],
  mapZoom: 14,
};
