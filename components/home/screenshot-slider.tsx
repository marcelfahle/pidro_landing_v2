"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface ScreenshotSliderProps {
  screenshots: Array<{ url: string }>;
}

const ScreenshotSlider: React.FC<ScreenshotSliderProps> = ({ screenshots }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="overflow-hidden max-w-3xl mx-auto mb-16" ref={emblaRef}>
      <div className="flex -ml-4">
        {screenshots?.map((s) => (
          <div className="flex-[0_0_100%] min-w-0 pl-4" key={s.url}>
            <Image
              alt="Pidro Screenshot"
              width={1000}
              height={600}
              className="block h-auto w-full object-contain rounded-lg shadow-lg border border-white/20"
              src={s.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotSlider;
