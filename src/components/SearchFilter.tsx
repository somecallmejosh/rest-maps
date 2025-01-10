"use client";
import { SearchIcon } from "@/components/Icons";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <div className="justfy-start relative flex h-12 w-full items-center rounded-lg bg-white pl-4 shadow-md dark:bg-[#2B3844]">
      <SearchIcon className="relative z-10" />
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for a country..."
        className="transform-colors absolute inset-0 rounded bg-transparent p-2 pl-10 pr-4 duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
      />
    </div>
  );
}
