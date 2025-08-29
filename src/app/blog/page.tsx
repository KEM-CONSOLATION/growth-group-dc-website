import { sanityClient, filteredBlogQuery } from "../../../lib/sanity";
import { BlogCard } from "@/src/components/BlogCard";
import { SearchBar } from "@/src/components/SearchBar";
import { CategoryFilter } from "@/src/components/CategoryFilter";
import { Header } from "@/src/components/Header";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  mainImage: string;
  categories: Array<{
    title: string;
    slug: { current: string };
    color: string;
  }>;
  tags: string[];
  featured: boolean;
}

interface BlogData {
  posts: BlogPost[];
  categories: {
    title: string;
    slug: { current: string };
    color: string;
    _id: string;
  }[];
}

async function getBlogPosts(params: {
  q?: string;
  category?: string;
}): Promise<BlogData> {
  try {
    const data = await sanityClient.fetch(filteredBlogQuery, {
      q: params.q ? `*${params.q}*` : null,
      category: params.category || null,
    });
    return data as BlogData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], categories: [] };
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;

  const { posts, categories } = await getBlogPosts({
    q: params?.q,
    category: params?.category,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Growth Group Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover inspiring teachings, testimonies, and spiritual insights
              from our church community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <SearchBar defaultValue={params?.q || ""} />
          <CategoryFilter
            categories={categories}
            selected={params?.category || ""}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-500">
              Check back soon for inspiring content from our church community.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
          <p className="text-xl text-blue-100 mb-8">
            Get notified when we publish new devotionals and blog posts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
