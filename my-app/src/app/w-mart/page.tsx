"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const allProductOptions = [
    "Amazon Alexa",
    "Maggi",
    "Yippee",
    "Hakka Noodles",
    "Chings",
    "Top Ramen",
    "Knorr",
    "Nissin",
    "Sakata",
    "Indomie",
    "Myojo",
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages([...selectedImages, ...Array.from(files)]);
      setProductName("");
      setSuggestions([]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setProductName(inputValue);

    if (inputValue) {
      const filteredSuggestions = allProductOptions.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setProductName(suggestion);
    setSuggestions([]);
    setSelectedImages([]);
  };

  const handleScan = async () => {
    if (selectedImages.length > 0 || productName) {
      router.push(`/find-product?product=${encodeURIComponent(productName)}`);
    }
  };

  const handleQuickShopping = () => {
    router.push('/quick-shopping');
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white text-blue-900 font-sans min-h-screen relative">
      <Head>
        <title>W-Mart - Find Your Product</title>
        <meta name="description" content="Scan an image or enter a product name to find products on w-Mart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-3 bg-blue-700 bg-opacity-90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="https://www.walmart.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <motion.h1 
              className="text-2xl font-bold text-yellow-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              w-Mart Compass
            </motion.h1>
          </a>
          <motion.button
            onClick={handleQuickShopping}
            className="py-2 px-4 rounded bg-blue-800 text-white font-semibold hover:bg-blue-900 transition shadow-lg ml-4 md:ml-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Quick Shopping
          </motion.button>
        </div>
      </header>

      <main className="flex flex-col items-center py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold mb-2">Scan an Image or Enter a Product Name</h2>
          <p className="text-lg mb-4 max-w-md">
            Our AI Model will help you find the product you are looking for.
          </p>
        </motion.div>

        <motion.div 
          className="mb-4 rounded-lg overflow-hidden shadow-xl relative flex items-start justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/instructions.jpeg"
            alt="Instructions on how to scan an image"
            width={450}
            height={70}
            className="rounded-lg"
          />
          <div className="absolute right-0 top-0 left-0 p-4 bg-white bg-opacity-80 border-2 border-red-600 rounded-lg shadow-md text-center">
            <p className="text-red-600 font-bold text-lg">ALERT!</p>
            <p className="text-red-600">Number of customers shopping: 82</p>
            <p className="text-red-600">EST: 32 mins</p>
          </div>
        </motion.div>

        <motion.div 
          className="flex flex-col items-center w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label 
            htmlFor="file-upload"
            className="mb-3 cursor-pointer w-full text-center p-3 rounded-full bg-white text-blue-900 shadow-md hover:bg-blue-100 transition"
          >
            Choose Images
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            ref={imageInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <div className="relative w-full mb-3">
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={handleProductNameChange}
              className="w-full p-3 rounded-full bg-white text-blue-900 shadow-md focus:ring-2 focus:ring-blue-300 outline-none transition"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white text-black shadow-lg border rounded-lg mt-1 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-blue-100 transition"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedImages.length > 0 && (
            <motion.div 
              className="mb-3 grid grid-cols-2 gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Selected Product ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          <motion.button
            onClick={handleScan}
            className="py-3 px-6 rounded-full text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
            disabled={selectedImages.length === 0 && !productName}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Product
          </motion.button>
        </motion.div>
      </main>

      <footer className="py-4 text-center bg-blue-200 bg-opacity-50 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4 mb-4">
            <motion.button
              onClick={() => router.push('/hospital-compass')}
              className="py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hospital Compass
            </motion.button>

            <motion.button
              onClick={() => router.push('/stadium-compass')}
              className="py-2 px-4 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Stadium Compass
            </motion.button>
          </div>

          <motion.button
            onClick={() => router.push('/')}
            className="py-2 px-4 rounded bg-gray-600 text-white font-semibold hover:bg-gray-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default Home;
