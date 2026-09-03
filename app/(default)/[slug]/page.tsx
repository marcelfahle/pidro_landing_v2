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

const POLICY_PROSE_CLASSES = `mx-auto max-w-[640px]
  prose prose-invert lg:prose-xl
  prose-p:text-gray-200
  prose-headings:text-[#ffe230]
  prose-ul:list-disc prose-ol:list-decimal
  prose-li:marker:text-gray-400
  prose-strong:text-gray-100
  prose-a:text-[#ffe230] hover:prose-a:text-yellow-300
  prose-blockquote:text-gray-300 prose-blockquote:border-[#ffe230]
  prose-code:text-pink-400`;

function InviteInstallPrivacyAddendum() {
  return (
    <section aria-labelledby="invite-install-matching">
      <hr />
      <h2 id="invite-install-matching">Invite installation matching</h2>
      <p>
        If you tap the matching app-store button on a Pidro invitation, Pidro
        may use your network address, mobile platform and operating-system major
        version, a broad screen-size category, language/locale, and time zone to
        restore that invitation when you first open the installed app.
      </p>
      <p>
        The matching hint is held only in Pidro&apos;s server memory and is
        permanently deleted when it is used, when the server restarts, or no
        later than 30 minutes after the store click. Pidro does not send this
        matching data to a hosted deferred-link or attribution vendor, and it
        does not use an advertising identifier for this purpose.
      </p>
      <p>
        The app also creates a separate random identifier for that installation
        to enforce abuse limits. It is not used to match the browser to the app.
        If you continue as a guest, the identifier may be stored with the guest
        account until you delete it or the account is removed after 30 days of
        inactivity.
      </p>
    </section>
  );
}

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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageData(slug);

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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params object as per Next.js 15 changes
  const { slug } = await params;

  // Use the resolved slug to fetch data
  const page = await getPageData(slug);

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
      <div className={POLICY_PROSE_CLASSES}>
        <div
          dangerouslySetInnerHTML={{
            __html: page.content, // Content is pre-rendered HTML from DatoCMS
          }}
        />
        {slug === "privacy-policy" ? <InviteInstallPrivacyAddendum /> : null}
      </div>
    </div>
  );
}
