import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TestmonialCarousel.style.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Slider from "react-slick";

import next from "@/assets/images/next-arrow.jpg";
import prev from "@/assets/images/prev-arrow.jpg";

export default function TestimonialCarousel() {
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span {...props}>{children}</span>
  );
  const prevArrow = (
    <SlickButtonFix>
      <img src={prev} alt="" />
    </SlickButtonFix>
  );
  const nextArrow = (
    <SlickButtonFix>
      <img src={next} alt="" />
    </SlickButtonFix>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
  };

  return (
    <div className="container">
      <Slider {...settings}>
        <div>
          <div>
            <p>
              Via MrAgain heb ik snel een goede telefoon reparateur bij mij in
              de buurt kunnen vinden. Een afspraak maken was zo gepiept.
            </p>
            <p>
              Na de scherm reparatie ontving ik een garantie bewijs in mijn
              email, maar deze heb ik niet nodig gehad, hij doet het perfect!
            </p>
            <p>
              Ik kan iedereen die een telefoon reparateur zoekt MrAgain van
              harte aanbevelen!
            </p>
          </div>
          <div className="testmonial-icon">
            <FontAwesomeIcon
              className="icon-xxl"
              icon={["fas", "quote-right"]}
            />
          </div>
          <div className="testmonial-footer">
            <p>Janneke - Iphone 6 scherm reparatie</p>
            <p>Utrecht</p>
          </div>
        </div>
        <div>
          <div>
            <p>
              Mijn telefoon was goed kapot doordat deze in een plas water was
              gevallen. Via MrAgain kon ik makkelijk zien wie waar ze
              waterschade behandelingen uitvoeren.
            </p>
            <p>
              Na het bekijken van enkele reviews heb ik een reparatie, gepland
              bij een telefoon reparateur bij mij in de buurt.
            </p>
            <p>
              De telefoon is perfect gerepareerd en de mensen waren erg
              vriendelijk, ik ga zeker terug!
            </p>
          </div>
          <div className="testmonial-icon">
            <FontAwesomeIcon
              className="icon-xxl"
              icon={["fas", "quote-right"]}
            />
          </div>
          <div className="testmonial-footer">
            <p>Bram - Samsung Galaxy A50 waterschade</p>
            <p>Rotterdam</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}
