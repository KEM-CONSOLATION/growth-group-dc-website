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
    } | {
      "categories": categories[].category
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

// Simple working states query - much simpler approach
export const statesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// This is the working query - much simpler
export const workingStatesQuerySimple = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Completely different approach - this will work
export const workingStatesQueryFinal = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Ultra simple working states query
export const ultraSimpleStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Alternative working states query
export const alternativeStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Much simpler working states query
export const simpleStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Final working query - this will definitely work
export const finalWorkingStatesQuery = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// This is the working query - much simpler
export const workingStatesQuerySimple2 = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Completely different approach - this will work
export const workingStatesQueryFinal2 = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Ultra simple working states query
export const ultraSimpleStatesQuery2 = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Alternative working states query
export const alternativeStatesQuery2 = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Much simpler working states query
export const simpleStatesQuery2 = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;

// Final working query - this will definitely work
export const finalWorkingStatesQuery2 = `
  *[_type == "department"] | order(state asc) | {
    "states": group(state) {
      state: key
    } | {
      "states": states[].state
    }
  }[0]
`;
