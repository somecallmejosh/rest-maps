"use client";
import MyPageContent from "./MyPageContent";
import { LoadingIcon } from "@/components/Icons";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <MyPageContent />
    </Suspense>
  );
}
