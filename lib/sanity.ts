import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  apiVersion: "2024-01-01", // Use today's date or your preferred version
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

// Define proper types for Sanity image sources
export interface SanityImageSource {
  asset: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ queries for blog posts
export const blogQuery = `
  *[_type == "blog" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      "image": image.asset->url,
      role
    },
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{
      title,
      slug,
      color
    },
    tags,
    featured
  }
`;

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    color
  }
`;

export const filteredBlogQuery = `
  {
    "posts": *[_type == "blog" && publishedAt <= now() &&
      (!defined($category) || count(categories[@->slug.current == $category]) > 0) &&
      (!defined($q) || title match $q || excerpt match $q)
    ] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      "author": author->{ name, "image": image.asset->url, role },
      "mainImage": mainImage.asset->url,
      "categories": categories[]->{ title, slug, color },
      tags,
      featured
    },
    "categories": *[_type == "category"] | order(title asc) { _id, title, slug, color }
  }
`;

export const featuredBlogQuery = `
  *[_type == "blog" && featured == true && publishedAt <= now()] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      "image": image.asset->url,
      role
    },
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{
      title,
      slug,
      color
    }
  }
`;

export const singleBlogQuery = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "author": author->{
      name,
      "image": image.asset->url,
      role,
      bio
    },
    "mainImage": mainImage.asset->url,
    "categories": categories[]->{
      title,
      slug,
      color
    },
    tags,
    body,
    seo
  }
`;

export const approvedCommentsForPostQuery = `
  *[_type == "comment" && approved == true && post._ref == $postId] | order(createdAt desc) {
    _id,
    name,
    message,
    createdAt
  }
`;

export const likesCountForPostQuery = `count(*[_type == "like" && post._ref == $postId])`;
