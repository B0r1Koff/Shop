// CartStore.js
import { makeAutoObservable } from 'mobx';

export default class CartStore {
  cartItems = [];

  constructor() {
    makeAutoObservable(this);
    this.loadCartFromLocalStorage();
  }

  addToCart(item) {
    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        product: item,
        quantity: 1,
        price: item.price,
      });
    }

    this.saveCartToLocalStorage();
  }

  updateCartItemQuantity(productId, newQuantity) {
    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === productId);

    if (existingItem) {
        if(existingItem.quantity === 1 && newQuantity === -1){
            this.removeFromCart(productId)
        }else{
            existingItem.quantity = existingItem.quantity + newQuantity;
            this.saveCartToLocalStorage();
        }
      
    }
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== productId);
    this.saveCartToLocalStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartToLocalStorage();
  }

  // Сохранение корзины в localStorage
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Загрузка корзины из localStorage
  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }
}
