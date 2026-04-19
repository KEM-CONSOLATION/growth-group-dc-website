import {
  fetchBlogPostBySlug,
  fetchApprovedComments,
  fetchLikesCount,
} from "@/src/lib/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import { LikeButton } from "./LikeButton";
import { CommentForm } from "./CommentForm";
import { formatDistanceToNow } from "date-fns";
import { Header } from "../../../components/Header";
import { MarkdownContent } from "@/src/components/MarkdownContent";

interface Comment {
  id: string;
  name: string;
  message: string;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  const [comments, likesCount] = await Promise.all([
    fetchApprovedComments(post.id),
    fetchLikesCount(post.id),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <Header />

      <div className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 text-white">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {post.categories && post.categories.length > 0 && (
              <div className="flex justify-center gap-2 mb-6">
                {post.categories.map((category) => (
                  <span
                    key={category.slug}
                    className="px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                    style={{
                      backgroundColor: category.color || "#002D8F",
                    }}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-4">
              {post.author.image ? (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white/20"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full flex items-center justify-center text-white text-lg font-semibold border-2 border-white/20">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-left">
                <p className="font-semibold text-lg">{post.author.name}</p>
                <p className="text-white/90 capitalize">
                  {(post.author.role || "contributor").replace(/-/g, " ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {post.mainImage && (
          <div className="mb-12">
            <Image
              src={post.mainImage}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-gray-500">
              Published {formatDate(post.publishedAt)}
            </span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-end">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <article>
          <MarkdownContent content={post.body || ""} />
        </article>

        {post.author.bio?.trim() && (
          <div className="mt-16 p-8 bg-gradient-to-r from-brand-50 to-brand-50 rounded-2xl border border-brand-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              About {post.author.name}
            </h3>
            <MarkdownContent content={post.author.bio} />
          </div>
        )}

        <div className="mt-10">
          <LikeButton postId={post.id} initialCount={likesCount} />
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((c: Comment) => (
                <li key={c.id} className="p-4 bg-white rounded-lg border">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {c.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8">
          <CommentForm postId={post.id} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-brand-600 to-brand-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
          <p className="text-xl text-white/90 mb-8">
            Get notified when we publish new devotionals and blog posts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
            <button className="bg-white text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
