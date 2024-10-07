"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define interfaces for products and cart items
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface ShopContextProps {
  products: Product[];
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, amount: number) => void;
}

// Create ShopContext
export const ShopContext = createContext<ShopContextProps | null>(null);

// ShopContextProvider Component
const ShopContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sample products
  const products: Product[] = [
    { id: 1, name: 'Apple', price: 1.0, image: '/images/apple.webp' },
    { id: 2, name: 'Banana', price: 0.5, image: '/images/apple.webp' },
    { id: 3, name: 'Carrot', price: 0.8, image: '/images/apple.webp' },
  ];

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id: number, amount: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + amount } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <ShopContext.Provider value={{ products, cartItems, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook for using the shop context
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within a ShopContextProvider');
  }
  return context;
};

export default ShopContextProvider;
