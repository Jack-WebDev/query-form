"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Submitted() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-4 shadow">
        <Image
          src={"/NSFAS-699x675-1.png"}
          alt="NSFAS Logo"
          width={100}
          height={100}
        />
        <Image
          src={"/ndt-technologies-web-logo.svg"}
          alt="NDT Logo"
          width={100}
          height={100}
        />
      </div>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="text-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          Submission Successful!
        </h1>
        <p className="text-gray-600 mt-2 text-center">
          Thank you for submitting. We&apos;ve received your information and
          will be in touch shortly.
        </p>
      </motion.div>
    </div>
  );
}
