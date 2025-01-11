"use client";
import CountryCard from "@/components/CountryCard";
import NoResults from "@/components/NoResults";
import RegionFilter from "@/components/RegionFilter";
import useSWR from "swr";
import { LoadingIcon, SearchIcon } from "@/components/Icons";
import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Country = {
  cca3: string;
  flags: { svg: string };
  name: { common: string };
  region: string;
  population: number;
  capital: string[];
};

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<Country[]> =>
  fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not OK");
    }
    return res.json();
  });

  const CHUNK_SIZE = 12;

  export default function MyPageContent() {
    const [regionButtonLabel, setRegionButtonLabel] =
      useState("Filter By Region");
    const [region, setRegion] = useState("");

    const searchParams = useSearchParams();
    const regionParam = searchParams.get("region");
    const initialSearchParam = searchParams.get("search") || "";
    const [search, setSearch] = useState(initialSearchParam);

    const router = useRouter();
    const fields = "?fields=cca3,flags,name,region,population,capital";
    const [debouncedSearch] = useDebounce(search, 400);

    const [page, setPage] = useState(1);
    const [displayedCountries, setDisplayedCountries] = useState<Country[]>([]);

    const handleRegionChange = (newRegion: string) => {
      setRegionButtonLabel(newRegion || "Filter By Region");
      setRegion(newRegion);
      const params = new URLSearchParams(searchParams.toString());
      if (newRegion) {
        params.set("region", newRegion);
      } else {
        params.delete("region");
      }
      router.push(`?${params.toString()}`);
    };

    useEffect(() => {
      if (regionParam) {
        setRegionButtonLabel(regionParam);
        setRegion(regionParam);
        setSearch("");
      } else {
        setRegionButtonLabel("Filter By Region");
        setRegion("");
      }
    }, [regionParam]);

    useEffect(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
        params.delete("region");
        setRegion("");
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, [debouncedSearch, router, searchParams]);

    const returnEndpoint = () => {
      if (regionParam) {
        return `https://restcountries.com/v3.1/region/${regionParam}${fields}`;
      } else if (debouncedSearch) {
        return `https://restcountries.com/v3.1/name/${debouncedSearch}${fields}`;
      } else {
        return `https://restcountries.com/v3.1/all${fields}`;
      }
    };

    const { data, error } = useSWR(returnEndpoint, fetcher, {
      keepPreviousData: true,
    });

    useEffect(() => {
      if (data && Array.isArray(data)) {
        setPage(1);
      }
    }, [data]);

    useEffect(() => {
      if (data && Array.isArray(data)) {
        const slice = data.slice(0, page * CHUNK_SIZE);
        setDisplayedCountries(slice);
      }
    }, [data, page]);

    const handleLoadMore = () => {
      setPage((prev) => prev + 1);
    };

    if (!data) return <LoadingIcon />;

    return (
      <div className="space-y-6 lg:space-y-12">
        <div className="sticky top-0 z-20 bg-opacity-90 bg-gradient-to-b from-gray-50 to-transparent py-4 backdrop-blur-3xl dark:from-[#202C36] dark:to-transparent">
          <div className="mx-auto flex w-full max-w-[1280px] flex-wrap justify-between gap-6 px-4 lg:gap-2">
            <div className="justfy-start relative flex h-12 w-full items-center rounded-lg bg-white pl-4 shadow-md dark:bg-[#2B3844] lg:w-2/5">
              <SearchIcon className="relative z-10" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a country..."
                className="transform-colors absolute inset-0 rounded bg-transparent p-2 pl-10 pr-4 duration-200 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
              />
            </div>
            <div className="relative w-1/2 lg:w-1/3">
              <RegionFilter
                regionButtonLabel={regionButtonLabel}
                region={region}
                onRegionChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
        {error && <NoResults />}
        {!error && (
          <>
            <ul className="relative z-0 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-20">
              {displayedCountries.map((country, index) => (
                <CountryCard
                  key={country.cca3}
                  country={country}
                  index={index}
                />
              ))}
            </ul>
            {displayedCountries.length < data.length && (
              <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between px-4">
                <p className="text-sm">
                  Showing <strong>{displayedCountries.length}</strong> of{" "}
                  <strong>{data.length}</strong> coutries
                </p>
                {displayedCountries.length + CHUNK_SIZE <= data.length && (
                  <button
                    onClick={handleLoadMore}
                    className="transform-colors rounded bg-gray-100 px-4 py-2 font-bold duration-200 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
                  >
                    Load the next {CHUNK_SIZE} countries
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
