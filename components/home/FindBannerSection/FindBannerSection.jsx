import Image from "next/image";
import React from "react";

import { BannerSection } from "./FindBannerSection.style.jsx";
import SearchForm from "./SearchForm/SearchForm.jsx";

const FindBannerSection = () => {
  return (
    <BannerSection>
      <Image
        src={"/telefoon-reparatie.jpg"}
        layout="fill"
        objectFit="cover"
        loading={"eager"}
        priority={true}
        quality={50}
        // sizes={[300,650,1000]}
        sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
        alt={"Telefoon Reparatie"}
      />
      <SearchForm className="banner-section" />
    </BannerSection>
  );
};

export default FindBannerSection;
