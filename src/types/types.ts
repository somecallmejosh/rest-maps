export interface BorderCountry {
  cca3: string;
  name: {
    common: string;
  };
}

export type Currencies = {
  name: string;
  symbol: string;
};

export type Countries = {
  cca3: string;
  flags: { svg: string };
  name: {
    common: string;
    nativeName?: Record<string, NativeNameItem>;
  };
  region: string;
  population: number;
  capital: string[];
};

export interface Country extends Countries {
  borders: string[];
  subRegion: string;
  languages: { [key: string]: string };
  currencies: Record<string, Currencies>;
  tld: string[];
}

export interface CountryCardProps {
  country: Countries;
  index: number;
}

export type NativeNameItem = {
  official: string;
  common: string;
};
