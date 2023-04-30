import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './sideBar';

describe('Sidebar', () => {
  it('renders Home and Bookmarked Restaurants links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(getByText(/home/i)).toBeInTheDocument();
    expect(getByText(/bookmarked restaurants/i)).toBeInTheDocument();
  });
});
