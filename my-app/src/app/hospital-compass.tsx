"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HospitalCompass: React.FC = () => {
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const router = useRouter();

  const handleSearch = () => {
    // Example search logic - replace with actual data fetching
    const dummyData = ["Room 101", "Room 202", "Room 303"];
    const results = dummyData.filter(room => room.includes(roomNumber));
    setSearchResults(results);
  };

  const handleRoomClick = (room: string) => {
    alert(`Room ${room} selected`);
    // Handle room selection logic here
  };

  return (
    <div className="bg-gradient-to-b from-green-100 to-white text-green-900 font-sans min-h-screen relative">
      <Head>
        <title>Hospital Compass</title>
        <meta name="description" content="Find your hospital room location easily" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-3 bg-green-700 bg-opacity-90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-yellow-300">
            Hospital Compass
          </a>
        </div>
      </header>

      <main className="flex flex-col items-center py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold mb-2">Find Your Room</h2>
          <p className="text-lg mb-4 max-w-md">
            Enter your room number to locate your room easily.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Enter Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full p-3 rounded-full bg-white text-green-900 shadow-md focus:ring-2 focus:ring-green-300 outline-none transition mb-4"
          />
          <motion.button
            onClick={handleSearch}
            className="py-3 px-6 rounded-full text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>

          {searchResults.length > 0 && (
            <ul className="mt-4 w-full max-w-md bg-white text-black shadow-lg border rounded-lg">
              {searchResults.map((room, index) => (
                <li
                  key={index}
                  onClick={() => handleRoomClick(room)}
                  className="p-2 cursor-pointer hover:bg-green-100 transition"
                >
                  {room}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </main>

      <footer className="py-4 text-center bg-green-200 bg-opacity-50 backdrop-blur-sm">
        <p>&copy; 2024 Hospital Compass. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HospitalCompass;
