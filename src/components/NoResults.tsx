import BackLink from "./BackLink";
import { GlobeIcon } from "./Icons";

export default function NoResults() {
  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6 px-4">
      <h1 className="flex max-w-[40ch] gap-4 rounded-lg bg-gray-100 p-4 text-3xl font-bold dark:bg-black/10">
        <GlobeIcon className="size-14 shrink-0" /> Oops, we couldn&apos;t find
        anything that matched your search request.
      </h1>
      <BackLink href="/" forceReload>
        Go Back and Try Another Search
      </BackLink>
    </div>
  );
}
