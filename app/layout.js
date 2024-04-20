"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "./components/Header";
import { ReduxProvider } from "./redux/ReduxProvider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    preload: true,
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} min-h-screen`}>
                <ReduxProvider>
                    <Header />
                    {children}
                    <Toaster />
                </ReduxProvider>
            </body>
        </html>
    );
}
