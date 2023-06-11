import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate, Slider } from "antd";
import moment from "moment-timezone";
import React, { useEffect, useMemo } from "react";
import styled from "styled-components";

import GoogleMap from "@/components/search-results/Map/GoogleMap.jsx";
import {
  reviewsFetcher,
  reviewsModal,
} from "@/components/shop-profile/modules";
import { MaxConstraints } from "@/components/styled/layout";
import { SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { useFetcher } from "@/modules/dataFetcher";
import Modal from "@/modules/modal";
import media from "@/utils/media";

//

const REVIEW_MARKS = [
  "price_mark",
  "quality_mark",
  "service_mark",
  "wait_mark",
];

const REVIEW_MARK_TO_LABEL = {
  price_mark: "Prijs",
  quality_mark: "Kwaliteit",
  service_mark: "Personeel",
  wait_mark: "Wachttijd",
};

const NoReview = styled.div`
  max-width: calc(320px - 86px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 14px;
  border-radius: 15px;
`;

const ReviewsWrap = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 0 43px 48px 43px;
  font-size: 11px;
  color: #0d3244;
  font-weight: 500;
  z-index: 100;
  margin: 20px 20px 40px 20px;
  position: relative;

  ${SubTitle} {
    padding: 28px 43px;
    margin: 0 -43px;
    margin-bottom: 25px;
    border-bottom: 1px solid #ddd;
  }

  ${Button} {
    position: absolute;
    bottom: -25px;
    right: 43px;
    min-width: 51px;
    margin: 0;
    padding: 7px 22px;
  }

  ${media.tablet`
    position: absolute;
    min-width: 320px;
    top: 20px;
    left: 0;
    margin: 0;


    ${Button} {
      position: absolute;
      left: 43px;
      right: auto;
    }
  `}
`;

const MainWrap = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

  ${MaxConstraints} {
    position: relative;
  }

  ${ReviewsWrap} {
    display: none;
  }

  ${media.tablet`
    ${ReviewsWrap} {
      display: block;
    }
  `}
`;

const ReviewWrap = styled.div`
  margin-top: 13px;
  white-space: nowrap;

  .ant-rate {
    margin-right: 10px;
  }
`;

const OverallWrap = styled.div`
  margin: -21px -20px 30px;
  padding: 30px;
  background-color: #06c987;
  color: #fff;

  h2 {
    color: #fff;
    font-size: 17px;
  }

  d-list {
    display: block;
    font-size: 30px;
    display: flex;
    align-items: center;
    margin: 0;

    d-def {
      display: block;
      margin: 0;
      font-size: 11px;
      width: 40px;
      margin-left: 5px;
    }
  }

  .ant-rate-star-zero .anticon {
    color: #06b279;
  }

  .ant-rate {
    margin-right: 10px;
  }
`;

const OverallContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  hr {
    height: 40px;
    border-left: 1px solid #fff;
    width: 0px;
    margin: 0 20px;
  }
`;

function formatNumber(no) {
  if (typeof no !== "number") {
    return no;
  }
  return no.toLocaleString("en", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

const ModalReviewWrap = styled.div`
  background-color: #fafafa;
  padding: 20px;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 13px;
  color: #0d3244;

  ${media.tablet`
    display: flex;
    justify-content: space-between;

    ${ReviewWrap} {
      display: flex;
      justify-content: flex-end;

      .ant-rate {
       margin-left: 10px;
      }
    }
  `}

  ${ReviewWrap} {
    margin-top: 4px;
    font-size: 11px;
  }

  h4 {
    color: #0d3244;
    font-size: 16px;
    margin: 0;
  }

  date {
    color: #78afdd;
    font-size: 10px;
  }

  p {
    color: #707070;
  }
`;

export function Reviews({ shop }) {
  const { data: options } = useFetcher({
    dataFetcher: reviewsFetcher,
    identifier: shop.id,
  });
  const scores = useMemo(() => {
    const totals = (options || []).reduce(
      (accumulator, review) => {
        REVIEW_MARKS.forEach((key) => {
          accumulator[key] = accumulator[key] + review[key];
        });
        return accumulator;
      },
      {
        price_mark: 0,
        quality_mark: 0,
        service_mark: 0,
        wait_mark: 0,
      }
    );

    const scores = REVIEW_MARKS.reduce((accumulator, key) => {
      accumulator[key] = totals[key] / options?.length || 0;
      return accumulator;
    }, {});

    const totalScore = REVIEW_MARKS.reduce((accumulator, key) => {
      return accumulator + scores[key];
    }, 0);

    scores.overall = totalScore / REVIEW_MARKS.length;

    return scores;
  }, [options]);

  const recomandations = useMemo(() => {
    return (options || []).reduce((accumulator, review) => {
      return accumulator + (review.recommend === "1" ? 1 : 0);
    }, 0);
  }, [options]);

  const checkIfScoresExist = (scoresList, reviews) => {
    return reviews.filter((key) => scoresList[key] !== 0).length === 0;
  };

  function renderReview(review) {
    return (
      <ModalReviewWrap>
        <div>
          <h4>{review.client_name}</h4>
          <date>{moment(review.created_at).format("DD MMMM YYYY")}</date>
          <p>{review.testmonial}</p>
        </div>
        <div>
          {REVIEW_MARKS.map((key) => (
            <ReviewWrap>
              <span>{REVIEW_MARK_TO_LABEL[key]}</span>
              <div>
                <Rate
                  disabled
                  style={{ fontSize: "13px" }}
                  value={review[key]}
                  onChange={null}
                />{" "}
                {formatNumber(review[key])}
              </div>
            </ReviewWrap>
          ))}
        </div>
      </ModalReviewWrap>
    );
  }

  const optionsCount = options?.length || 0;

  return (
    <ReviewsWrap>
      <SubTitle as="h2">Reviews {shop?.name}</SubTitle>
      {checkIfScoresExist(scores, REVIEW_MARKS) ? (
        <NoReview>
          <strong>
            Deze reparateur heeft nog geen reviews. Schrijf jij de eerste? Dan
            krijg je 7,50 euro cashback.
          </strong>
        </NoReview>
      ) : (
        <>
          <ReviewWrap>
            <strong>Gemiddelde rating</strong>
            <div>
              <Rate
                disabled
                style={{ fontSize: "13px" }}
                value={scores.overall}
                onChange={null}
              />{" "}
              {formatNumber(scores.overall)}
            </div>
          </ReviewWrap>
          {REVIEW_MARKS.map((key) => (
            <ReviewWrap key={key}>
              {REVIEW_MARK_TO_LABEL[key]}
              <div>
                <Rate
                  disabled
                  style={{ fontSize: "13px" }}
                  value={scores[key]}
                  onChange={null}
                />{" "}
                {formatNumber(scores[key])}
              </div>
            </ReviewWrap>
          ))}
          <ReviewWrap>
            <strong>Aanbevelingspercentage</strong>
            <div>
              <Slider readOnly value={(recomandations / optionsCount) * 100} />{" "}
            </div>
          </ReviewWrap>

          <Button onClick={reviewsModal.actions.open} aria-label="Meer reviews">
            Bekijk reviews <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </>
      )}
      <Modal
        module={reviewsModal}
        footer={null}
        title={<SubTitle>Onze reviews</SubTitle>}
      >
        <OverallWrap>
          <h2>Gemiddelde rating</h2>
          <OverallContent>
            <d-list>
              <d-term>{formatNumber(scores.overall)}</d-term>
              <d-def>van 5 sterren</d-def>
            </d-list>
            <hr />
            <div>
              <Rate
                disabled
                style={{ fontSize: "13px" }}
                value={scores.overall}
                onChange={null}
              />
              <div>van {optionsCount} reviews</div>
            </div>
          </OverallContent>
        </OverallWrap>
        {(options || []).map(renderReview)}
      </Modal>
    </ReviewsWrap>
  );
}

export default function ShopMap({ shop }) {
  useEffect(() => {
    reviewsFetcher.key(`${shop.id}`).fetch();
  }, [shop.id]);

  return (
    <MainWrap>
      <MaxConstraints>
        <Reviews shop={shop} />
      </MaxConstraints>
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: shop.geo_lat, lng: shop.geo_long }}
        shopList={[shop]}
      />
    </MainWrap>
  );
}
