import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import * as yup from "yup";

import DefaultLayout from "@/components/layouts/Homepage/index.jsx";
import { MaxConstraints } from "@/components/styled/layout.jsx";
import { SubTitle } from "@/components/styled/text.js";
import Button from "@/components/ui/Button.jsx";
import Input from "@/components/ui/Input.jsx";
import { Field } from "@/modules/forms/Blocks.js";
import Form, {
  createFormModule,
  useFormContext,
} from "@/modules/forms/index.js";
import { Main } from "@/styled-components/reparatie-en-service.style.jsx";
import api from "@/utils/api/index.js";
import media, { OnMobile } from "@/utils/media.js";

import { API_PATH, API_URL, FRONT_END_URL } from "../../constants.js";

const HeroWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  flex-direction: column;

  p {
    font-size: 11px;
    color: #0d3244;
    font-weight: 400;
  }

  ${media.tablet`
    flex-direction: row;
    padding: 98px 0;
  `}
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 0;

  ${media.tablet`
    min-width: 300px;
    padding: 80px 0;
  `}
`;

const SliderWrap = styled.div`
  width: 100%;
  height: 200px;
  background-color: #eaeaea;
  border-radius: 10px;
  overflow: hidden;

  .slick-slider,
  .slick-list {
    height: 100%;
  }
  .slick-slide > div,
  .slick-track {
    height: 100%;
  }

  .slick-dots {
    display: none !important;
    position: absolute;
    z-index: 1;
    bottom: 30px;
    left: 30px;
    width: auto;

    li {
      width: auto;
      margin: 0 2px;
    }

    .slick-active button {
      background-color: #06c987;
    }

    button {
      background-color: #c0c0c0;
      width: 16px;
      height: 16px;
      border-radius: 8px;

      ::before {
        display: none;
      }
    }
  }

  ${media.tablet`
    width: 670px;
    height: 489px;

    .slick-dots {
      display: block !important;
    }
  `}
`;

const SliderBlogWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  content {
    position: absolute;
    z-index: 1;
    left: 10px;
    bottom: 10px;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    width: 171px;
    font-size: 10px;

    a {
      color: #0d3244;
      font-weight: 600;
    }

    date {
      color: #a0a0a0;
      font-weight: 400;
      display: block;
    }
  }

  ${media.tablet`
    content {
      left: auto;
      right: 30px;
      bottom: 30px;
    }
  `}
`;

const BlogWrap = styled.div`
  font-size: 10px;
  background {
    position: relative;
    height: 140px;
    display: block;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 5px;
  }

  date {
    display: block;
    color: #a0a0a0;
    font-weight: 400;
  }

  a {
    font-size: 15px;
    color: #0d3244;
    font-weight: 600;
  }
`;

const BlogsSectionWrap = styled.div`
  padding: 60px;
  background-color: #fff;
  margin: 0 -20px -127px -20px;
  padding: 30px 20px;

  ${media.tablet`
    border-radius: 10px;
    padding: 60px;
    margin: 0 -20px;
  `}
`;

const BlogsSection = styled.div`
  display: flex;
`;

const BlogsList = styled.div`
  margin: 0 -10px;
  > div {
    margin: 10px;
  }

  ${media.tablet`
    margin: -10px;
    display: flex;
    flex-wrap: wrap;

    > div {
      flex-basis: 45%;
      margin: 10px;
    }
  `}
`;

const FeaturedBlog = styled.div`
  min-width: 320px;
  border-radius: 5px;
  overflow: hidden;

  ${SliderBlogWrap} {
    width: 100%;
    height: 100%;
    max-height: 600px;

    content {
      width: auto;
      left: 30px;
    }
  }
`;

const SectionTitle = styled.div`
  border-bottom: 2px solid #eaeaea;
  line-height: 30px;
  font-size: 15px;
  color: #303030;
  font-weight: 600;
  position: relative;
  margin-bottom: 40px;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    height: 2px;
    background-color: #06c987;
    width: 140px;
  }
`;

const validator = yup.object({
  email: yup
    .string()
    .required()
    .email("Heb je een geldig emailadres gebruikt?"),
});

const subscribeForm = createFormModule({
  validator,
  init: async () => ({ email: "" }),
  submit(data) {
    return api.post(`${API_PATH.SUBSCRIBE}/`, { email: data.email });
  },
});

function NullRenderer() {
  return null;
}

function SubscribeForm() {
  const { submitted } = useFormContext().state;

  if (submitted) {
    return <success>Thank you for subscribing</success>;
  }

  return (
    <>
      <p>Nog niet aangemeld voor onze nieuwsbrief?</p>
      <Field
        as={Input}
        name="email"
        size="large"
        placeholder="Je e-mailadres"
      />
      <Button>Schrijf in</Button>
    </>
  );
}

export default function Blog({ blogs }) {
  useEffect(() => {
    subscribeForm.actions.initialize();
  }, []);

  function renderSliderBlog(blog) {
    if (!blog) {
      return null;
    }

    return (
      <SliderBlogWrap>
        <background>
          {blog.post_image ? (
            <Image layout="fill" objectFit="cover" src={blog.post_image} />
          ) : null}
        </background>
        <content>
          <date>{moment(blog.created_on).format("D MMM YY")}</date>
          <Link href={`/blog/${blog.slug}`}>
            <a>{blog.title}</a>
          </Link>
        </content>
      </SliderBlogWrap>
    );
  }

  function renderBlog(blog) {
    if (!blog) {
      return null;
    }

    return (
      <BlogWrap>
        <background>
          {blog.post_image ? (
            <Image layout="fill" objectFit="cover" src={blog.post_image} />
          ) : null}
        </background>
        <content>
          <date>{moment(blog.created_on).format("D MMM YY")}</date>
          <Link href={`/blog/${blog.slug}`}>
            <a>{blog.title}</a>
          </Link>
        </content>
      </BlogWrap>
    );
  }

  const sliderSettings = {
    dots: true,
    nextArrow: <NullRenderer />,
    prevArrow: <NullRenderer />,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  const latestBlogs = useMemo(() => {
    return [...blogs].slice(0, 4);
  }, [blogs]);

  const restOfBlogs = useMemo(() => {
    const shouldFeatureOne = blogs.length > 10;

    return {
      featured: shouldFeatureOne ? [...blogs][4] : null,
      rest: [...blogs].slice(shouldFeatureOne ? 5 : 4),
    };
  }, [blogs]);

  return (
    <DefaultLayout>
      <Main>
        <div className="blog-list">
          <Head>
            <title>Onze blogs | MrAgain</title>
            <meta name="Keywords" content="Blogs, Mr-Again" />
            <meta name="description" content="De blog van MrAgain" />
            <link rel="canonical" href={FRONT_END_URL + "/blog"} />
            <meta property="og:type" content="website" />
            <meta
              name="og_title"
              property="og:title"
              content="De blog van MrAgain"
            />
            <meta property="og:description" content="De blogs van MrAgain" />
            <meta name="og:url" content={FRONT_END_URL + "/blog"} />
            <meta
              property="og:image"
              content="/telefoon-reparatie-mragain.jpg"
            />
            <meta
              name="og_site_name"
              property="og:site_name"
              content="Mr Again"
            />
          </Head>
          <MaxConstraints>
            <HeroWrap>
              <RightSide>
                <div>
                  <SubTitle>Nieuws & Posts</SubTitle>
                  <h1>Blogs</h1>
                </div>
                <div>
                  <Form module={subscribeForm}>
                    <SubscribeForm />
                  </Form>
                </div>
              </RightSide>
              <SliderWrap>
                <Slider {...sliderSettings}>
                  {latestBlogs.map(renderSliderBlog)}
                </Slider>
              </SliderWrap>
            </HeroWrap>
            {restOfBlogs.rest.length ? (
              <BlogsSectionWrap>
                <SectionTitle as="h2">Laatste blogs</SectionTitle>
                <BlogsSection>
                  <BlogsList>
                    <OnMobile only>{renderBlog(restOfBlogs.featured)}</OnMobile>
                    {restOfBlogs.rest.map(renderBlog)}
                  </BlogsList>
                  {restOfBlogs.featured ? (
                    <OnMobile show={false}>
                      <FeaturedBlog>
                        {renderSliderBlog(restOfBlogs.featured)}
                      </FeaturedBlog>
                    </OnMobile>
                  ) : null}
                </BlogsSection>
              </BlogsSectionWrap>
            ) : null}
          </MaxConstraints>
        </div>
      </Main>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_PATH.GETPAGES}/?t=b`);
  const blogs = await res.json();

  return {
    props: {
      blogs,
    },
  };
}
