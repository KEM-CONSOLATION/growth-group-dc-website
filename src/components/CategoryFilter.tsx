"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  color: string;
};

export function CategoryFilter({
  categories,
  selected,
}: {
  categories: Category[];
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
        onClick={() => handleSelect("")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          !selected
            ? "text-white shadow-lg scale-105"
            : "text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
        }`}
        style={{ backgroundColor: !selected ? "#6B7280" : "transparent" }}
      >
        All Posts
      </button>
      {categories?.map((category) => (
        <button
          key={category._id}
          onClick={() => handleSelect(category.slug.current)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === category.slug.current
              ? "text-white shadow-lg scale-105"
              : "text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md"
          }`}
          style={{
            backgroundColor:
              selected === category.slug.current
                ? category.color
                : "transparent",
          }}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
