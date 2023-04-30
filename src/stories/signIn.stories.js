import React from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom'; // import MemoryRouter
import SignInPage from '../components/signIn/signIn';

export default {
  title: 'SignInPage',
  component: SignInPage,
};

export const Default = () => (
  <MemoryRouter> {/* wrap SignInPage inside MemoryRouter */}
    <SignInPage />
  </MemoryRouter>
);

export const WithError = () => (
  <MemoryRouter> {/* wrap SignInPage inside MemoryRouter */}
    <SignInPage
      onSubmit={action('onSubmit')}
      onUsernameChange={action('onUsernameChange')}
      onPasswordChange={action('onPasswordChange')}
      error="Invalid username or password."
    />
  </MemoryRouter>
);

export const SignedIn = () => (
  <MemoryRouter> {/* wrap SignInPage inside MemoryRouter */}
    <SignInPage
      onSubmit={action('onSubmit')}
      onUsernameChange={action('onUsernameChange')}
      onPasswordChange={action('onPasswordChange')}
      authenticated={true}
    />
  </MemoryRouter>
);
