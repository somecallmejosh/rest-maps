"use client";
import Image from "next/image";
import Link from "next/link";
import { DefinitionListItemCard } from "@/components/DefinitionList";
import { forwardRef } from "react";
import { numberToLocale } from "@/lib/numberUtils";
import type { CountryCardProps } from "@/types/types";

/**
 * Wrap the component in `forwardRef`, and forward the ref to the <li>.
 * This allows us to do `cardRef.current.focus()` from the parent.
 */
const CountryCard = forwardRef<HTMLAnchorElement, CountryCardProps>(
  ({ country, index }, ref) => {
    return (
      <li className="relative rounded-lg border border-transparent bg-white shadow-md transition-all duration-200 hover:border-gray-500 dark:bg-[#2B3844] dark:hover:border-gray-500">
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
          ref={ref}
          className="absolute inset-0 overflow-hidden rounded-lg transition-all duration-200 focus:outline-2 focus:outline-offset-4 focus:outline-gray-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500"
        >
          <div className="sr-only">Read more about {country.name.common}</div>
        </Link>
      </li>
    );
  },
);

// Required when using forwardRef to name the component properly in React DevTools
CountryCard.displayName = "CountryCard";

export default CountryCard;
