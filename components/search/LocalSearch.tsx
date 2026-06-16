"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();
  const query = searchParam.get("query") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParam.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParam.toString(),
            keysToRemove: ["query"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, router, route, searchParam]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-12.5 items-center grow gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      <Image
        src={imgSrc}
        alt="Search"
        width={16}
        height={16}
        className="cursor-pointer"
      />

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark-400_light-700 border-none shadow-none outline-none"
      />
    </div>
  );
};

export default LocalSearch;
