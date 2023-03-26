import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import styled from 'styled-components'
import Image from "next/image";
import ReactSwipe from 'react-swipe'

import { request } from "../lib/datocms";
import { Layout } from "@/components/layout";

import appStoreLogo from "../public/badge-appstore.png";
import playStoreLogo from "../public/badge-playstore.png";


const Systems = styled.h2`
  color: white;
  text-align: center;
  font-size: 1.4em;
`

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
`


const HOMEPAGE_QUERY = `{
  home {
    intro
    appStoreUrl
    playStoreUrl
    socialShareUrl
    screenshots {
      url
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
    props: { data }
  };
}



export default function Home({data}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <Layout socialMedia={data.socialMediaSetting} appStoreUrl={data.home.appStoreUrl} playStoreUrl={data.home.playStoreUrl}>
    <Systems>
      Pidro, the Multiplayer Card Game
      <br />
      for{' '}
      <a href={data.home.appStoreUrl} target="_blank">
        iPhone
      </a>
      ,{' '}
      <a href={data.home.appStoreUrl} target="_blank">
        iPad{' '}
      </a>
      and{' '}
      <a href={data.home.playStoreUrl} target="_blank">
        Android
      </a>
      .
    </Systems>

    <Badges>
      <ul>
        <li>
          <a href={data.home.appStoreUrl} target="_blank">
            <Image alt="Download on the App Store" className="apple" src={appStoreLogo} />
          </a>
        </li>
        <li>
          <a href={data.home.playStoreUrl} target="_blank">
            <Image alt="Get it on Google Play" className="android" src={playStoreLogo} />
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
                  data.home.screenshots.map((s:{url: string}) => (
                    <img key={s.url} src={s.url} />
                  ))}
              </ReactSwipe>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Layout>
}
