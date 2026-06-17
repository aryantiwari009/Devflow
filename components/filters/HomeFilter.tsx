"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filter = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommended", value: "Recommended" },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const router = useRouter();
  const [active, setActive] = useState(filterParam || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden  flex-wrap gap-3 sm:flex">
      {filter.map((filter) => (
        <Button
          key={filter.name}
          onClick={() => handleTypeClick(filter.value)}
          className={cn(
            `body-md rounded-lg ox-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-200 dark:bg-dark-400 dark:text-light-500 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
