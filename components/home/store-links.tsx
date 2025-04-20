import React from "react";
import Image from "next/image";
import appStoreLogo from "@/public/badge-appstore.png";
import macStoreLogo from "@/public/badge-macstore.png";
import playStoreLogo from "@/public/badge-playstore.jpeg";

interface StoreLinksProps {
  appStoreUrl: string;
  macStoreUrl: string;
  playStoreUrl: string;
}

const StoreLinks: React.FC<StoreLinksProps> = ({
  appStoreUrl,
  macStoreUrl,
  playStoreUrl,
}) => (
  <div className="table mx-auto mb-8">
    <ul className="list-none m-0 pt-5 flex space-x-2">
      <li>
        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Download on the App Store"
            height={60}
            src={appStoreLogo}
            className="rounded-md border border-[#09afe6] max-h-[60px] !w-auto"
          />
        </a>
      </li>
      <li>
        <a href={macStoreUrl} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Download on the Mac App Store"
            height={60}
            src={macStoreLogo}
            className="rounded-md border border-[#09afe6] max-h-[60px] !w-auto"
          />
        </a>
      </li>
      <li>
        <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
          <Image
            alt="Get it on Google Play"
            height={60}
            src={playStoreLogo}
            className="rounded-md border border-[#09afe6] max-h-[60px] !w-auto"
          />
        </a>
      </li>
    </ul>
  </div>
);

export default StoreLinks;
