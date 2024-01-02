import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sanchez } from "next/font/google";
import styled from "styled-components";
import Header from "./header";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

import appStoreLogo from "../public/badge-appstore.png";
import macStoreLogo from "../public/badge-macstore.png";
import playStoreLogo from "../public/badge-playstore.jpeg";

const sanchez = Sanchez({ subsets: ["latin"], weight: "400" });

const SiteWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
  background: rgb(13, 48, 75);
  background: radial-gradient(
    circle,
    rgba(28, 103, 160, 1) 0%,
    rgba(13, 48, 75, 1) 100%
  );
  line-height: 1.2;
  color: white;
  a {
    text-decoration: none;
    color: #ffe230;
  }
  nav a.ext {
    color: white;
    color: #ffe230;
  }
  a:hover,
  a:active {
    color: #ffe230;
  }
  nav a {
    color: white;
    &:hover {
      color: #ffe230;
    }
  }
`;

const Content = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  max-width: 1200px;
  margin: 0 auto;
`;
const SocialButtons = styled.div`
  padding-top: 40px;
  display: block;
  margin-bottom: 20px;
  p {
    text-align: center;
    margin-bottom: 10px;
  }
`;
const ButtonList = styled.div`
  display: table;
  margin: 0 auto;
  > div {
    display: inline-block;
    margin-left: 6px;
    margin-right: 6px;
  }
`;
const Copyright = styled.div`
  border-top: 1px solid #09afe6;
  padding-top: 20px;
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
`;

const Badges = styled.div`
  display: table;
  margin: 0 auto 30px auto;
  ul {
    list-style: none;
    margin: 0;
    padding-top: 20px;
    display: flex;
    li {
      margin: 0 4px;
      display: inline-block;
      img {
        border-radius: 6px;
        border: 1px solid #09afe6;
        max-height: 40px;
      }
    }
  }
`;
const Support = styled.div`
  font-size: 1.1em;
  margin-bottom: 20px;
  text-align: center;
`;
type LayoutProps = {
  socialMedia?: any;
  appStoreUrl?: string;
  macStoreUrl?: string;
  playStoreUrl?: string;
  barebones: boolean;
  children: ReactNode;
};

export function Layout({
  children,
  // socialMedia,
  appStoreUrl,
  barebones = false,
  macStoreUrl,
  playStoreUrl,
}: LayoutProps) {
  return (
    <div className={`${sanchez.className}`}>
      <SiteWrapper >
        {!barebones && <nav className="bg-black py-3 flex justify-center">
          <ul className="flex list-disc space-x-6 max-w-[960px]">
            <li className="list-none">
              <Link
                className="text-white hover:text-[#ffe230]"
                href="/how-to-play-pidro"
              >
                How to Play Pidro
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-[#ffe230]" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="text-white hover:text-[#ffe230]" href="/changelog">
                Changelog
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-[#ffe230]"
                href="mailto:support@pidro.net"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                className="ext hover:text-white"
                href="https://pedrocardgame.com"
                title="Pedro Card Game"
                target="_blank"
              >
                Pedro Player?
              </Link>
            </li>
          </ul>
        </nav>}
        <Header />
        <Content>
          <main className={`${sanchez.className}`}>{children}</main>
        </Content>

        {/* <SocialButtons> */}
        {/*   <p>Let&apos;s get Social:</p> */}
        {/*   <ButtonList> */}
        {/*     <FacebookShareButton */}
        {/*       quote={socialMedia.facebookShareTitle} */}
        {/*       hashtag={socialMedia.facebookShareHashtag} */}
        {/*       url={socialMedia.sharingUrl} */}
        {/*     > */}
        {/*       <FacebookIcon size={32} round={true} /> */}
        {/*     </FacebookShareButton> */}
        {/*     <TwitterShareButton */}
        {/*       url={socialMedia.sharingUrl} */}
        {/*       title={socialMedia.twitterTitle} */}
        {/*       via={socialMedia.twitterVia} */}
        {/*     > */}
        {/*       <TwitterIcon size={32} round={true} /> */}
        {/*     </TwitterShareButton> */}
        {/*     <WhatsappShareButton */}
        {/*       url={socialMedia.sharingUrl} */}
        {/*       title={socialMedia.whatsappTitle} */}
        {/*     > */}
        {/*       <WhatsappIcon size={32} round={true} /> */}
        {/*     </WhatsappShareButton> */}
        {/*     <LinkedinShareButton */}
        {/*       url={socialMedia.sharingUrl} */}
        {/*       title={socialMedia.linkedinTitle} */}
        {/*     // description={socialMedia.linkedinDescription} */}
        {/*     > */}
        {/*       <LinkedinIcon size={32} round={true} /> */}
        {/*     </LinkedinShareButton> */}
        {/*     <EmailShareButton */}
        {/*       url={socialMedia.sharingUrl} */}
        {/*       subject={socialMedia.eMailSubject} */}
        {/*       body={socialMedia.eMailBody} */}
        {/*     > */}
        {/*       <EmailIcon size={32} round={true} /> */}
        {/*     </EmailShareButton> */}
        {/*   </ButtonList> */}
        {/* </SocialButtons> */}

        <Badges>
          <ul>
            {appStoreUrl && <li>
              <a href={appStoreUrl} target="_blank">
                <Image
                  alt="Download on the App Store"
                  height="40"
                  src={appStoreLogo}
                />
              </a>
            </li>}
            {macStoreUrl && <li>
              <a href={macStoreUrl} target="_blank">
                <Image
                  alt="Download on the Mac App Store"
                  height="40"
                  src={macStoreLogo}
                />
              </a>
            </li>}
            {playStoreUrl && <li>
              <a href={playStoreUrl} target="_blank">
                <Image
                  alt="Get it on Google Play"
                  height="40"
                  src={playStoreLogo}
                />
              </a>
            </li>}
          </ul>
        </Badges>
        <Support>
          <p>
            Technical Problems? We&apos;re here to help! <br />
            <Link href="mailto:support@pidro.net">Click here</Link>
          </p>
          <p>
            - <br />
            <Link href="/changelog">Changelog</Link>
          </p>
        </Support>

        <Copyright>
          <p>Oneapps &copy; 2016-{new Date().getFullYear()}</p>

          {!barebones && <p>
            <Link href="/privacy-policy">Privacy Policy</Link>
            {` - `}
            <Link href="/terms-of-use">Terms of Use</Link>
            {` - `}
            <br />
            In-App Purchases:
            {` - `}
            <Link href="/in-app-purchases-ios-en">iOS (english)</Link>
            {` - `}
            <Link href="/in-app-purchases-ios-sv">iOS (swedish)</Link>
            {` - `}
            <Link href="/in-app-purchases-android-en">Android (english)</Link>
            {` - `}
            <Link href="/in-app-purchases-android-sv">Android (swedish)</Link>
          </p>}
        </Copyright>
      </SiteWrapper>
    </div>
  );
}
