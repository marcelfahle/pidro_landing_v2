import React from "react";
import Image from "next/image";
import Link from "next/link";

// Import assets (adjust paths as this is now a component)
import appStoreLogo from "../public/badge-appstore.png";
import macStoreLogo from "../public/badge-macstore.png";
import playStoreLogo from "../public/badge-playstore.jpeg";

export default function Footer() {
  return (
    <footer className="font-sans mt-10">
      <div className="table mx-auto mb-[30px]">
        <ul className="list-none m-0 pt-[20px] flex">
          <li className="mx-[4px] inline-block">
            <a
              href="https://apps.apple.com/app/pidro/id1137091987"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Download on the App Store"
                height={40}
                src={appStoreLogo}
                className="rounded-[6px] border border-[#09afe6] max-h-[40px] !w-auto"
              />
            </a>
          </li>
          <li className="mx-[4px] inline-block">
            <a
              href="https://apps.apple.com/app/pidro/id1137091987"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Download on the Mac App Store"
                height={40}
                src={macStoreLogo}
                className="rounded-[6px] border border-[#09afe6] max-h-[40px] !w-auto"
              />
            </a>
          </li>
          <li className="mx-[4px] inline-block">
            <a
              href="https://play.google.com/store/apps/details?id=com.oneapps.pidro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="Get it on Google Play"
                height={40}
                src={playStoreLogo}
                className="rounded-[6px] border border-[#09afe6] max-h-[40px] !w-auto"
              />
            </a>
          </li>
        </ul>
      </div>

      <div className="text-[1.1em] mb-[20px] text-center">
        <p>
          Technical Problems? We&apos;re here to help! <br />
          <Link href="mailto:pidrohelp@gmail.com">Click here</Link>
        </p>
        <p>
          - <br />
          <Link href="/changelog">Changelog</Link>
        </p>
      </div>

      <div className="border-t border-[#09afe6] pt-[20px] text-center max-w-[720px] mx-auto">
        <p className="text-sm">
          Oneapps &copy; 2016-{new Date().getFullYear()}
        </p>

        <p className="text-xs leading-relaxed mt-2">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span className="mx-1">-</span>
          <Link href="/terms-of-use">Terms of Use</Link>
          <br className="sm:hidden" />
          <span className="mx-1 hidden sm:inline">-</span>
          In-App Purchases:
          <span className="mx-1">-</span>
          <Link href="/in-app-purchases-ios-en">iOS (en)</Link>
          <span className="mx-1">-</span>
          <Link href="/in-app-purchases-ios-sv">iOS (sv)</Link>
          <br className="sm:hidden" />
          <span className="mx-1 hidden sm:inline">-</span>
          <Link href="/in-app-purchases-android-en">Android (en)</Link>
          <span className="mx-1">-</span>
          <Link href="/in-app-purchases-android-sv">Android (sv)</Link>
        </p>
      </div>
    </footer>
  );
}
