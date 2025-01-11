type DataListProps<T> = {
  data?: Record<string, T> | T[];
  getValue: (value: T, key: string) => string;
};

export default function DataList<T>({ data, getValue }: DataListProps<T>) {
  if (!data) return null;

  const entries = Object.entries(data);

  return (
    <ul className="flex flex-wrap gap-x-1">
      {entries.map(([key, value], index) => (
        <li key={key}>
          {getValue(value, key)}
          {data && index < entries.length - 1 ? "," : ""}
        </li>
      ))}
    </ul>
  );
}
