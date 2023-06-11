import "./FaqSection.style.less";

import React from "react";

import { FaqContainer, FaqSectionArea } from "../Faq.style";
import {
  FaqArticle,
  FaqArticleContent,
  FaqArticleTitle,
  FaqContent,
} from "./FaqSection.style.jsx";

const FaqSection = () => (
  <FaqSectionArea className="faq-area">
    <FaqContainer className="faq-container">
      <FaqContent>
        <FaqArticle>
          <FaqArticleTitle>Garantie</FaqArticleTitle>
          <FaqArticleContent>
            <p>
              <lu>
                <li>
                  <b>Hoe zit het met mijn garantie?</b>
                </li>
                Je garantiebewijs heb je in je email. Daarop staat aangegeven
                tot wanneer je garantie hebt. Met dit bewijs kun je bij je
                reparateur terecht indien je denkt voor garantie in aanmerking
                te komen.
                <br></br>
                <li>
                  <b>Hoeveel garantie heb ik op mijn reparatie?</b>
                </li>
                Alle reparateurs die bij MrAgain zijn aangesloten geven aan
                hoeveel garantie ze op reparaties geven. Je kunt dit zien in de
                zoekresultaten, maar ook bij op de profielen. Let op: bij
                waterschade ontvang je normaliter niet meer dan 3 maanden
                garantie en natuurlijk vervalt je garantie zodra er zichtbaar
                schade aan je telefoon is of deze gevallen is. Je kunt per
                reparateur gemakkelijk zien hoeveel garantie ze echt geven en
                vind dit ook terug in je garantiebewijs.
                <br></br>
                <li>
                  <b>
                    Wat kan ik doen als de reparateur en ik het niet eens zijn
                    over de garantie?
                  </b>
                </li>
                Het is vervelend als jij en je reparateur een verschil van
                mening hebben met betrekking tot de reparatie. Mochten jullie er
                samen niet uitkomen dan kun je contact opnemen met ons en zullen
                we hier in bemiddelen. Let wel op: garantie geldt alleen voor de
                reparatie en het gerepareerde onderdeel en vervalt zodra een
                toestel zichtbaar beschadigd is.
              </lu>
              <FaqArticleTitle>Betalen</FaqArticleTitle>
              <lu>
                <li>
                  <b>Waar en hoe moet ik betalen voor mijn reparatie?</b>
                </li>
                Je betaalt bij je reparateur nadat deze je device heeft
                gerepareerd en je tevreden bent met de geleverde prestatie. Let
                op: controleer vantevoren welke betalingsmethoden door je
                reparateur worden geacepteerd.
                <br></br>
                <li>
                  <b>Wat betaal ik voor mijn reparatie?</b>
                </li>
                Je betaalt het bedrag dat vantevoren is afgesproken voor de
                reparatie. Natuurlijk kan dit wijzigen als blijkt dat er een
                andere reparatie nodig is, dit wordt dan vooraf door de
                reparateur met je besproken.
                <br></br>
              </lu>
              <FaqArticleTitle>Cashback</FaqArticleTitle>
              <lu>
                <li>
                  <b>Cashback</b>
                </li>
                bla bla
              </lu>
              <FaqArticleTitle>Reparatie</FaqArticleTitle>
              <lu>
                <li>
                  <b>Hoe lang duurt mijn reparatie?</b>
                </li>
                De duur van je reparatie hangt af van de soort reparatie en de
                beschikbaarheid van de reparateur. Normaal gesproken kunnen de
                meeste reparaties nog op dezelfde dag worden uitgevoerd. Als dat
                niet lukt zal de reparateur dit met je bespreken.
              </lu>
              <FaqArticleTitle>Feedback en klachten</FaqArticleTitle>
              <lu>
                <li>
                  <b>
                    Ik heb feedback of een klacht, hoe kan ik contact met jullie
                    opnemen?
                  </b>
                </li>
                Je kunt ons makkelijk bereiken via onze contact pagina, maar ons
                anders ook een mail sturen naar info@mragain.nl. We proberen dan
                zo snel mogelijk bij je terug te komen.
              </lu>
            </p>
            <br></br>
          </FaqArticleContent>
        </FaqArticle>
      </FaqContent>
    </FaqContainer>
  </FaqSectionArea>
);

export default FaqSection;
