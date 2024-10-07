import './globals.css';
import { ReactNode } from 'react';
import ShopContextProvider from '@/app/context/ShopContext'; // Adjust the path if necessary

export const metadata = {
  title: 'Grocery Store',
  description: 'A simple grocery store app with cart functionality.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ShopContextProvider>
          {children}
        </ShopContextProvider>
      </body>
    </html>
  );
}
