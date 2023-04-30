import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './homePage';

describe('HomePage component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        records: [
          { id: 1, fields: { Name: 'restaurant1' } },
          { id: 2, fields: { Name: 'restaurant2' } },
          { id: 3, fields: { Name: 'restaurant3' } },
        ],
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders a search input field', async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const searchInput = screen.getByLabelText('search');
    expect(searchInput).toBeInTheDocument();
  });

  test('displays autocomplete options when the search input is typed in', async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const searchInput = screen.getByLabelText('search');
    fireEvent.change(searchInput, { target: { value: 'restaurant' } });

    const autocompleteOption1 = await screen.findByText('restaurant1');
    expect(autocompleteOption1).toBeInTheDocument();

    const autocompleteOption2 = await screen.findByText('restaurant2');
    expect(autocompleteOption2).toBeInTheDocument();

    const autocompleteOption3 = await screen.findByText('restaurant3');
    expect(autocompleteOption3).toBeInTheDocument();
  });

  test('displays a newly added restaurant when one is added', async () => {
    await act(async () => {
      render(<HomePage />);
    });

    const searchInput = screen.getByLabelText('search');
    fireEvent.change(searchInput, { target: { value: 'restaurant1' } });

    const addRestaurantButton = screen.getByText('Add Restaurant');
    fireEvent.click(addRestaurantButton);

    const newlyAddedRestaurant = await screen.findByText('restaurant1');
    expect(newlyAddedRestaurant).toBeInTheDocument();
  });
});
