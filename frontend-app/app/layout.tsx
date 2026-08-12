import type { Metadata } from "next";
import { Libre_Franklin, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import NavBar from "./components/layout/NavBar";
import { AuthProvider } from "./lib/auth/AuthContext";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CTU Campus Assistant",
  description: "Chat with the AI assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${sourceSans3.variable} h-full antialiased`}
    >
      <body className="flex h-screen flex-col overflow-hidden bg-bg text-text">
        <AuthProvider>
          <NavBar />
          <main className="min-h-0 flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
