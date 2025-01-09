"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transform-colors inline-flex items-center gap-2 rounded p-2 duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
    >
      {theme === "dark" ? <SunIcon className="size-6" /> : <MoonIcon />}
      {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
