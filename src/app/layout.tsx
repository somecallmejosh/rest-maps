import "@/css/globals.css";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Countries Around the World",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} bg-gray-50 font-[#111517] antialiased dark:bg-[#202C36] dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <header className="z-50 bg-white shadow-md dark:bg-[#2B3844] dark:shadow-none">
            <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between p-4">
              <Link
                href="/"
                className="transform-colors rounded p-2 text-xl font-bold duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
              >
                Where in the world?
              </Link>
              <ThemeToggle />
            </div>
          </header>
          <main className="py-6 lg:py-12">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
