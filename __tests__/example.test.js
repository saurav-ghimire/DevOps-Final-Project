import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Example Test', () => {
  it('renders a simple text', () => {
    render(<div>Hello, Jest!</div>);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});
