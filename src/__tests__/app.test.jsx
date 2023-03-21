import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { SettingsContext } from '../Context/Settings/index';
import ToDo from '../Components/ToDo';

const renderWithContext = (component) => {
  return render(
    <SettingsContext.Provider value={{
      numToDisplay: 3,
      showCompleted: false,
      sortingWord: 'difficulty',
    }}>
      {component}
    </SettingsContext.Provider>
  );
};

describe('ToDo', () => {
  test('renders ToDo component', () => {
    renderWithContext(<ToDo />);
    const addButton = screen.getByText('Add To Do Item')
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new item to the list', async () => {
    renderWithContext(<ToDo />);
    fireEvent.change(screen.getByPlaceholderText('Item Details'), {
      target: { value: 'Test Item' },
    });
    fireEvent.change(screen.getByPlaceholderText('Assignee Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Add Item'));

    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  test('toggles item completion', async () => {
    renderWithContext(<ToDo />);
    fireEvent.change(screen.getByPlaceholderText('Item Details'), {
      target: { value: 'Test Item' },
    });
    fireEvent.change(screen.getByPlaceholderText('Assignee Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Add Item'));
    expect(screen.getByText('Test Item')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Complete: false'));
    expect(screen.queryByText('Test Item')).not.toBeInTheDocument();
  });

  test('paginates the list correctly', async () => {
    renderWithContext(<ToDo />);

    for (let i = 1; i <= 4; i++) {
      fireEvent.change(screen.getByPlaceholderText('Item Details'), {
        target: { value: `Test Item ${i}` },
      });
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
