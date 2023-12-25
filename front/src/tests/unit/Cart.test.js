import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/react/dont-cleanup-after-each';
import Cart from '../../components/Cart/Cart';
import { act } from 'react-dom/test-utils'; 
import { createOrder } from '../../http/ordersAPI';


const mockUser = { id: 1, name: 'Test User' };
const mockCart = {
  cartItems: [
    { id: 1, product: { id: 1, name: 'Product 1', price: 10, image: { body: 'base64image' } }, quantity: 2 },
    { id: 2, product: { id: 2, name: 'Product 2', price: 15, image: { body: 'base64image' } }, quantity: 3 },
  ],
  updateCartItemQuantity: jest.fn(),
  clearCart: jest.fn(),
};

// Тесты
describe('Cart Component', () => {
    it('renders cart items correctly', () => {
      render(<Cart user={mockUser} cart={mockCart} />);
      expect(screen.getByText('Корзина')).toBeInTheDocument();
  
      mockCart.cartItems.forEach((item) => {
        expect(screen.getByText(item.product.name)).toBeInTheDocument();
        expect(screen.getByText(`${item.product.price * item.quantity} BYN`)).toBeInTheDocument();
      });
    });
  
    it('calls updateCartItemQuantity when +/- buttons are clicked', () => {
      render(<Cart user={mockUser} cart={mockCart} />);
      fireEvent.click(screen.getByText('+'));
      expect(mockCart.updateCartItemQuantity).toHaveBeenCalledWith(1, 1);
      fireEvent.click(screen.getByText('-'));
      expect(mockCart.updateCartItemQuantity).toHaveBeenCalledWith(1, -1);
    });
  
    it('calls createOrder and clearCart when "Оформить заказ" button is clicked', async () => {
      render(<Cart user={mockUser} cart={mockCart} />);
      await act(async () => {
        fireEvent.click(screen.getByText('Оформить заказ'));
      });
  
      expect(mockCart.cartItems.length).toEqual(mockCart.createOrder.mock.calls.length);
      expect(mockCart.clearCart).toHaveBeenCalled();
    });
});
