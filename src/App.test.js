import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from './components/layout/Header';

// Minimal mock for react-router-dom to avoid ESM loading issues in Jest
jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: () => null,
    Link: ({ children }) => <a href="#">{children}</a>,
    NavLink: ({ children }) => <a href="#">{children}</a>,
  }),
  { virtual: true }
);

jest.mock('react-slick', () => () => <div />);

test('renders header logo', () => {
  render(<Header />);
  const logoElement = screen.getByRole('link', { name: /cine mate/i });
  expect(logoElement).toBeInTheDocument();
});
