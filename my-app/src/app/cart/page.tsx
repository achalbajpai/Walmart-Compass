"use client"
import { useShopContext } from '@/app/context/ShopContext'; // Adjust the path if necessary
import Link from 'next/link';

const CartPage = () => {
  const { cartItems, products, updateCartQuantity, removeFromCart } = useShopContext();

  const getCartItemDetails = (id: number) => products.find(product => product.id === id);

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <br /> <button className='bg-blue-500 text-black mt-8 ' > <Link href="/">Go back to shop</Link></button></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cartItems.map(cartItem => {
            const product = getCartItemDetails(cartItem.id);
            return (
              <div key={cartItem.id} className="border p-4 rounded-md">
                <img src={product?.image} alt={product?.name} className="w-24 h-24 object-cover" />
                <h2 className="text-xl font-bold">{product?.name}</h2>
                <p className="text-gray-500">Price: ${product?.price}</p>
                <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                <div className="flex space-x-3 mt-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1"
                    onClick={() => updateCartQuantity(cartItem.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1"
                    onClick={() => updateCartQuantity(cartItem.id, -1)}
                  >
                    -
                  </button>
                  <button
                    className="bg-red-700 text-white px-2 py-1"
                    onClick={() => removeFromCart(cartItem.id)}
                  >
                    Remove
                  </button>
                </div>
                <p className="text-gray-800 mt-2">
                  Total: ${(product?.price || 0) * cartItem.quantity}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CartPage;
