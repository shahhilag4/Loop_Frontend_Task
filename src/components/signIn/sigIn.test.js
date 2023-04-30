import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SignInPage from './signIn';

jest.mock('axios');

describe('SignInPage', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the sign-in form', () => {
    const { getByLabelText, getByText } = render(<SignInPage />);
    expect(getByText('Sign In')).toBeInTheDocument();
    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('submits the form with valid credentials', async () => {
    const mockResponse = {
      data: {
        records: [{ id: '123', fields: { Username: 'test', Password: 'test' } }],
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    const { getByLabelText, getByText } = render(<SignInPage />);
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'test' } });
    fireEvent.click(getByText('Sign In'));
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.airtable.com/v0/apprkvqGTnEeRHnwO/grid',
      {
        headers: {
          Authorization: 'Bearer key7NroSVHGsnoDGs',
        },
        params: {
          filterByFormula: `AND({Username} = 'test', {Password} = 'test')`,
        },
      }
    );
  });

  it('shows an error message with invalid credentials', async () => {
    const mockResponse = {
      data: {
        records: [],
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    const { getByLabelText, getByText, findByText } = render(<SignInPage />);
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'test' } });
    fireEvent.click(getByText('Sign In'));
    await findByText('Invalid username or password.');
    expect(getByText('Invalid username or password.')).toBeInTheDocument();
  });

  it('shows an error message when an error occurs', async () => {
    axios.get.mockRejectedValue(new Error('An error occurred'));
    const { getByLabelText, getByText, findByText } = render(<SignInPage />);
    fireEvent.change(getByLabelText('Username:'), { target: { value: 'test' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'test' } });
    fireEvent.click(getByText('Sign In'));
    await findByText('An error occurred. Please try again later.');
    expect(getByText('An error occurred. Please try again later.')).toBeInTheDocument();
  });
});
