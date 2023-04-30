import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BookmarkPage from './bookmark';

describe('BookmarkPage', () => {
  it('should remove a bookmarked restaurant when the remove button is clicked', () => {
    const restaurant = {
      id: 1,
      name: 'Test Restaurant',
      chartUrl: 'https://example.com',
    };
    const storedBookmarks = [restaurant];
    localStorage.setItem('bookmarkedRestaurants', JSON.stringify(storedBookmarks));
    const { getByText, queryByText } = render(<BookmarkPage />);

    // Verify that the bookmarked restaurant is displayed
    expect(getByText(restaurant.name)).toBeInTheDocument();

    // Click the remove button
    fireEvent.click(getByText(/remove from bookmarks/i));

    // Verify that the bookmarked restaurant is removed
    expect(queryByText(restaurant.name)).not.toBeInTheDocument();
    expect(localStorage.getItem('bookmarkedRestaurants')).toBeNull();
  });
});
