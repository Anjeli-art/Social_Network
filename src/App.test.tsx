import React from 'react';
import { render, screen } from '@testing-library/react';
import SamuraiApp from './App';

test('renders learn react link', () => {
  render(<SamuraiApp/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
