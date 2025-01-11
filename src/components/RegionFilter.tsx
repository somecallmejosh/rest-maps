"use client";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/Icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface RegionFilterProps {
  regionButtonLabel: string;
  region: string;
  onRegionChange: (region: string) => void;
  regions?: string[];
}

export default function RegionFilter({
  regionButtonLabel,
  region,
  regions = ["Africa", "Americas", "Antarctic", "Asia", "Europe", "Oceania"],
}: RegionFilterProps) {
  return (
    <Menu>
      <MenuButton className="transform-all relative flex h-12 w-full items-center rounded-lg bg-white px-4 text-left shadow-md duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:bg-[#2B3844]">
        <ChevronDownIcon className="absolute right-4 z-10 dark:text-gray-400" />
        <span>{regionButtonLabel}</span>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-20 w-1/3 origin-top-left space-y-1 rounded-xl border bg-white p-1 px-4 py-6 text-sm/6 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-[#2B3844] dark:bg-[#2B3844] lg:w-52 lg:origin-top-right"
      >
        {regions.map((region) => (
          <MenuItem key={region}>
            <Link
              className="block w-full text-left hover:underline"
              href={`?region=${region}`}
            >
              {region}
            </Link>
          </MenuItem>
        ))}
        {region !== "" && (
          <MenuItem>
            <Link
              className="block w-full text-left hover:text-blue-500 hover:underline"
              href={`/`}
            >
              All
            </Link>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
