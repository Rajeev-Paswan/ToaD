"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "./components/Header";
import { ReduxProvider } from "./lib/ReduxProvider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    preload: true,
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <ReduxProvider>
                    <div className="h-svh flex flex-col gap-4 overflow-hidden">
                        <Header />
                        {children}
                        <div className="fixed top-0 right-0 m-4">
                            <Toaster />
                        </div>
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}
