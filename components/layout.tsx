import React, { ReactNode } from "react";
import Image from "next/image";
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
import playStoreLogo from "../public/badge-playstore.png";

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
  font-family: "Sanchez", serif;
  line-height: 1.2;
  color: white;
  a {
    text-decoration: none;
    color: #ffe230;
  }
  a:visited,
  a:hover,
  a:active {
    color: #ffe230;
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
    li {
      display: inline-block;
      width: 50%;
      max-width: 130px;
      img {
        max-width: 100%;
        max-height: 60px;
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
  socialMedia: any;
  appStoreUrl: string;
  playStoreUrl: string;
  children: ReactNode;
};

export function Layout({
  children,
  socialMedia,
  appStoreUrl,
  playStoreUrl,
}: LayoutProps) {
  return (
    <SiteWrapper>
      <Header />
      <Content>
        <main className={`${sanchez.className}`}>{children}</main>
      </Content>

      <SocialButtons>
        <p>Let's get Social:</p>
        <ButtonList>
          <FacebookShareButton
            quote={socialMedia.facebookShareTitle}
            hashtag={socialMedia.facebookShareHashtag}
            url={socialMedia.sharingUrl}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={socialMedia.sharingUrl}
            title={socialMedia.twitterTitle}
            via={socialMedia.twitterVia}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={socialMedia.sharingUrl}
            title={socialMedia.whatsappTitle}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={socialMedia.sharingUrl}
            title={socialMedia.linkedinTitle}
            // description={socialMedia.linkedinDescription}
          >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <EmailShareButton
            url={socialMedia.sharingUrl}
            subject={socialMedia.eMailSubject}
            body={socialMedia.eMailBody}
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </ButtonList>
      </SocialButtons>

      <Badges>
        <ul>
          <li>
            <a href={appStoreUrl} target="_blank">
              <Image
                alt="Download on the App Store"
                className="apple"
                src={appStoreLogo}
              />
            </a>
          </li>
          <li>
            <a href={playStoreUrl} target="_blank">
              <Image
                alt="Get it on Google Play"
                className="android"
                src={playStoreLogo}
              />
            </a>
          </li>
        </ul>
      </Badges>
      <Support>
        <p>
          Technical Problems? We're here to help! <br />
          <a href="mailto:support@pidro.net">Click here</a>
        </p>
      </Support>

      <Copyright>
        <p>Oneapps &copy; 2016-{new Date().getFullYear()}</p>
        <p>
          <a href="/privacy-policy">Privacy Policy</a>
          {` - `}
          <a href="/terms-of-use">Terms of Use</a>
          {` - `}
          <br />
          In-App Purchases:
          {` - `}
          <a href="/in-app-purchases-ios-en">iOS (english)</a>
          {` - `}
          <a href="/in-app-purchases-ios-sv">iOS (swedish)</a>
          {` - `}
          <a href="/in-app-purchases-android-en">Android (english)</a>
          {` - `}
          <a href="/in-app-purchases-android-sv">Android (swedish)</a>
        </p>
      </Copyright>
    </SiteWrapper>
  );
}
