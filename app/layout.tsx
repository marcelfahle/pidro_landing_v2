import { Inter } from "next/font/google";
import Script from "next/script";
// import { headers } from 'next/headers'; // Remove headers import
import SessionProvider from "@/components/SessionProvider";
import NavbarWrapper from "@/components/NavbarWrapper"; // Import NavbarWrapper
// import Header from "@/components/header"; // Remove Header import
import Footer from "@/components/Footer"; // Import Footer
import "@/styles/globals.css";
// import "./styles/iphone-frame.css"; // Can likely remove if only Header used it

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

// This is the ROOT layout
// It only contains html, body, SessionProvider, and global styles
export default function RootLayout({ children }: RootLayoutProps) {
  // Remove pathname check logic
  // const headersList = headers();
  // const pathname = headersList.get('x-invoke-path') ?? "/";
  // const isHomePage = pathname === '/';

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <Script
          defer
          src="https://plausible.io/js/pa-5EjBdQUI9pVbymcQPSSkB.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
      {/* Apply the base styling to the body tag */}
      <body className="min-h-screen flex flex-col text-gray-200 pb-10 font-sans leading-[1.5] bg-[radial-gradient(circle,rgba(28,103,160,1)_0%,rgba(13,48,75,1)_100%)] [&_a]:text-[#ffe230] [&_a]:no-underline hover:[&_a]:text-yellow-300 [&_nav_a]:text-white hover:[&_nav_a]:text-[#ffe230]">
        {/* SessionProvider wraps everything to make session available */}
        <SessionProvider>
          <NavbarWrapper />
          {/* Remove conditional Header rendering */}
          {/* {isHomePage && <Header />} */}

          {/* Apply layout constraints directly to main */}
          <main className="flex-grow px-4 max-w-6xl mx-auto w-full">
            {children}
          </main>

          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
