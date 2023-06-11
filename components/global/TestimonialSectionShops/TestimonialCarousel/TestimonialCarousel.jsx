import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./TestimonialCarousel.style.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Slider from "react-slick";

import next from "@/assets/images/next-arrow.jpg";
import prev from "@/assets/images/prev-arrow.jpg";

export default function TestimonialCarousel() {
  const prevArrow = <img src={prev} alt="" />;
  const nextArrow = <img src={next} alt="" />;
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
              Door de samenwerking met MrAgain hoeven we ons minder zorgen te
              maken om onze marketing. Klanten maken afspraken bij ons
            </p>
            <p>
              doordat ze de goede reviews en voorwaarden zien. Hierdoor kunnen
              wij ons focussen op waar we echt goed in zijn.
            </p>
            <p>Dat is het repareren van jouw device!</p>
          </div>
          <div className="testimonial-icon">
            <FontAwesomeIcon
              className="icon-xxl"
              icon={["fas", "quote-right"]}
            />
          </div>
          <div className="testimonial-footer mt-3">
            <p>Jan</p>
            <p>Utrecht</p>
          </div>
        </div>
        <div>
          <div>
            <p>
              Sinds we op MrAgain staan hebben we veel meer online afspraken dan
              daarvoor. Dit helpt ons doordat we vantevoren weten wie er langs
            </p>
            <p>
              komt in de zaak. We hebben alle materialen dan op voorhand, en
              mocht dat niet zo zijn dan regelen we het snel.
            </p>
            <p>Voor ons is MrAgain tot nu toe een echte verademing!</p>
          </div>
          <div className="testimonial-icon">
            <FontAwesomeIcon
              className="icon-xxl"
              icon={["fas", "quote-right"]}
            />
          </div>
          <div className="testimonial-footer mt-3">
            <p>Marcel</p>
            <p>Den Haag</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}
