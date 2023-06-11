import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

import Benefit from "@/components/advantages/Benefit";
import Testimonial from "@/components/advantages/Testimonial";
import DefaultLayout from "@/components/layouts/Homepage";
import {
  BenefitsArea,
  BenefitsOuterWrapper,
  BenefitsSub,
  BenefitsTitle,
  BenefitsWrapper,
  BookBtn,
  Main,
  Spacer,
  TestimonialArea,
  TestimonialWrapper,
  Title,
  TitleArea,
  Wrapper,
} from "@/styled-components/reparatie.style";

import { FRONT_END_URL } from "../constants.js";

const benefitTexts = {
  a: "Vooraf duidelijkheid over de reparatiekosten",
  b: "Echte reviews van mensen die jou voorgingen",
  c: "Geen onnodig wachten, maar directe reparatie van jouw device",
  d: "Direct inzicht in de garantie die je krijgt",
};

const testimonialTitles = {
  a: "Mijn telefoon is weer als nieuw!",
  b: "Snelle service en zeer aardige lui",
};

const testimonialTexts = {
  a: "Mijn telefoon werd snel gerepareerd en doet het weer als vanouds! Super handig dat je direct een afspraak kan maken en weet wanneer ze tijd voor je hebben.",
  b: "Top dat je makkelijk kan vergeljken tussen reparateurs. Ik kon nog dezelfde dag terecht en had mijn mobiel na 30 minuten weer terug, lekker!  ",
};

const Advantages = ({}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DefaultLayout>
      <Main>
        <Head>
          <title>Reparatie via MrAgain | Mr Again</title>
          <meta
            name="description"
            content="Reparatie via MrAgain en jouw voordelen"
          />
          <meta
            name="Keywords"
            content="Reparatie via MrAgain en jouw voordelen"
          />
          <link rel="canonical" href={FRONT_END_URL} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta
            name="og_title"
            property="og:title"
            content="Reparatie via MrAgain en jouw voordelen bij MrAgain"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Reparatie via MrAgain en jouw voordelen"
          />
          <meta name="og:url" content={FRONT_END_URL + "/reparatie"} />
          <meta
            property="og:image"
            content={FRONT_END_URL + "media//telefoon-reparatie-mragain.jpg"}
          />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Wrapper>
          <TitleArea>
            <Title>
              Verleng de levensduur
              <br />
              van jouw apparaat
            </Title>
            <Link href="/zoek-een-reparateur?zip=&device=0&long=0&lat=0">
              <BookBtn>Vind een reparateur</BookBtn>
            </Link>
          </TitleArea>

          <BenefitsArea>
            <BenefitsOuterWrapper>
              <Spacer />
              <BenefitsWrapper>
                <BenefitsSub>WAAROM MRAGAIN</BenefitsSub>
                <BenefitsTitle>Jouw voordelen bij MrAgain</BenefitsTitle>
                <Benefit svgName={"wallet"} text={benefitTexts.a} />
                <Benefit svgName={"thumb"} text={benefitTexts.b} />
                <Benefit svgName={"clock"} text={benefitTexts.c} />
                <Benefit svgName={"warranty"} text={benefitTexts.d} />
              </BenefitsWrapper>
            </BenefitsOuterWrapper>
          </BenefitsArea>

          <TestimonialArea>
            <BenefitsOuterWrapper>
              <Spacer />
              <BenefitsWrapper>
                <BenefitsSub>REVIEWS</BenefitsSub>
                <BenefitsTitle>
                  Niet overtuigd? Check onze reviews!
                </BenefitsTitle>
                <TestimonialWrapper>
                  <Testimonial
                    title={testimonialTitles.a}
                    text={testimonialTexts.a}
                    name={"Vera"}
                    place={"Utrecht"}
                  />
                  <Testimonial
                    title={testimonialTitles.b}
                    text={testimonialTexts.b}
                    name={"Quincy"}
                    place={"Den Haag"}
                  />
                </TestimonialWrapper>
              </BenefitsWrapper>
            </BenefitsOuterWrapper>
          </TestimonialArea>
        </Wrapper>
      </Main>
    </DefaultLayout>
  );
};

export default Advantages;
