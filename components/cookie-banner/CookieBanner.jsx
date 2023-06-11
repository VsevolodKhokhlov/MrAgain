import "./styles.less";

import cookieCutter from "cookie-cutter";
import React, { useState } from "react";

import { CookieMainView } from "./CookieMainView";
import { CookieManageConcentView } from "./CookieManageConcentView";

const getCookieState = (id) => {
  return Boolean(cookieCutter.get(id)) || false;
};

export const CookieBanner = () => {
  const isConcentGiven = cookieCutter.get("rcl_consent_given");

  const [cookiesActive, setCookiesActive] = useState(isConcentGiven === "true");
  const [manageConcent, setManageConcent] = useState(false);
  const [concents, setConcents] = useState([
    {
      id: "rcl_consent_given",
      text: "Standaard cookies",
      active: true,
      description:
        "Deze cookies zijn nodig om onze website te laten functioneren en kunnen we niet uitzetten.",
    },
    {
      id: "rcl_analytics_consent",
      text: "Analytische cookies",
      active: getCookieState("rcl_analytics_consent"),
      description:
        "Deze gebruiken we om je gedrag op onze website te analyseren om zo je ervaring te verbeteren.",
    },
    {
      id: "rcl_functional_consent",
      text: "Functionele cookies",
      active: getCookieState("rcl_functional_consent"),
      description:
        "Deze cookies gebruiken we om de website beter te laten functioneren.",
    },
    {
      id: "rcl_targeting_consent",
      text: "Marketing cookies",
      active: getCookieState("rcl_targeting_consent"),
      description:
        "Deze cookies gebruiken we niet want wij zijn voor een reclame vrije website!",
    },
  ]);

  const onCookiesSet = () => {
    setCookiesActive(true);
  };

  const onAcceptCookies = () => {
    concents.forEach((concent) => {
      cookieCutter.set(concent.id, `true`);
    });
    onCookiesSet();
  };

  const onRejectAll = () => {
    cookieCutter.set("rcl_consent_given", "true");
    onCookiesSet();
  };

  const onSaveSettings = () => {
    concents.forEach((concent) => {
      if (concent.active) {
        cookieCutter.set(concent.id, concent.active);
      }
    });
    onCookiesSet();
  };

  const onConcentChanged = (data) => {
    setConcents((concents) =>
      concents.map((concent) => {
        if (concent.id === data.id) {
          concent.active = data.active;
        }
        return concent;
      })
    );
  };

  if (cookiesActive) {
    return <></>;
  }

  return (
    <div className="cookie-banner">
      {manageConcent ? (
        <CookieManageConcentView
          concents={concents}
          onSaveSettings={onSaveSettings}
          onRejectAll={onRejectAll}
          onConcentChanged={onConcentChanged}
        />
      ) : (
        <CookieMainView
          onAcceptCookies={onAcceptCookies}
          setManageConcent={setManageConcent}
        />
      )}
    </div>
  );
};
