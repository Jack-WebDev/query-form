import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NSFAS | Student & Accommodation Provider Query Form",
  description:
    "Easily submit your questions and queries regarding student services and accommodation. Connect with our team for prompt assistance.",
  icons: {
    icon: "/NSFAS-699x675-1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
