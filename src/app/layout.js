import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Baadcow clothing",
  description: "the best clothes in the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/baadcow.jpg" />
          {/* iPhone support */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/favic180.ico" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/favic152.ico" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/favic167.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
