import type { Metadata } from "next";
import { request } from "@/lib/datocms";
import { draftMode } from "next/headers";
import { StructuredText, toNextMetadata } from "react-datocms";
import { notFound } from "next/navigation";

// --- DatoCMS Query for Single Post ---

const POST_QUERY = `
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      title
      slug
      _firstPublishedAt
      content {
        value
      }
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`;

// --- Data Fetching ---

async function getPostData(slug: string) {
  const { isEnabled } = await draftMode();
  const data: any = await request({
    query: POST_QUERY,
    variables: { slug },
    includeDrafts: isEnabled,
  });
  return data?.post;
}

// --- Static Path Generation ---

export async function generateStaticParams() {
  const data: any = await request({
    query: `{ allPosts(first: 100) { slug } }`,
  });

  return data.allPosts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// --- Metadata Generation ---

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return toNextMetadata(post.seo || []);
}

// --- Post Page Component (Server Component) ---

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params object as per Next.js 15 changes
  const { slug } = await params;

  // Use the resolved slug to fetch data
  const post = await getPostData(slug);

  if (!post || !post.content) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8 px-4 font-sans">
      <h1 className="text-5xl font-bold mb-4 text-center text-[#ffe230] font-serif">
        {post.title}
      </h1>
      {post._firstPublishedAt && (
        <div className="text-center text-sm text-gray-400 mb-8">
          Published on{" "}
          {new Date(post._firstPublishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}
      <div
        className="prose prose-invert lg:prose-xl mx-auto 
                   prose-p:text-gray-200 
                   prose-headings:text-[#ffe230] 
                   prose-a:text-[#ffe230] hover:prose-a:text-yellow-300 
                   prose-strong:text-gray-100 
                   prose-blockquote:text-gray-400 prose-blockquote:border-[#ffe230] 
                   prose-code:text-pink-300 
                   prose-ul:list-disc prose-ol:list-decimal 
                   prose-li:marker:text-gray-400"
      >
        <StructuredText data={post.content} />
      </div>
    </article>
  );
}
