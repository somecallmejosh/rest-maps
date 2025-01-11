"use client";
import Image from "next/image";
import Link from "next/link";
import { DefinitionListItemCard } from "@/components/DefinitionList";
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
  index: number;
}

export default function CountryCard({ country, index }: CountryCardProps) {
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
          priority={index < 1}
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20200'%3E%3C/svg%3E"
        />
      </div>
      <div className="space-y-2 rounded-b-lg px-6 pb-10 pt-8">
        <h2 className="text-xl font-bold">{country.name.common}</h2>
        <dl className="space-y-1.5">
          <DefinitionListItemCard label="Region" text={country.region} />
          <DefinitionListItemCard
            label="Population"
            text={numberToLocale(country.population)}
          />
          <DefinitionListItemCard
            label="Capital"
            text={country.capital.join(", ")}
          />
        </dl>
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
