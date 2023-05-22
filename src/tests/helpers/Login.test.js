import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Login from '../../pages/Login';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';

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
    const { history } = renderWithRouterAndRedux(<Login />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'xxx@gmail.com');
    userEvent.type(inputName, 'a');
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    userEvent.click(buttonPlay);
    waitFor(() => {
      expect(history.location.pathname).toBe('/Game');
    });
  });
  test('Requisito 3', async () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/Settings');
    });
  });
});
