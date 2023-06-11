import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import GetInTouch from "@/components/faq/FaqMain/GetInTouch";
import QuestionList from "@/components/faq/FaqMain/QuestionList";
import DefaultLayout from "@/components/layouts/Homepage";
import {
  Content,
  FAQInput,
  FAQInputContainer,
  FAQSubtitle,
  FAQsvg,
  FAQTitle,
  Main,
  Top,
} from "@/styled-components/veel-gestelde-vragen.style";

import { FRONT_END_URL } from "../constants.js";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // dummy data
  let SampleData = [
    {
      title: "Garantie",
      faq: [
        {
          question: "Hoe zit het met de garantie?",
          answer:
            "Na je reparatie ontvang je je garantiebewijs in je email, daarin staat ook tot wanneer je garantie hebt.",
        },

        {
          question: "Hoeveel garantie heb ik op mijn reparatie?",
          answer:
            "Alle reparateurs die bij MrAgain zijn aangesloten geven aan hoeveel garantie ze op elke reparatie geven.",
        },
        {
          question:
            "Wat kan ik doen als de reparateur en ik het niet eens zijn over de garantie?",
          answer:
            "Probeer er eerst samen uit te komen, lukt dat niet dan bemiddelen we.",
        },
      ],
    },
    {
      title: "Betalen",
      faq: [
        {
          question: "Waar en hoe moet ik betalen voor mijn reparatie?",
          answer:
            "Je betaalt bij de reparateur nadat deze de reparatie heeft uitgevoerd.",
        },
        {
          question: "Wat betaal ik voor mijn reparatie?",
          answer:
            "Elke reparateur geeft zijn/haar prijzen per reparatie aan op zijn/haar pagina.",
        },
      ],
    },
    {
      title: "Reparatie",
      faq: [
        {
          question: "Hoe lang duurt mijn reparatie?",
          answer:
            "Dit hangt af van de reparatie, maar normaal gesproken worden de meeste reparaties nog dezelfde dag uigevoerd",
        },
      ],
    },
    {
      title: "Review",
      faq: [
        {
          question: "Hoe kan ik een review achterlaten?",
          answer:
            "Heel simpel: nadat je reparateur je reparatie heeft afgerond sturen we je een een review verzoek per email.",
        },
      ],
    },
    {
      title: "Feedback en klachten",
      faq: [
        {
          question:
            "Ik heb feedback of een klacht, hoe kan ik contact met jullie opnemen?",
          answer:
            "Je kunt ons gemakkelijk bereiken via onze contact pagina of mailen naar info@mragain.nl.",
        },
      ],
    },
  ];

  const [data, setData] = useState(SampleData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterFAQs = (searchValue) => {
    // No search term - Display Everything
    if (searchValue == "") return data;

    // Filter Faq Array by searchValue
    let filtered = data.map((item) => {
      return {
        ...item,
        faq: item.faq.filter((faq) =>
          faq.question.toLowerCase().includes(searchValue.toLowerCase())
        ),
      };
    });
    return filtered;
  };

  const filteredData = useMemo(() => {
    return filterFAQs(searchTerm);
  }, [searchTerm]);

  return (
    <DefaultLayout>
      <Main>
        <Head>
          <title>Veel gestelde vragen | Mr Again</title>
          <meta
            name="Keywords"
            content="Veel gestelde vragen, Mr Again, FAQ Mr Again, Telefoon reparaties, Telefoon reparateur, telefoonscherm, garantie, kwaliteit"
          />
          <meta
            name="description"
            content="Je vindt hier antwoorden op de veel gestelde vragen aan MrAgain, staat je vraag er niet bij, neem dan contact met ons op!"
          />
          <link
            rel="canonical"
            href={FRONT_END_URL + "/veel-gestelde-vragen"}
          />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta name="og_title" property="og:title" content="FAQ" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
        </Head>
        <Top>
          <FAQTitle>VEEL GESTELDE VRAGEN</FAQTitle>
          <FAQSubtitle>Hi! Hoe kunnen we je helpen?</FAQSubtitle>
          <FAQInputContainer>
            <FAQInput
              onChange={(e) => handleOnChange(e)}
              placeholder="Zoek in onze FAQ"
            />
            <FAQsvg>
              <FontAwesomeIcon icon={faSearch} style={{ color: "#e0e0e0" }} />
            </FAQsvg>
          </FAQInputContainer>
        </Top>
        <Content>
          <QuestionList data={filteredData} />
          <GetInTouch />
        </Content>
      </Main>
    </DefaultLayout>
  );
};

export default Faq;
