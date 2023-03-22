import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { SettingsContext } from '../Context/Settings/index';
import { AuthProvider, AuthContext } from "../Context/Auth";
import App from '../App'

const myUser = { capabilities: ['read', 'update', 'create', 'delete'] }
const can = (capability) => {
  return true;
}

const renderWithContext = (component) => {
  return render(
    <AuthContext.Provider value={{
      isLoggedIn: true,
      user: myUser,
      can: can,
    }}>
      <SettingsContext.Provider value={{
        numToDisplay: 3,
        showCompleted: false,
        sortingWord: 'difficulty',
      }}>
        {component}
      </SettingsContext.Provider>
    </AuthContext.Provider>
  );
};


describe('App', () => {

  test('renders ToDo component', () => {
    renderWithContext(<App />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    usernameInput.value = 'admin';
    passwordInput.value = 'ADMIN';

    const addButton = screen.getByText('Add To Do Item')
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new item to the list', async () => {
    renderWithContext(<App />);
    fireEvent.change(screen.getByPlaceholderText('Item Details'), {
      target: { value: 'Test Item' },
    });
    fireEvent.change(screen.getByPlaceholderText('Assignee Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  test('toggles item completion, hides it when only showing incompletes', async () => {
    renderWithContext(<App />);
    fireEvent.change(screen.getByPlaceholderText('Item Details'),
      { target: { value: 'Test Item' }, });
    fireEvent.change(screen.getByPlaceholderText('Assignee Name'),
      { target: { value: 'John Doe' }, });
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Test Item')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Incomplete'));
    expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
  });

  test('paginates the list correctly', async () => {
    renderWithContext(<App />);
    for (let i = 1; i <= 4; i++) {
      fireEvent.change(screen.getByPlaceholderText('Item Details'),
        { target: { value: `Test Item ${i}` }, });
      fireEvent.change(screen.getByPlaceholderText('Assignee Name'), {
        target: { value: `John Doe ${i}` },
      });
      fireEvent.click(screen.getByText('Add Item'));
    }
    expect(screen.queryByText('Test Item 4')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('Test Item 4')).toBeInTheDocument();
  });
});
