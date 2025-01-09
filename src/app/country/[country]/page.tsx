"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { LoadingIcon } from "@/components/Icons";
import BackLink from "@/components/BackLink";

type GenericObject = Record<string, string>;

interface GenericValuesListProps {
  data: GenericObject | undefined;
}

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
  languages: { [key: string]: string } | {};
  currencies: Record<string, { name: string; symbol: string }> | {};
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

const numberToLocale = (number: string) => {
  return Number(number).toLocaleString();
};
export default function About() {
  const params = useParams();
  const countryId = params.country;

  const { data: mainCountry, error: mainError } = useSWR(
    `https://restcountries.com/v3.1/alpha?codes=${countryId}&fields=cca3,flags,name,common,region,population,capital,borders,languages,currencies,tld,subregion`,
    fetcher,
  );

  const borderCodes = mainCountry?.borders?.join(",");
  const { data: borderCountry, error: borderError } = useSWR(
    `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=cca3,name`,
    borderFetcher,
  );

  if (mainError) return <div>Failed to load</div>;
  if (!mainCountry) return <LoadingIcon />;

  function GenericValuesList({ data }: GenericValuesListProps) {
    return (
      <ul className="flex flex-wrap gap-1">
        {Object.entries(data || {}).map(([key, value], index) => (
          <li key={key}>
            {value}
            {
              // Add a comma after each value except the last one
              data && index < Object.keys(data).length - 1 ? "," : ""
            }
          </li>
        ))}
      </ul>
    );
  }

  function CurrenciesList({
    currencies,
  }: {
    currencies: Record<string, { name: string; symbol: string }>;
  }) {
    if (!currencies) return null;

    return (
      <ul className="flex flex-wrap gap-1">
        {Object.entries(currencies).map(([code, currency], index) => (
          <li key={code}>
            {currency.name}
            {currencies && index < Object.keys(currencies).length - 1
              ? ","
              : ""}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      {mainCountry ? (
        <div className="mx-auto w-full max-w-[1280px] space-y-12 p-4">
          <BackLink href="/">Back</BackLink>
          <div className="relative grid gap-12 overflow-auto lg:grid-cols-2 lg:items-center lg:gap-32">
            <div>
              <div className="aspect-[35/26]">
                <Image
                  src={mainCountry?.flags?.svg || ""}
                  alt={mainCountry?.name?.common || "Country flag"}
                  width={300}
                  height={200}
                  className="size-full rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="mb-6 text-3xl font-bold">
                {mainCountry?.name?.common}
              </h1>
              <div className="mb-12 columns-2 space-y-2 text-sm">
                {mainCountry?.region && (
                  <p>
                    <strong>Region</strong>: {mainCountry?.region}
                  </p>
                )}
                {mainCountry?.subRegion && (
                  <p>
                    <strong>Sub Region</strong>: {mainCountry?.subRegion}
                  </p>
                )}
                {mainCountry?.population && (
                  <p>
                    <strong>Population</strong>:{" "}
                    {numberToLocale(mainCountry?.population)}
                  </p>
                )}
                {mainCountry?.capital && (
                  <p>
                    <strong>Capital</strong>: {mainCountry?.capital}
                  </p>
                )}
                <div className="break-after-column">
                  <div className="flex gap-1">
                    <p>
                      <strong>Languages</strong>:
                    </p>
                    <GenericValuesList data={mainCountry?.languages} />
                  </div>
                </div>
                <div className="flex gap-1">
                  <p>
                    <strong>Currencies</strong>:
                  </p>
                  <CurrenciesList currencies={mainCountry?.currencies} />
                </div>
                <div className="flex flex-wrap gap-1">
                  <p>
                    <strong>Top Level Domain</strong>:
                  </p>
                  <ul className=".flex.flex-wrap.gap-1">
                    {mainCountry?.tld?.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {borderCodes && (
                <div className="flex flex-wrap gap-2">
                  <div>
                    <p>
                      <strong>Border Countries</strong>:
                    </p>
                  </div>
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
