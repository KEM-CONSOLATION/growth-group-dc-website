"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import type { BlogPostCard } from "@/src/lib/content";

interface BlogCardProps {
  post: BlogPostCard;
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  const roleLabel = (post.author.role || "contributor").replace(/-/g, " ");

  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        {post.mainImage ? (
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-100 to-brand-100 flex items-center justify-center">
            <div className="text-4xl text-gray-400">📝</div>
          </div>
        )}

        {post.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            ⭐ Featured
          </div>
        )}

        <div className="absolute bottom-4 left-4 flex gap-2">
          {post.categories?.slice(0, 2).map((category) => (
            <span
              key={category.slug}
              className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
              style={{ backgroundColor: category.color || "#002D8F" }}
            >
              {category.title}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">{roleLabel}</p>
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(post.publishedAt)}
          </span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
