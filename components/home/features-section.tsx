import React from "react";
import Link from "next/link";

// No props needed for now as content is static
interface FeaturesSectionProps {}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 max-w-7xl mx-auto px-4">
    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">
        Cross-Platform Play
      </h3>
      <p className="text-base leading-relaxed text-gray-300">
        Play with friends regardless of their device. Seamlessly connect across
        iOS, Android, and Mac.
      </p>
    </div>

    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">
        Global Community
      </h3>
      <p className="text-base leading-relaxed text-gray-300">
        Join thousands of players worldwide. Find new friends, compete in
        matches, and climb the leaderboards.
      </p>
    </div>

    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">
        Learn & Improve
      </h3>
      <p className="text-base leading-relaxed text-gray-300">
        New to Pidro? Check out our{" "}
        <Link href="/how-to-play-pidro" className="underline hover:text-white">
          comprehensive guide
        </Link>{" "}
        and practice with players of all skill levels.
      </p>
    </div>

    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">
        Premium Features
      </h3>
      <p className="text-base leading-relaxed text-gray-300">
        Unlock exclusive features, custom avatars, and more with Pidro Premium.
        Enhance your gaming experience.
      </p>
    </div>

    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">
        Regular Updates
      </h3>
      <p className="text-base leading-relaxed text-gray-300">
        We&apos;re constantly improving! Check our{" "}
        <Link href="/changelog" className="underline hover:text-white">
          changelog
        </Link>{" "}
        to see what&apos;s new.
      </p>
    </div>

    <div className="text-center p-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-100">
        Dedicated Support
      </h3>
      <p className="text-base leading-relaxed text-gray-300">
        Need help? Our support team is here for you.{" "}
        <Link
          href="mailto:pidrohelp@gmail.com"
          className="underline hover:text-white"
        >
          Contact us
        </Link>{" "}
        anytime.
      </p>
    </div>
  </div>
);

export default FeaturesSection;
