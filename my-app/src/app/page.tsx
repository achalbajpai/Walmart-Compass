"use client"; // Mark this file as a Client Component

import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Define predefined product options (types of noodles)
  const allProductOptions = [
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

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setProductName(""); // Clear product name if an image is selected
      setSuggestions([]); // Clear suggestions when image is selected
    }
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
    setSelectedImage(null); // Clear selected image if a product suggestion is chosen
  };

  const handleScan = async () => {
    if (selectedImage) {
      // Simulate processing and redirecting based on image upload
      const productCategory = "noodles";
      router.push(`/search?category=${productCategory}`);
    } else if (productName) {
      // Redirect based on selected product name
      router.push(`/search?product=${encodeURIComponent(productName)}`);
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} font-sans min-h-screen`}>
      <Head>
        <title>Walmart - Find Your Product</title>
        <meta name="description" content="Scan an image or enter a product name to find products on Walmart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`p-6 shadow-lg ${darkMode ? "bg-gray-800" : "bg-blue-600"}`}>
        <div className="container mx-auto flex justify-between items-center">
          <a href="https://www.walmart.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
            <Image
              src="/walmart.png" // Make sure you have an image named 'walmart.png' in the 'public' folder
              alt="Walmart Logo"
              width={50}
              height={50}
              className="rounded cursor-pointer"
            />
            <h1 className="text-3xl font-bold">Walmart Compass </h1>
          </a>
          <button
            onClick={toggleDarkMode}
            className={`py-2 px-4 rounded ${darkMode ? "bg-yellow-500 text-gray-900" : "bg-gray-200 text-blue-600"} border border-transparent hover:border-gray-400 transition`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center py-20">
        <h2 className="text-4xl font-bold mb-6">Scan an Image or Enter a Product Name</h2>
        <p className="text-xl mb-10 text-center max-w-2xl">
          Upload an image or enter a product name, and we will help you find the product you are looking for on Walmart.
        </p>

        {/* Instructional Image */}
        <div className="mb-10">
          <Image
            src="/instructions.jpeg" // Make sure you have an image named 'instructions.jpeg' in the 'public' folder
            alt="Instructions on how to scan an image"
            width={600}
            height={100} // Reduced height
            className="rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageUpload}
            className={`mb-6 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"} p-2 rounded`}
          />

          <div className="relative w-full mb-6">
            <input
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={handleProductNameChange}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}
            />
            {suggestions.length > 0 && (
              <ul className={`absolute z-10 w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} shadow-lg border rounded mt-1`}>
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedImage && (
            <div className="mb-6">
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Product"
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            onClick={handleScan}
            className={`py-3 px-6 rounded-full text-lg font-semibold ${darkMode ? "bg-yellow-500 text-gray-900" : "bg-blue-600 text-white"} hover:opacity-90 transition`}
            disabled={!selectedImage && !productName}
          >
            Find Product
          </button>
        </div>
      </main>

      <footer className={`py-6 text-center ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="container mx-auto">
          <p>© 2024 Walmart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
