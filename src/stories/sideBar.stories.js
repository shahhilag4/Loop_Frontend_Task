import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../components/sideBar/sideBar';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

const bookmarkedRestaurants = [
  { id: 1, name: 'Bookmarked Restaurant 1', chartUrl: 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22Bookmarked%20Restaurant%201%22%7D' },
  { id: 2, name: 'Bookmarked Restaurant 2', chartUrl: 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22Bookmarked%20Restaurant%202%22%7D' },
];

const Template = (args) => (
  <BrowserRouter>
    <Sidebar {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  bookmarkedRestaurants,
};
