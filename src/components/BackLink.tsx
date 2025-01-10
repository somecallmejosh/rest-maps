import Link from "next/link";
import { BackArrowIcon } from "@/components/Icons";
import { ReactNode } from "react";

type MyLinkProps = {
  href: string;
  forceReload?: boolean;
  children: ReactNode;
  className?: string;
};

export default function BackLink({
  href,
  forceReload = false,
  children,
  ...props
}: MyLinkProps) {
  if (forceReload) {
    return (
      <a
        href={href}
        {...props}
        className="transform-colors inline-flex items-center gap-2 rounded p-2 duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
      >
        <BackArrowIcon />
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      {...props}
      className="transform-colors inline-flex items-center gap-2 rounded p-2 duration-200 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-500 dark:hover:bg-[#3E4C59]"
    >
      <BackArrowIcon />
      {children}
    </Link>
  );
}
