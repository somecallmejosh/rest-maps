"use client";
import { Suspense } from "react";
import MyPageContent from "./MyPageContent"; // <— separate file
import { LoadingIcon } from "@/components/Icons";

export default function Page() {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <MyPageContent />
    </Suspense>
  );
}
