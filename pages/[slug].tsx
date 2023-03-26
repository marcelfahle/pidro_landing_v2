import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { request } from "../lib/datocms";
import styled from "styled-components";
import { Layout } from "@/components/layout";

const Wrapper = styled.div`
  margin: 0 auto;
  h2 {
    font-size: 1.6em;
    color: #ffe230;
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 640px;
  font-size: 0.9em;
  p {
    margin-bottom: 1em;
  }
  h3 {
    font-size: 1.3em;
    font-weight: bold;
    margin-top: 1.2em;
    margin-bottom: 0.8em;
  }
  h4 {
    font-size: 1.1em;
    font-weight: bold;
    margin-top: 0.9em;
    margin-bottom: 0.6em;
  }
  ul {
    list-style: disc;
    list-style-position: inside;
    li {
    }
  }
`;

const QUERY = `
  query PageBySlug($slug: String) {
    page(filter: {slug: {eq: $slug}}) {
      title
      slug
      content(markdown: true)
    }
    home {
      appStoreUrl
      macStoreUrl
      playStoreUrl
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

export async function getStaticPaths() {
  const data: any = await request({ query: `{ allPages { slug } }` });

  return {
    paths: data.allPages.map((page: { slug: string }) => `/${page.slug}`),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await request({
    query: QUERY,
    variables: {
      slug: params ? params.slug : "/",
    },
  });
  return {
    props: { data },
  };
};

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      socialMedia={data.socialMediaSetting}
      appStoreUrl={data.home.appStoreUrl}
      playStoreUrl={data.home.playStoreUrl}
      macStoreUrl={data.home.macStoreUrl}
    >
      <Wrapper>
        <div className="prose prose-xl mx-auto">
        <h2>{data.page.title}</h2>
        <Content
          dangerouslySetInnerHTML={{
            __html: data.page.content,
          }}
        />
        </div>
      </Wrapper>
    </Layout>
  );
}
