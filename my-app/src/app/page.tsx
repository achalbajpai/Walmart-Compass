"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Head from "next/head";

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white text-gray-900">
      <Head>
        <title>COMPASS - Empowering Your Path</title>
        <meta name="description" content="Empowering Your Path with COMPASS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <motion.h1
          className="text-6xl md:text-8xl font-semibold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}
        >
          COMPASS.AI
        </motion.h1>
        <motion.p
          className="text-2xl md:text-4xl mt-4 text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Empowering Your Path with COMPASS
        </motion.p>

        <div className="mt-12 space-y-6">
          <motion.button
            onClick={() => router.push("/w-mart")}
            className="py-3 px-8 rounded-full text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hover:underline">W-Mart Compass AI</span>
          </motion.button>

          <motion.button
            onClick={() => router.push("/hospital-compass")}
            className="py-3 px-8 rounded-full text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hover:underline">Hospital Compass AI</span>
          </motion.button>

          <motion.button
            onClick={() => router.push("/stadium-compass")}
            className="py-3 px-8 rounded-full text-lg font-semibold bg-purple-600 text-white hover:bg-purple-700 transition shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hover:underline">Stadium Compass AI</span>
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
