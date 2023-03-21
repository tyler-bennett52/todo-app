import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import { SettingsProvider, SettingsContext } from './Settings';

const TestComponent = () => {
  const { numToDisplay, showCompleted, sortingWord } = useContext(SettingsContext);
  return (
    <div>
      <div data-testid="numToDisplay">{numToDisplay}</div>
      <div data-testid="showCompleted">{showCompleted.toString()}</div>
      <div data-testid="sortingWord">{sortingWord}</div>
    </div>
  );
};

describe('SettingsContext', () => {
  test('provides default context values', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('numToDisplay').textContent).toBe('3');
    expect(screen.getByTestId('showCompleted').textContent).toBe('false');
    expect(screen.getByTestId('sortingWord').textContent).toBe('difficulty');
  });
});
