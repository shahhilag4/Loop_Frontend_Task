import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import BookmarkPage from '../components/bookMark/bookmark';

export default {
  title: 'BookmarkPage',
  component: BookmarkPage,
};

export const Default = () => (
  <MemoryRouter>
    <BookmarkPage />
  </MemoryRouter>
);

export const WithBookmarks = () => (
  <MemoryRouter>
    <BookmarkPage
      bookmarkedRestaurants={[
        {
          id: 1,
          name: 'Taco Bell',
          chartUrl: 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22$Taco%22Bell%22%7D',
        },
        {
          id: 2,
          name: 'Restaurant 2',
          chartUrl: 'https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params=%7B%22ds2.name2%22:%22$Taco%22Bell%22%7D',
        },
      ]}
      onRemoveBookmark={action('onRemoveBookmark')}
    />
  </MemoryRouter>
);
