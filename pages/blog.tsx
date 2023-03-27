import type { GetStaticProps } from "next";
import { renderMetaTags } from "react-datocms";
import Head from 'next/head';
import Link from "next/link";
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

const ListItem = styled.li`
  a {
    color: white;
  }
`;

const QUERY = `
  query {
    allPosts(first: 20) {
      title
      slug
    }
    home {
      appStoreUrl
      playStoreUrl
      macStoreUrl
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
    query: QUERY,
  });
  return {
    props: { data },
  };
};
export default function Blog({ data }: { data: any }) {
  return (
    <Layout
      socialMedia={data.socialMediaSetting}
      appStoreUrl={data.home.appStoreUrl}
      playStoreUrl={data.home.playStoreUrl}
      macStoreUrl={data.home.macStoreUrl}
    >
      <Head>{renderMetaTags(data.home.seo)}</Head>
      <Wrapper>
        <div className="prose prose-xl mx-auto">
          <h2>Latest Blog Posts</h2>
          <ul>
            {data.allPosts.map((post: any) => {
              return (
                <ListItem key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </ListItem>
              );
            })}
          </ul>
        </div>
      </Wrapper>
    </Layout>
  );
}
