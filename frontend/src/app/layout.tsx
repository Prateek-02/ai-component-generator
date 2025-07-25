import "./globals.css";
import type { ReactNode } from "react";
import TokenInitializer from "@/components/TokenInitializer";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-50 min-h-screen">
                <TokenInitializer /> {/* ✅ Initialize token on client */}
                <header className="w-full py-4 bg-blue-600 text-white text-center text-xl font-bold shadow">
                    AI Component Generator
                </header>
                <main className="max-w-4xl mx-auto py-8 px-2">{children}</main>
            </body>
        </html>
    );
}
