import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { renderMetaTags } from "react-datocms";
import Head from 'next/head';
import { StructuredText, Image } from "react-datocms";
import { request } from "../../lib/datocms";
import styled from "styled-components";
import { Layout } from "@/components/layout";
import { metaTagsFragment, responsiveImageFragment } from "@/lib/fragments";

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
  query PostBySlug($slug: String) {
    post(filter: {slug: {eq: $slug}}) {
      title
      slug
      content {
        value
        blocks {
           __typename
          ...on ImageRecord {
            id
            image {
              responsiveImage(imgixParams: {}) {
                ...responsiveImageFragment
              }
            }
          }
        }
      }
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
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
}
${responsiveImageFragment}
`;

export async function getStaticPaths() {
  const data: any = await request({ query: `{ allPosts { slug } }` });

  return {
    paths: data.allPosts.map((post: { slug: string }) => `/posts/${post.slug}`),
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

export default function Post({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      socialMedia={data.socialMediaSetting}
      appStoreUrl={data.home.appStoreUrl}
      playStoreUrl={data.home.playStoreUrl}
      macStoreUrl={data.home.macStoreUrl}
    >
      <Head>{renderMetaTags(data.post.seo)}</Head>
      <Wrapper>
        <div className="prose prose-xl mx-auto">
        <h2>{data.post.title}</h2>
          <StructuredText
            data={data.post.content}
            renderBlock={({ record }: { record: any }) => {
              if (record.__typename === "ImageRecord") {
                return <div className="relative not-prose mb-8"><Image layout="responsive" objectFit="contain" data={record.image.responsiveImage} /></div>;
              }

              return (
                <>
                  <p>Unknown Error</p>
                  <pre>{JSON.stringify(record, null, 2)}</pre>
                </>
              );
            }}
          />
        </div>
      </Wrapper>
    </Layout>
  );
}
