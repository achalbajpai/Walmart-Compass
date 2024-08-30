"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const StadiumHome: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [seatNumber, setSeatNumber] = useState<string>("");
  const [seatSuggestions, setSeatSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const allSeatOptions = [
    "Block A1 - Seat 1",
    "Block A1 - Seat 2",
    "Block A2 - Seat 1",
    "Block A2 - Seat 2",
    "Block B1 - Seat 1",
    "Block B1 - Seat 2",
    "Block B2 - Seat 1",
    "Block B2 - Seat 2",
    "Block C1 - Seat 1",
    "Block C1 - Seat 2",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      setSeatNumber("");
      setSeatSuggestions([]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleSeatNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSeatNumber(inputValue);

    if (inputValue) {
      const filteredSuggestions = allSeatOptions.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSeatSuggestions(filteredSuggestions);
    } else {
      setSeatSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSeatNumber(suggestion);
    setSeatSuggestions([]);
    setSelectedFiles([]);
  };

  const handleFindSeat = async () => {
    if (selectedFiles.length > 0) {
      router.push(`/search?documents`);
    } else if (seatNumber) {
      router.push(`/search?seat=${encodeURIComponent(seatNumber)}`);
    }
  };

  const handleEmergency = () => {
    router.push('/emergency');
  };

  const handleNavigateHome = () => {
    router.push('/');
  };

  const handleNavigateToHospitalCompass = () => {
    router.push('/hospital-compass');
  };

  const handleNavigateToWMart = () => {
    router.push('/w-mart');
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white text-gray-900 font-sans min-h-screen relative">
      <Head>
        <title>Stadium Compass</title>
        <meta name="description" content="Upload your ticket or enter your seat number to find your seat in the stadium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-3 bg-indigo-800 bg-opacity-90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-yellow-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Stadium Compass
          </motion.h1>
          <motion.button
            onClick={handleEmergency}
            className="py-2 px-4 rounded bg-red-800 text-white font-semibold hover:bg-red-900 transition shadow-lg ml-4 md:ml-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            VIP 
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
          <h2 className="text-2xl font-bold mb-2">Upload Ticket or Enter Your Seat Number</h2>
          <p className="text-lg mb-4 max-w-md">
            Our system will help you find your seat in the stadium.
          </p>
        </motion.div>

        <motion.div 
          className="mb-4 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/stadium.jpeg"
            alt="Instructions on how to find your seat"
            width={450}
            height={70}
            className="rounded-lg"
          />
        </motion.div>

        <motion.div 
          className="flex flex-col items-center w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label 
            htmlFor="file-upload"
            className="mb-3 cursor-pointer w-full text-center p-3 rounded-full bg-white text-gray-900 shadow-md hover:bg-gray-100 transition"
          >
            Upload Ticket
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="relative w-full mb-3">
            <input
              type="text"
              placeholder="Enter Seat Number"
              value={seatNumber}
              onChange={handleSeatNumberChange}
              className="w-full p-3 rounded-full bg-white text-gray-900 shadow-md focus:ring-2 focus:ring-gray-300 outline-none transition"
            />
            {seatSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white text-black shadow-lg border rounded-lg mt-1 max-h-60 overflow-y-auto">
                {seatSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100 transition"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedFiles.length > 0 && (
            <motion.div 
              className="mb-3 grid grid-cols-2 gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src="/document-placeholder.png"
                    alt={`Uploaded Document ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          <motion.button
            onClick={handleFindSeat}
            className="py-3 px-6 rounded-full text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
            disabled={selectedFiles.length === 0 && !seatNumber}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Seat
          </motion.button>
        </motion.div>
      </main>

      <footer className="py-4 text-center bg-indigo-100 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-center gap-4">
          <motion.button
            onClick={handleNavigateToWMart}
            className="py-2 px-4 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            W-Mart Compass
          </motion.button>
          <motion.button
            onClick={handleNavigateToHospitalCompass}
            className="py-2 px-4 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hospital Compass
          </motion.button>
        </div>
        <div className="container mx-auto mt-4 flex justify-center">
          <motion.button
            onClick={handleNavigateHome}
            className="py-2 px-6 rounded-full text-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default StadiumHome;
