import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  // Define needed props, e.g., intro text if it's dynamic
}

const HeroSection: React.FC<HeroSectionProps> = ({}) => (
  // Apply negative horizontal margins to counteract layout padding
  <div className="-mx-4 sm:mx-0">
    {/* Logo part from header.tsx */}
    {/* Apply max-width and centering here, as the parent div is now full-width */}
    <div className="relative max-w-6xl mx-auto w-full">
      <div className="relative max-w-[960px] -mt-[60] mx-auto w-full">
        <h1 className="m-0">
          <Link
            href="/"
            className="header-logo-bg block w-full h-[310px] mb-[-40px] text-indent-[-9999em] cursor-pointer 
                     sm:h-[340px] 
                     md:h-[390px] md:mb-[-60px]
                     lg:h-[450px]"
          >
            Pidro - back to home
          </Link>
        </h1>
      </div>
    </div>

    {/* Intro part from home-page-client.tsx */}
    {/* Add padding here to align with the centered logo above, respecting layout padding on larger screens */}
    <div className="text-center py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-5 text-[#ffe230] font-serif">
        The free 4 player card game
      </h2>
      <p className="text-2xl font-semibold mb-5 text-gray-300">
        Test your skills, build alliances, and triumph in a captivating game of
        strategy.
      </p>
    </div>
  </div>
);

export default HeroSection;
