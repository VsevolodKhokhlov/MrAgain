import "./HowSection.style.less";

import React from "react";

import { BACK_END_URL } from "../../../constants.js";
import { HowContainer, HowSectionArea } from "../How.style";
import {
  HowArticle,
  HowArticleContent,
  HowArticleTitle,
  HowContent,
} from "./HowSection.style.jsx";

const HowSection = () => (
  <HowSectionArea className="how-area">
    <HowContainer className="how-container">
      <HowContent>
        <div className="w-100">
          <HowArticleTitle>Hoe werkt het?</HowArticleTitle>
          <HowArticleContent>
            <div className="row mx-0 px-0">
              <div className="col-md-12 px-0 mx-0">
                <span>
                  Op deze pagina lees je alles wat je moet weten om je profiel
                  zo snel mogelijk online te hebben en lees je hoe en wanneer
                  klanten afspraken bij je kunnen maken. Heb je toch nog vragen?
                  Stuur ons een bericht of bel ons en we helpen je graag verder!
                </span>
                <HowArticleTitle>
                  De eerste stappen na account activatie
                </HowArticleTitle>
              </div>
              <div className="row mx-0 px-0 mb-3">
                <div className="col-md-6 px-0 mx-0  text-justify ">
                  <li>
                    <b>1. Ga naar Account Settings en vul je gegevens in</b>
                  </li>
                  Vul hier in ieder geval je adres en contact gegevens in zodat
                  bezoekers je kunnen vinden. Bij afspraak settings geef je aan
                  welke tijd er per afspraak moet worden gereserveerd. Hiermee
                  voorkom je dat er een afspraak wordt gepland ten tijde van een
                  andere afspraak.
                  <br></br>
                  Vind je het prima als er meerdere afspraken tegelijkertijd
                  worden gepland? Vink dan aan dat dubbele afspraken mogelijk
                  zijn.
                </div>
                <div className="col-md-6 ">
                  <img
                    src={BACK_END_URL + "/media/Account_gegevens.jpg"}
                    className="w-100  img-border "
                    alt=""
                  />
                </div>
              </div>
              <div className="row mx-0 px-0 mb-3">
                <div className="col-md-6 px-0 mx-0 text-justify ">
                  <li>
                    <b>2. Ga naar Mijn Profiel</b>
                  </li>
                  Hier heb je de mogelijkheid om iets over je zaak (over ons) te
                  vertellen en een profiel pagina up te loaden. Voor het beste
                  resultaat kies je hier een brede foto.
                  <br></br>
                  <br></br>
                  Bij openingstijden vul je de openingstijden van je winkel in,
                  dit zijn ook automatisch de tijden waarop gebruikers afspraken
                  bij je kunnen inplannen.
                  <br></br>
                  <br></br>
                  Zijn er specifieke dagen waarop je afwijkt van je standaard
                  openingstijen? Geef deze dan aan in de afwijkende
                  openingstijden kalender!
                  <br></br>
                  <br></br>
                </div>
                <div className="col-md-6">
                  <img
                    src={BACK_END_URL + "/media/Mijn_Profiel.jpg"}
                    className="w-100  img-border  "
                    alt=""
                  />
                </div>
              </div>
              <div className="row mx-0 px-0 mb-3">
                <div className="col-md-6 px-0 mx-0 text-justify ">
                  <li>
                    <b>3. Voeg je modellen toe</b>
                  </li>
                  Nu je je account settings en profiel pagina hebt ingeregeld is
                  het tijd om je modellen en reparaties toe te voegen. Ga naar
                  Model & Reparatie beheer. Klik op het apparaat waarvoor je
                  modellen wilt gaan toevoegen.
                  <br></br>
                  Klik op &quot;Wijzig modellen&quot; en selecteer de modellen
                  die je repareert. Sla deze vervolgens op en wacht totdat je
                  ziet dat dit gelukt is.
                </div>
                <div className="col-md-6">
                  <img
                    src={BACK_END_URL + "/media/Modellen_Selecteren.jpg"}
                    className="w-100  img-border "
                    alt=""
                  />
                </div>
              </div>
              <div className="row mx-0 px-0 mb-3">
                <div className="col-md-6 px-0 mx-0 text-justify ">
                  <li>
                    <b>4. Voeg je reparaties toe</b>
                  </li>
                  Het is nu tijd om per model aan te geven welke reparaties je
                  uitvoert en welke prijzen en garantie je hiervoor hanteert. Je
                  hebt hiervoor 2 opties.
                  <br></br>
                  <br></br>
                  1) Je klikt op het model waarvoor je je reparaties wilt
                  beheren en update deze.
                  <br></br>
                  2) Je klikt op &quot;Exporteren&quot; en download een csv file
                  met al je modellen en reparaties. Je vult deze in en
                  importeert deze vervolgens met &quot;Importeren&quot;.
                  <br></br>
                  <br></br>
                  Als je alles voor de eerste keer inregelt werkt het
                  makkelijker met optie 2. Let wel op: het weer importeren kan
                  een tijdje duren omdat er veel data moet worden opgeslagen.
                  <br></br>
                  <br></br>
                </div>
                <div className="col-md-6">
                  <img
                    src={BACK_END_URL + "/media/Reparaties.jpg"}
                    className="w-100  img-border "
                    alt=""
                  />
                </div>
              </div>
              <div className="row mx-0 px-0 mb-4">
                <div className="col-md-6 px-0 mx-0 text-justify ">
                  <li>
                    <b> 5. Je profiel staat live!</b>
                  </li>
                  Je profiel is nu ingevuld en je wordt gevonden op onze
                  website. Let op: indien je nog geen reparaties actief hebt
                  staan, word je niet gevonden.
                </div>
                <div className="col-md-6">
                  <img
                    src={BACK_END_URL + "/media/Profiel_Fixbees.png"}
                    className="w-100  img-border "
                    alt=""
                  />
                </div>
              </div>
            </div>
            <HowArticleTitle>Manage je reparaties</HowArticleTitle>
            <div className="row mx-0 px-0 pb-5">
              <div className="col-md-6 px-0 mx-0 text-justify  mb-4">
                <li>
                  <b>Afspraken ontvangen</b>
                </li>
                Je profiel staat live en je wordt gevonden op onze website.
                Bezoekers kunnen nu een afspraak bij je maken voor de reparatie
                van hun apparaat tijdens je openingstijden.
                <br></br>
                Zodra er een afspraak wordt gemaakt ontvang je daarvan een email
                met de afspraak gegevens. Ook vind je de afspraak terug op je
                Dashboard bij MrAgain.
              </div>
              <div className="col-md-6">
                <img
                  src={BACK_END_URL + "/media/Dashboard.jpg"}
                  className="w-100  img-border "
                  alt=""
                />
              </div>
              <div className="col-md-6" />
            </div>
            <div className="row mx-0 px-0 pb-5">
              <div className="col-md-6 px-0 mx-0 text-justify  ">
                <li>
                  <b>Afspraken beheren</b>
                </li>
                Via je Dashboard kun je je openstaande afspraken beheren. Door
                een afspraak te bewerken kun je de reparatie omschrijven, IMEI
                nummer meegeven, fotos toevoegen en aangeven of de reparatie is
                afgerond.
                <br></br>
                <br></br>
                Dat laatste - reparatie afronden - is belangrijk. Daarna kun je
                de reparatie niet meer bewerken en zodra je een reparatie hebt
                afgerond ontvangt je klant een review verzoek.
                <br></br>
                Ook verplaatst de reparatie naar &quot;reparatie overzicht&quot;
                waardoor je deze altijd makkelijk kunt terugvinden.
              </div>
              <br />
              <br />
              <br />
              <div className="col-md-6">
                <img
                  src={BACK_END_URL + "/media/reparatie_details.png"}
                  className="w-100  img-border "
                  alt=""
                />
              </div>
              <div className="col-md-6" />
            </div>
          </HowArticleContent>
        </div>
      </HowContent>
    </HowContainer>
  </HowSectionArea>
);

export default HowSection;
