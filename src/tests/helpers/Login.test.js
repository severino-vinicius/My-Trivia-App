import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';

describe('Testes do componente Login.jsx', () => {
  test('Requisito 1', () => {
    renderWithRouterAndRedux(<Login />);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    expect(buttonPlay).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    userEvent.type(inputEmail, 'xxxxx@gmail.com');
    userEvent.type(inputName, 'a');
    expect(buttonPlay).toBeEnabled();
  });
  test('Requisito 2', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'xxx@gmail.com');
    userEvent.type(inputName, 'a');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);
    waitFor(() => {
      expect(history.location.pathname).toBe('/Game');
      console.log(history.location.pathname);
    });
  });
  test('Requisito 3', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings);
    waitFor(() => {
      expect(history.location.pathname).toBe('/Settings');
    });
  });
});
