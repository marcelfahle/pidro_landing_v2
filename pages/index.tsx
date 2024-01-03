import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { renderMetaTags } from "react-datocms";
import Head from 'next/head';
import styled from "styled-components";
import Image from "next/image";
import ReactSwipe from "react-swipe";

import { request } from "../lib/datocms";
import { Layout } from "@/components/layout";

import appStoreLogo from "../public/badge-appstore.png";
import macStoreLogo from "../public/badge-macstore.png";
import playStoreLogo from "../public/badge-playstore.jpeg";

const Headline = styled.h2`
  color: #ffe230;
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.1rem;
`;
const Subheadline = styled.h3`
  color: white;
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 2rem;
`;
const Systems = styled.p`
  color: white;
  text-align: center;
  font-size: 1.4em;
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
        max-height: 60px;
      }
    }
  }
`;

const HOMEPAGE_QUERY = `{
  home {
    intro
    appStoreUrl
    playStoreUrl
    macStoreUrl
    socialShareUrl
    screenshots {
      url
    }
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
  socialMediaSetting {
    sharingUrl
    twitterTitle
    twitterVia
    facebookShareTitle
    facebookShareHashtag
    whatsappTitle
    linkedinDescription
    linkedinTitle
    eMailBody
    eMailSubject
  }
}`;
export const getStaticProps: GetStaticProps = async () => {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data },
  };
};

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      socialMedia={data.socialMediaSetting}
      appStoreUrl={data.home.appStoreUrl}
      playStoreUrl={data.home.playStoreUrl}
      macStoreUrl={data.home.macStoreUrl}
    >
      <Head>{renderMetaTags(data.home.seo)}</Head>
      <Headline>The free 4 player card game</Headline>
      <Subheadline>
        Test your skills, build alliances, and triumph in a captivating game of
        strategy.
      </Subheadline>



      <Badges>
        <ul>
          <li>
            <a href={data.home.appStoreUrl} target="_blank">
              <Image
                alt="Download on the App Store"
                height="60"
                src={appStoreLogo}
              />
            </a>
          </li>
          <li>
            <a href={data.home.macStoreUrl} target="_blank">
              <Image
                alt="Download on the Mac App Store"
                height="60"
                src={macStoreLogo}
              />
            </a>
          </li>
          <li>
            <a href={data.home.playStoreUrl} target="_blank">
              <Image
                alt="Get it on Google Play"
                height="60"
                src={playStoreLogo}
              />
            </a>
          </li>
        </ul>
      </Badges>

      <div className="temp-wrapper temp-wrapper--wider ">
        <div className="px px--ls">
          <div className="px__body">
            <div className="px__body__cut"></div>
            <div className="px__body__speaker"></div>
            <div className="px__body__sensor"></div>

            <div className="px__body__mute"></div>
            <div className="px__body__up"></div>
            <div className="px__body__down"></div>
            <div className="px__body__right"></div>
          </div>

          <div className="px__screen">
            <div className="px__screen__">
              <div className="px__screen__frame">
                <ReactSwipe
                  className="carousel"
                  swipeOptions={{ auto: 3000, continuous: true }}
                >
                  {data &&
                    data.home.screenshots &&
                    data.home.screenshots.map((s: { url: string }) => (
                      <div className="h-full aspect-video">
                        <Image alt="Pidro Screenshot" fill={true} style={{ objectFit: 'contain' }} key={s.url} src={s.url} />
                      </div>
                    ))}
                </ReactSwipe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
