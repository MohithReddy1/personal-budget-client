import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Add this import
import HomePage from '../src/HomePage/HomePage';

test('renders homepage with buttons', () => {
  render(
    <Router>
      <HomePage/>
    </Router>
  );

  // Check if the heading is present
  const headingElement = screen.getByText(/Stay on track/i);
  expect(headingElement).toBeInTheDocument();
});
