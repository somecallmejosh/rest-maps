"use client";
import Image from "next/image";
import Link from "next/link";
import { numberToLocale } from "@/utils/numberUtils";

interface Country {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  region: string;
  population: number;
  capital: string[];
}

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <li
      key={country.cca3}
      className="relative rounded-lg border border-transparent bg-white shadow-md transition-all duration-200 hover:border-gray-500 dark:bg-[#2B3844] dark:hover:border-gray-500"
    >
      <div className="aspect-[16.5/10]">
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          width={50}
          height={30}
          className="h-full w-full rounded-t-lg object-cover"
        />
      </div>
      <div className="space-y-1 rounded-b-lg px-6 pb-10 pt-8">
        <h2 className="text-xl font-bold">{country.name.common}</h2>
        <p>
          <span className="font-semibold">Region</span>: {country.region}
        </p>
        <p>
          <span className="font-semibold">Population</span>:{" "}
          {numberToLocale(country.population)}
        </p>
        <p>
          <span className="font-semibold">Capital</span>:{" "}
          {country.capital.join(", ")}
        </p>
      </div>
      <Link
        href={`/country/${country.cca3}`}
        className="absolute inset-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500"
      >
        <div className="sr-only">Read more about {country.name.common}</div>
      </Link>
    </li>
  );
}
