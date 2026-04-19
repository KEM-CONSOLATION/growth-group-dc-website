"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { BlogCategory } from "@/src/lib/content";

export function CategoryFilter({
  categories,
  selected,
}: {
  categories: BlogCategory[];
  selected: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!slug) params.delete("category");
    else params.set("category", slug);
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => handleSelect("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !selected
            ? "text-white shadow-lg scale-105"
            : "text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
        }`}
        style={{ backgroundColor: !selected ? "#002D8F" : "transparent" }}
      >
        All Posts
      </button>
      {categories?.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => handleSelect(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === category.slug
              ? "text-white shadow-lg scale-105"
              : "text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
          }`}
          style={{
            backgroundColor:
              selected === category.slug
                ? category.color || "#002D8F"
                : "transparent",
          }}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
