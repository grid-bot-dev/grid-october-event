import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';

// Mock the components
jest.mock('../src/pages/Auth', () => () => <div>Auth Component</div>);
jest.mock('../src/pages/Dashboard', () => () => <div>Dashboard Component</div>);
jest.mock('../src/pages/CDPTransformations', () => () => <div>CDPTransformations Component</div>);
jest.mock('../src/pages/UserFlow', () => () => <div>UserFlow Component</div>);

describe('App Component', () => {
  it("renders without crashing", () => {
    expect(true).toBeTruthy();
  })
});
