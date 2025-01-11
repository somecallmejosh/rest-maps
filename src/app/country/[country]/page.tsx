"use client";
import BackLink from "@/components/BackLink";
import DataList from "@/components/DataList";
import Image from "next/image";
import Link from "next/link";
import NoResults from "@/components/NoResults";
import useSWR from "swr";
import {
  DefinitionList,
  DefinitionListItem,
} from "@/components/DefinitionList";
import { LoadingIcon } from "@/components/Icons";
import { numberToLocale } from "@/utils/numberUtils";
import { useParams } from "next/navigation";

type NativeNameItem = {
  official: string;
  common: string;
};

type Currencies = {
  name: string;
  symbol: string;
};

interface Country {
  cca3: string;
  flags: {
    svg: string;
  };
  name: {
    common: string;
    nativeName: Record<string, NativeNameItem>;
  };
  borders: string[];
  region: string;
  subRegion: string;
  population: string;
  capital: string[];
  languages: { [key: string]: string };
  currencies: Record<string, Currencies>;
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
              <div className="mb-12 grid gap-20 lg:grid-cols-2">
                <DefinitionList>
                  <DefinitionListItem label="Native Name">
                    <DataList
                      data={mainCountry?.name?.nativeName}
                      getValue={(value) => value.common}
                    />
                  </DefinitionListItem>
                  {mainCountry?.population && (
                    <DefinitionListItem
                      label="Population"
                      text={numberToLocale(mainCountry?.population)}
                    />
                  )}
                  {mainCountry?.region && (
                    <DefinitionListItem
                      label="Region"
                      text={mainCountry.region}
                    />
                  )}
                  {mainCountry?.subRegion && (
                    <DefinitionListItem
                      label="Sub Region"
                      text={numberToLocale(mainCountry?.subRegion)}
                    />
                  )}
                  {mainCountry?.capital && (
                    <DefinitionListItem
                      label="Capital"
                      text={mainCountry?.capital.join(", ")}
                    />
                  )}
                </DefinitionList>
                <DefinitionList>
                  {mainCountry?.tld && (
                    <DefinitionListItem label="Top Level Domain">
                      <DataList
                        data={mainCountry?.tld}
                        getValue={(value) => value}
                      />
                    </DefinitionListItem>
                  )}
                  {mainCountry?.currencies && (
                    <DefinitionListItem label="Currencies">
                      <DataList
                        data={mainCountry?.currencies}
                        getValue={(value) => value.name}
                      />
                    </DefinitionListItem>
                  )}
                  {mainCountry?.languages && (
                    <DefinitionListItem label="Languages">
                      <DataList
                        data={mainCountry?.languages}
                        getValue={(value) => value}
                      />
                    </DefinitionListItem>
                  )}
                </DefinitionList>
              </div>
              {borderCodes && (
                <DefinitionList>
                  <DefinitionListItem label="Border Countries">
                    <ul className="flex flex-wrap gap-x-2 gap-y-4 pt-2 lg:pt-0">
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
                  </DefinitionListItem>
                </DefinitionList>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
