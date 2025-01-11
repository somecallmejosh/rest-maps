"use client";
import BackLink from "@/components/BackLink";
import DataList from "@/components/DataList";
import Image from "next/image";
import Link from "next/link";
import NoResults from "@/components/NoResults";
import useSWR from "swr";
import { LoadingIcon } from "@/components/Icons";
import { numberToLocale } from "@/utils/numberUtils";
import { useParams } from "next/navigation";

interface Country {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  borders: string[];
  region: string;
  subRegion: string;
  population: string;
  capital: string[];
  languages: { [key: string]: string };
  currencies: Record<string, { name: string; symbol: string }>;
  tld: string[];
}

interface BorderCountry {
  cca3: string;
  name: {
    common: string;
  };
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<Country> =>
  fetch(...args)
    .then((res) => res.json())
    .then((data) => data[0]);

const borderFetcher = (
  ...args: [RequestInfo, RequestInit?]
): Promise<BorderCountry[]> =>
  fetch(...args)
    .then((res) => res.json())
    .then((data) => data);

export default function Country() {
  const params = useParams();
  const countryId = params.country;

  const { data: mainCountry, error: mainError } = useSWR(
    `https://restcountries.com/v3.1/alpha?codes=${countryId}&fields=cca3,flags,name,common,region,population,capital,borders,languages,currencies,tld,subregion`,
    fetcher,
  );

  const borderCodes = mainCountry?.borders?.length
    ? mainCountry.borders.join(",")
    : null;

  const { data: borderCountry } = useSWR(
    borderCodes
      ? `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=cca3,name`
      : null,
    borderFetcher,
  );

  if (mainError) return <NoResults />;
  if (!mainCountry) return <LoadingIcon />;

  return (
    <>
      {mainCountry ? (
        <div className="mx-auto w-full max-w-[1280px] space-y-6 p-4 lg:space-y-12">
          <BackLink href="/">Back</BackLink>
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-32">
            {mainCountry?.flags?.svg && (
              <div>
                <div className="aspect-[35/26]">
                  <Image
                    src={mainCountry?.flags?.svg}
                    alt={`${mainCountry?.name?.common} flag`}
                    width={300}
                    height={200}
                    className="size-full rounded-lg object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20200'%3E%3C/svg%3E"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="mb-6 text-3xl font-bold">
                {mainCountry?.name?.common}
              </h1>
              <ul className="mb-12 list-none columns-2 space-y-2 text-sm">
                {mainCountry?.region && (
                  <li>
                    <strong>Region</strong>: {mainCountry?.region}
                  </li>
                )}
                {mainCountry?.subRegion && (
                  <li>
                    <strong>Sub Region</strong>: {mainCountry?.subRegion}
                  </li>
                )}
                {mainCountry?.population && (
                  <li>
                    <strong>Population</strong>:{" "}
                    {numberToLocale(mainCountry?.population)}
                  </li>
                )}
                {mainCountry?.capital && (
                  <li>
                    <strong>Capital</strong>: {mainCountry?.capital}
                  </li>
                )}
                <li className="break-after-column">
                  <div className="flex gap-1">
                    <p>
                      <strong>Languages</strong>:
                    </p>
                    <DataList
                      data={mainCountry?.languages}
                      getValue={(value) => value}
                    />
                  </div>
                </li>
                <li className="flex gap-1">
                  <p>
                    <strong>Currencies</strong>:
                  </p>
                  <DataList
                    data={mainCountry?.currencies}
                    getValue={(value) => value.name}
                  />
                </li>
                <li className="flex flex-wrap gap-1">
                  <p>
                    <strong>Top Level Domain</strong>:
                  </p>
                  <DataList
                    data={mainCountry?.tld}
                    getValue={(value) => value}
                  />
                </li>
              </ul>
              {borderCodes && (
                <div className="flex flex-wrap gap-2">
                  <p>
                    <strong>Border Countries</strong>:
                  </p>
                  <ul className="flex flex-wrap gap-x-2 gap-y-4">
                    {borderCountry?.map((bc: BorderCountry) => (
                      <li key={bc?.cca3}>
                        <Link
                          className="rounded-md bg-white px-2 py-1 shadow transition-colors duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:bg-[#2B3844] dark:text-white dark:hover:bg-[#3E4C59]"
                          href={`/country/${bc?.cca3}`}
                        >
                          {bc?.name?.common}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
