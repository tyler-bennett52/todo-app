import React, { useContext } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, AuthContext } from './';

const TestComponent = () => {
  const { isLoggedin, login, logout, can } = useContext(AuthContext);

  return (
    <div>
      <p>{isLoggedin ? 'Logged in' : 'Not logged in'}</p>
      <button onClick={() => login('admin', 'ADMIN')}>Login</button>
      <button onClick={logout}>Logout</button>
      <p>{can('read') ? 'Can Read' : 'Cannot Read'}</p>
    </div>
  );
};

describe('AuthContext', () => {
  test('renders AuthProvider without crashing', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
  });

  test('logs in a user with valid credentials', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Logged in')).toBeInTheDocument());
  });

  test('logs out a user after being logged in', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Logged in')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Logout'));
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
  });

  test('can function returns correct capability status', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => expect(screen.getByText('Logged in')).toBeInTheDocument());

    expect(screen.getByText('Can Read')).toBeInTheDocument();
  });
});
