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
    <Menu as="div" className="relative w-full max-w-[12.5rem]">
      <MenuButton className="transform-all relative flex h-[3.5rem] w-full items-center rounded-lg bg-white px-6 text-left shadow-md duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 data-[active]:bg-gray-50 data-[hover]:bg-gray-100 dark:bg-[#2B3844] dark:data-[active]:bg-black/10 dark:data-[hover]:bg-[#3E4C59]">
        <ChevronDownIcon className="absolute right-4 z-10 dark:text-gray-400" />
        <span>{regionButtonLabel}</span>
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-20 w-[12.5rem] origin-top-left space-y-1 rounded-xl bg-white p-1 px-4 pt-6 text-sm/6 shadow-lg transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-[#2B3844] dark:bg-[#2B3844] lg:origin-top-right"
      >
        {regions.map((region) => (
          <MenuItem key={region}>
            <Link
              className="-mx-2 flex rounded px-6 py-1 text-left hover:bg-gray-50 focus:bg-gray-50 data-[focus]:bg-gray-50 dark:hover:bg-black/20 dark:data-[focus]:bg-black/20"
              href={`?region=${region}`}
            >
              {region}
            </Link>
          </MenuItem>
        ))}
        {region !== "" && (
          <MenuItem>
            <Link
              className="-mx-2 flex rounded px-6 py-1 text-left hover:bg-gray-50 focus:bg-gray-50 data-[focus]:bg-gray-50 dark:hover:bg-black/20 dark:data-[focus]:bg-black/20"
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
