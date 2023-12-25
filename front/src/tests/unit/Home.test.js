import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../../http/productAPI';
import { getAllCategories } from '../../http/categoriesAPI';
import { getByUserId } from '../../http/favouritesAPI';
import Home from '../../components/Home/Home';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html>');
global.document = dom.window.document;
global.window = dom.window;

jest.mock('mobx-react-lite', () => ({
  observer: (component) => component,
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('axios');

jest.mock('../../http/productAPI', () => ({
  getAllProducts: jest.fn(),
  getProductByCategoryId: jest.fn(),
}));

jest.mock('../../http/categoriesAPI', () => ({
  getAllCategories: jest.fn(),
}));

jest.mock('../../http/favouritesAPI', () => ({
  getByUserId: jest.fn(),
}));

describe('Home Component', () => {
  beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html>');
    global.document = dom.window.document;
    global.window = dom.window;
  });
  
  const mockUser = { id: 1, name: 'Test User' };
  const mockCart = []; 

  const mockProducts = [
    { id: 1, name: 'Product 1', categoryId: 1, },
    { id: 2, name: 'Product 2', categoryId: 2, },
  ];

  const mockCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
  ];

  const mockExchangeRates = {
    BYN: 1,
    RUB: 2,
    USD: 3,
    EUR: 4,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders home component with initial data', async () => {
    useQuery.mockReturnValueOnce({ isPending: false, data: { data: { rates: mockExchangeRates } } });
    getAllProducts.mockResolvedValueOnce({ data: mockProducts });
    getAllCategories.mockResolvedValueOnce({ data: mockCategories });
    getByUserId.mockResolvedValueOnce({ data: [] }); 

    render(<Home user={mockUser} cart={mockCart} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  it('filters products by name when search input changes', async () => {
    useQuery.mockReturnValueOnce({ isPending: false, data: { data: { rates: mockExchangeRates } } });

    getAllProducts.mockResolvedValueOnce({ data: mockProducts });
    getAllCategories.mockResolvedValueOnce({ data: mockCategories });
    getByUserId.mockResolvedValueOnce({ data: [] }); 

    render(<Home user={mockUser} cart={mockCart} />);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Product 1' } });

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    });
  });

});
