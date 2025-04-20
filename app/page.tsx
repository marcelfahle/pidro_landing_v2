import { getHomeData } from "@/lib/data/home";
import { HomePageProps } from "@/lib/types/home";
import HeroSection from "@/components/home/hero-section";
import StoreLinks from "@/components/home/store-links";
import ScreenshotSlider from "@/components/home/screenshot-slider";
import FeaturesSection from "@/components/home/features-section";

export default async function HomePage() {
  let data: HomePageProps["data"] | null = null;

  try {
    // Fetch data and ensure it's typed correctly (or cast)
    const fetchedData = await getHomeData();
    // Basic validation - could be more robust
    if (!fetchedData || !fetchedData.home) {
      throw new Error("Invalid data structure returned from DatoCMS");
    }
    data = fetchedData as HomePageProps["data"]; // Cast to the correct type
  } catch (error) {
    console.error("Error in HomePage:", error);
    // Render error state without data
    return (
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-center mb-4">
          We&apos;re having trouble loading the homepage. Please try again
          later.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
        >
          Retry
        </a>
      </div>
    );
  }

  // Render the page with fetched data
  return (
    <>
      <HeroSection />
      <StoreLinks
        appStoreUrl={data.home.appStoreUrl}
        macStoreUrl={data.home.macStoreUrl}
        playStoreUrl={data.home.playStoreUrl}
      />
      <ScreenshotSlider screenshots={data.home.screenshots} />
      <FeaturesSection />
      {/* TODO: Integrate Head metadata management (from home-page-client) */}
    </>
  );
}
