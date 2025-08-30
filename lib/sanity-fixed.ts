import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kgfvpijk",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

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
    "categories": categories[]->{ title, slug, color }
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
    "categories": categories[]->{ title, slug, color },
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

// GROQ queries for events
export const eventsQuery = `
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    "image": image.asset->url,
    category,
    featured,
    registrationLink,
    maxAttendees,
    currentAttendees,
    isRegistrationRequired,
    organizer,
    contactInfo,
    tags
  }
`;

export const upcomingEventsQuery = `
  *[_type == "event" && startDate > now()] | order(startDate asc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    "image": image.asset->url,
    category,
    featured,
    registrationLink,
    maxAttendees,
    currentAttendees,
    isRegistrationRequired,
    organizer,
    contactInfo,
    tags
  }
`;

export const pastEventsQuery = `
  *[_type == "event" && startDate <= now()] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    "image": image.asset->url,
    category,
    featured,
    registrationLink,
    maxAttendees,
    currentAttendees,
    isRegistrationRequired,
    organizer,
    contactInfo,
    tags
  }
`;

export const eventCategoriesQuery = `
  *[_type == "event"] | order(category asc) | {
    "categories": group(category) {
      category: key
    }
  }[0]
`;

export const featuredEventsQuery = `
  *[_type == "event" && featured == true && startDate > now()] | order(startDate asc)[0...3] {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    "image": image.asset->url,
    category,
    featured,
    registrationLink,
    maxAttendees,
    currentAttendees,
    isRegistrationRequired,
    organizer,
    tags
  }
`;

// GROQ queries for departments
export const departmentsQuery = `
  *[_type == "department"] | order(name asc) {
    _id,
    name,
    slug,
    state,
    branch,
    description,
    leader,
    leaderDetails,
    activities,
    membersCount,
    maxMembers,
    "image": image.asset->url,
    meetingTime,
    meetingDay,
    isOpen,
    tags
  }
`;

export const departmentsByStateQuery = `
  *[_type == "department" && state == $state] | order(name asc) {
    _id,
    name,
    slug,
    state,
    branch,
    description,
    leader,
    leaderDetails,
    activities,
    membersCount,
    maxMembers,
    "image": image.asset->url,
    meetingTime,
    meetingDay,
    isOpen,
    tags
  }
`;

// Working states query - proper GROQ syntax
export const statesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    }
  }[0]
`;

// Alternative simple states query for testing
export const simpleStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    }
  }[0]
`;

// Ultra simple states query - no group function
export const ultraSimpleStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": distinct(state)
  }[0]
`;

// Most basic states query possible
export const basicStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": distinct(state)
  }
`;

// Alternative approach - get states directly
export const directStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": distinct(state)
  }
`;

// Simple approach - get all departments and extract states on client
export const clientSideStatesQuery = `
  *[_type == "department"] | order(state asc) {
    state
  }
`;

// GROQ queries for audio messages
export const audioMessagesQuery = `
  *[_type == "audioMessage" && isPublished == true] | order(date desc) {
    _id,
    title,
    speaker,
    date,
    description,
    googleDriveLink,
    duration,
    category,
    tags,
    downloadCount
  }
`;

export const featuredAudioMessagesQuery = `
  *[_type == "audioMessage" && isPublished == true] | order(date desc)[0...6] {
    _id,
    title,
    speaker,
    date,
    description,
    googleDriveLink,
    duration,
    category,
    tags,
    downloadCount
  }
`;

export const audioMessagesByCategoryQuery = `
  *[_type == "audioMessage" && isPublished == true && category == $category] | order(date desc) {
    _id,
    title,
    speaker,
    date,
    description,
    googleDriveLink,
    duration,
    category,
    tags,
    downloadCount
  }
`;

export const audioMessageCategoriesQuery = `
  *[_type == "audioMessage" && isPublished == true] | order(category asc) | {
    "categories": group(category) {
      category: key
    }
  }[0]
`;
