import type { Metadata } from "next";
import Link from "next/link";
import { request } from "@/lib/datocms";
import { draftMode } from "next/headers";
import { toNextMetadata } from "react-datocms";

// Removed fs, gray-matter, styled-components imports

// --- DatoCMS Query for Blog Page ---

const BLOG_PAGE_QUERY = `
  query BlogPage {
    allPosts(first: 20, orderBy: _firstPublishedAt_DESC) { # Fetching 20 newest posts
      title
      slug
      excerpt
      _firstPublishedAt # Added publish date for display
    }
    page(filter: {slug: {eq: "blog"}}) { # Assuming a "blog" page exists in Dato for SEO
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
    }
    # Removed home and socialMediaSetting as they should be handled by layout
  }
`;

// --- Data Fetching ---

async function getBlogData() {
  const { isEnabled } = await draftMode();
  const data = await request({
    query: BLOG_PAGE_QUERY,
    includeDrafts: isEnabled,
  });
  return data; // Return the whole data object
}

// --- Metadata Generation ---

export async function generateMetadata(): Promise<Metadata> {
  const data: any = await getBlogData();

  // Use SEO data from the "blog" page in DatoCMS if available
  if (data?.page?.seo) {
    return toNextMetadata(data.page.seo);
  }

  // Fallback metadata
  return {
    title: "Blog",
    description: "Latest updates and articles.",
  };
}

// --- Blog Page Component (Server Component) ---

export default async function BlogPage() {
  const data: any = await getBlogData();
  const posts = data?.allPosts || [];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#ffe230]">
        Latest Updates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-blue-950/30 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2 text-gray-100 group-hover:text-white transition-colors">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-[#ffe230] transition-colors duration-200 after:content-[''] after:absolute after:inset-0"
                  >
                    {post.title}
                  </Link>
                </h2>
                {post._firstPublishedAt && (
                  <div className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
                    {new Date(post._firstPublishedAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </div>
                )}
                {post.excerpt && (
                  <p className="text-sm text-gray-300 mb-4 line-clamp-4 flex-grow">
                    {post.excerpt}
                  </p>
                )}
                {!post.excerpt && <div className="flex-grow"></div>}

                <div className="mt-auto pt-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sm font-semibold text-[#ffe230] hover:text-yellow-300 transition-colors duration-200 relative z-10"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}
