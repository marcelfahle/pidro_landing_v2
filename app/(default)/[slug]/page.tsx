import type { Metadata } from "next";
import { request } from "@/lib/datocms";
import { draftMode } from "next/headers";
import { toNextMetadata } from "react-datocms";

// --- DatoCMS Query ---

const PAGE_QUERY = `
  query PageBySlug($slug: String) {
    page(filter: {slug: {eq: $slug}}) {
      title
      slug
      content(markdown: true) # Ask DatoCMS to convert markdown to HTML
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`;

// --- Data Fetching ---

async function getPageData(slug: string) {
  const { isEnabled } = await draftMode();
  const data: any = await request({
    query: PAGE_QUERY,
    variables: { slug },
    includeDrafts: isEnabled,
  });
  return data?.page;
}

// --- Static Path Generation ---

export async function generateStaticParams() {
  const data: any = await request({ query: `{ allPages { slug } }` });

  return data.allPages.map((page: { slug: string }) => ({
    slug: page.slug,
  }));
}

// --- Metadata Generation ---

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPageData(params.slug);

  if (!page) {
    // Handle case where page is not found, perhaps return default metadata or throw an error
    return {
      title: "Page Not Found",
    };
  }
  // Use react-datocms utility to convert meta tags
  return toNextMetadata(page.seo || []);
}

// --- Page Component (Server Component) ---

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageData(params.slug);

  if (!page) {
    // Optional: Render a specific not-found component or redirect
    // For now, we rely on generateMetadata potentially handling the title
    // and the layout providing the main structure.
    // You might want to use Next.js's notFound() function here.
    // import { notFound } from 'next/navigation';
    // notFound();
    return null; // Or a dedicated "Not Found" message/component
  }

  return (
    // Note: The Layout component is applied in app/layout.tsx
    // We don't need to wrap this component in Layout here.
    // We also don't need Head component as metadata is handled by generateMetadata
    <div className="mx-auto font-sans py-8 px-4">
      <h1 className="text-5xl font-bold text-[#ffe230] mt-6 mb-8 text-center">
        {page.title}
      </h1>
      <div
        className="mx-auto max-w-[640px] 
                   prose prose-invert lg:prose-xl 
                   prose-p:text-gray-200 
                   prose-headings:text-[#ffe230] 
                   prose-ul:list-disc prose-ol:list-decimal 
                   prose-li:marker:text-gray-400 
                   prose-strong:text-gray-100 
                   prose-a:text-[#ffe230] hover:prose-a:text-yellow-300
                   prose-blockquote:text-gray-300 prose-blockquote:border-[#ffe230] 
                   prose-code:text-pink-400"
        dangerouslySetInnerHTML={{
          __html: page.content, // Content is pre-rendered HTML from DatoCMS
        }}
      />
    </div>
  );
}
