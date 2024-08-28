"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const HospitalHome: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [patientName, setPatientName] = useState<string>("");
  const [roomSuggestions, setRoomSuggestions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const allRoomOptions = [
    "Cardiology - Room 101",
    "Orthopedics - Room 202",
    "Neurology - Room 303",
    "Pediatrics - Room 404",
    "Dermatology - Room 505",
    "Oncology - Room 606",
    "Radiology - Room 707",
    "Gynecology - Room 808",
    "Urology - Room 909",
    "Ophthalmology - Room 1001",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles([...selectedFiles, ...Array.from(files)]);
      setPatientName("");
      setRoomSuggestions([]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handlePatientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setPatientName(inputValue);

    if (inputValue) {
      const filteredSuggestions = allRoomOptions.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setRoomSuggestions(filteredSuggestions);
    } else {
      setRoomSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPatientName(suggestion);
    setRoomSuggestions([]);
    setSelectedFiles([]);
  };

  const handleFindRoom = async () => {
    if (selectedFiles.length > 0) {
      router.push(`/search?room=documents`);
    } else if (patientName) {
      router.push(`/search?room=${encodeURIComponent(patientName)}`);
    }
  };

  const handleEmergency = () => {
    router.push('/emergency');
  };

  const handleNavigateHome = () => {
    router.push('/');
  };

  const handleNavigateToAirportCompass = () => {
    router.push('/airport-compass');
  };

  const handleNavigateToWMart = () => {
    router.push('/w-mart');
  };

  return (
    <div className="bg-gradient-to-b from-green-100 to-white text-green-900 font-sans min-h-screen relative">
      <Head>
        <title>Hospital Locator - Find Your Room</title>
        <meta name="description" content="Upload a document or enter your name to find your checkup room in the hospital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-3 bg-green-700 bg-opacity-90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold text-yellow-300"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hospital Compass
          </motion.h1>
          <motion.button
            onClick={handleEmergency}
            className="py-2 px-4 rounded bg-red-800 text-white font-semibold hover:bg-red-900 transition shadow-lg ml-4 md:ml-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Emergency Room
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
          <h2 className="text-2xl font-bold mb-2">Upload Appointment or Enter Your Medical Issue</h2>
          <p className="text-lg mb-4 max-w-md">
            Our system will help you find the location of your checkup room.
          </p>
        </motion.div>

        <motion.div 
          className="mb-4 rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/hospital.jpg"
            alt="Instructions on how to find your room"
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
            className="mb-3 cursor-pointer w-full text-center p-3 rounded-full bg-white text-green-900 shadow-md hover:bg-green-100 transition"
          >
            Upload Appointment
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
              placeholder="Enter Medical Issue"
              value={patientName}
              onChange={handlePatientNameChange}
              className="w-full p-3 rounded-full bg-white text-green-900 shadow-md focus:ring-2 focus:ring-green-300 outline-none transition"
            />
            {roomSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white text-black shadow-lg border rounded-lg mt-1 max-h-60 overflow-y-auto">
                {roomSuggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-2 cursor-pointer hover:bg-green-100 transition"
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
            onClick={handleFindRoom}
            className="py-3 px-6 rounded-full text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow-lg"
            disabled={selectedFiles.length === 0 && !patientName}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Find Room
          </motion.button>
        </motion.div>
      </main>

      <footer className="py-4 text-center bg-green-200 bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-center gap-4">
          <motion.button
            onClick={handleNavigateToWMart}
            className="py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            W-Mart Compass
          </motion.button>

          <motion.button
            onClick={handleNavigateToAirportCompass}
            className="py-2 px-4 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Airport Compass
          </motion.button>
        </div>
        <div className="container mx-auto mt-4 flex justify-center">
          <motion.button
            onClick={handleNavigateHome}
            className="py-2 px-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:from-teal-600 hover:to-cyan-600 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Home Page
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default HospitalHome;
