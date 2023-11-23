"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, useCallback } from "react";
import { RiSearchLine } from "react-icons/ri";
import debounce from "lodash/debounce";

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams?.get("search") ?? "");

  const debouncedSearch = useCallback(
    debounce((value) => {
      const params = new URLSearchParams(searchParams as any);
      params.set("search", value);
      router.push(`${pathname}?${params.toString()}`);
    }, 1000),
    []
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative">
      <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 transform" />

      <input
        type="text"
        placeholder="Szukaj ogłszeń ..."
        onChange={handleSearch}
        value={value}
        className="input-bordered input w-full max-w-xs pl-12"
      />
    </div>
  );
};
