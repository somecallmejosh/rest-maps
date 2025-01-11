import { FrownyFaceIcon } from "./Icons";

export default function NoResults() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col justify-center gap-6 space-y-6 px-4">
      <div className="mx-auto flex w-full max-w-48 justify-center">
        <FrownyFaceIcon className="size-full shrink-0 animate-pulse lg:size-full" />
      </div>
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-black lg:text-6xl">Woah, Nelly!!</h1>
        <p className="mx-auto max-w-[30ch] text-lg lg:text-2xl">
          We couldn&apos;t find any countries that match your search criteria.
        </p>
      </div>
    </div>
  );
}
