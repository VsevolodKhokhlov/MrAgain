import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import DefaultLayout from "@/components/layouts/Homepage";
import { MaxConstraints } from "@/components/styled/layout";

import { API_PATH, FRONT_END_URL } from "../../../constants";

const BlogWrap = styled.div`
  padding-top: 50px;
  max-width: 760px;
  margin: 0 auto;
  h1 {
    font-size: 40px;
    color: #1c2430;
    font-weight: 400;
  }

  date {
    display: block;
    font-size: 12px;
    color: #a0a0a0;
    font-weight: 500;
    margin: 10px 0;
  }

  background {
    position: relative;
    height: 400px;
    display: block;
    border-radius: 5px;
    overflow: hidden;
    margin: 20px 0 40px 0;
  }
`;

export default function BlogTitle({ blogDetails, blogTitle }) {
  let blog = null;
  if (blogDetails !== undefined) {
    blog = blogDetails[0];
  }

  return (
    <DefaultLayout>
      <Head>
        <title>{blog.title}</title>
        <meta name="Keywords" content={blog.seo_keyword} />
        <meta name="description" content={blog.seo_description} />
        <link rel="canonical" href={`${FRONT_END_URL}/blog/${blogTitle}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.seo_description} />
        <meta
          property="og:url"
          content={`${FRONT_END_URL}/blog/${blogTitle}`}
        />
        <meta property="og:image" content={blog.post_image} />
        <meta property="og:site_name" content="MrAgain" />
      </Head>
      <MaxConstraints>
        <BlogWrap>
          <h1>{blog.title}</h1>
          <date>{moment(blog.created_on).format("D MMM YY")}</date>
          {blog.post_image ? (
            <background>
              <Image src={blog.post_image} layout="fill" objectFit="cover" />
            </background>
          ) : null}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </BlogWrap>
      </MaxConstraints>
    </DefaultLayout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_PATH.GETPAGES}/?t=b`);
//   const blogs = await res.json();

//   const paths = blogs.map((blog) => `/blog/${blog.slug}`);
//   return { paths, fallback: true };
// }
export async function getServerSideProps({ query, params }) {
  const { blogTitle } = query || params;
  const res = await fetch(API_PATH.GETPAGEDETAILS + "/?slug=" + blogTitle);
  const blogDetails = await res.json();

  return {
    props: {
      blogDetails,
      blogTitle,
    },
  };
}
