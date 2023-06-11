import "bootstrap/dist/css/bootstrap.min.css";
import "./ReviewCheckOut.less";

import { Button, Progress, Rate } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

import StarRatingInfo from "@/components/global/StarRatingInfo/StarRatingInfo";

const ReviewCheckOut = (routerProps) => {
  const [price_mark, setPriceMark] = useState(0);
  const [quality_mark, setQualityMark] = useState(0);
  const [service_mark, setServiceMark] = useState(0);
  const [wait_mark, setWaitMark] = useState(0);
  const [aver_mark, setAverMark] = useState(0);
  const [recommend, setRecommend] = useState(0);
  const [recomPercent, setRecomPercent] = useState(0);
  const [isinit, setIsInit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { shopReviews, account_profile } = routerProps;

  function initMarks() {
    let price = 0;
    let quality = 0;
    let service = 0;
    let wait = 0;
    let recom = 0;
    let aver_marks = [];
    if (shopReviews.length > 0) {
      shopReviews.map((el) => {
        price += parseInt(el.price_mark);
        quality += parseInt(el.quality_mark);
        service += parseInt(el.service_mark);
        wait += parseInt(el.wait_mark);
        aver_marks.push(
          (parseInt(el.price_mark) +
            parseInt(el.quality_mark) +
            parseInt(el.service_mark) +
            parseInt(el.wait_mark)) /
            4
        );
        if (parseInt(el.recommend) === 1) {
          recom += 1;
        }
        return recom;
      });
      let count = shopReviews.length;
      let aver_mk = aver_marks.reduce((a, b) => a + b, 0) / count;

      let tmp = (price / count).toFixed(1);
      setPriceMark(tmp);

      tmp = (quality / count).toFixed(1);
      setQualityMark(tmp);

      tmp = (service / count).toFixed(1);
      setServiceMark(tmp);

      tmp = (wait / count).toFixed(1);
      setWaitMark(tmp);

      setAverMark(aver_mk.toFixed(1));
      setRecommend(count);
      setRecomPercent((recom / count).toFixed(2) * 100);
      setIsInit(true);
    } else {
      setPriceMark(0);
      setQualityMark(0);
      setServiceMark(0);
      setWaitMark(0);
      setAverMark(0);
      setRecommend(0);
      setRecomPercent(0);
    }
  }

  function handleCheckOutModal() {
    setShowModal(true);
  }
  const handleClose = () => {
    setShowModal(false);
  };

  const initPercent = () => {
    return <div>100%</div>;
  };

  useEffect(() => {
    initMarks();
  }, [account_profile, shopReviews]);

  return (
    <div className="review-check-out">
      <div className="review-wrap">
        <div className="review-title">Reviews</div>
        <div className="average-mark">
          <div className="title">
            {aver_mark}({recommend})
          </div>
          <div className="star">
            <Rate value={parseInt(aver_mark)} className="star-rate" />
          </div>
        </div>
        <div className="price-mark">
          <div className="title">Prijs {price_mark}</div>
          <div className="star">
            <Rate value={parseInt(price_mark)} className="star-rate" />
          </div>
        </div>
        <div className="quality-mark">
          <div className="title">Kwaliteit {quality_mark}</div>
          <div className="star">
            <Rate value={parseInt(quality_mark)} className="star-rate" />
          </div>
        </div>
        <div className="friendliness-mark">
          <div className="title">Personeel {service_mark}</div>
          <div className="star">
            <Rate value={parseInt(service_mark)} className="star-rate" />
          </div>
        </div>
        <div className="waittime-mark">
          <div className="title">Wachttijd {wait_mark}</div>
          <div className="star">
            <Rate value={parseInt(wait_mark)} className="star-rate" />
          </div>
        </div>
        <div className="recomend-percent">
          <div className="title">Aanbevelings percentage</div>
          <div className="percent">
            <Progress percent={parseInt(recomPercent)}></Progress>
            {recomPercent === 100 && initPercent()}
          </div>
        </div>
        <Button
          className="check-out-btn"
          onClick={() => {
            handleCheckOutModal();
          }}
        >
          Bekijk reviews
        </Button>
        <Modal
          show={showModal}
          onHide={handleClose}
          className="search-result-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <div className="review-history-modal">
                <div className="review-history-modal-header">
                  <div className="header-title">{account_profile.name}</div>
                  <div className="header-rate-info-bar">
                    <div className="header-rate-info-star">
                      <StarRatingInfo rate={account_profile.mark} />
                    </div>
                  </div>
                </div>
                <div className="review-history-modal-content">
                  {showModal === true &&
                    shopReviews.length > 0 &&
                    shopReviews.reverse().map((el) => {
                      let m = moment(el.created_at);
                      let date = m.format("DD-MM-YYYY");
                      return (
                        <div key={el.client_name} className="review-card">
                          <div className="client-name-title">
                            <div className="client-name">
                              <h5>{el.client_name}</h5>
                            </div>
                            <div>
                              <h6>{date}</h6>
                            </div>
                          </div>
                          <div className="review-card-body">
                            <div className="price-mark">
                              <div className="title">Prijs </div>
                              <div className="star">
                                <StarRatingInfo rate={el.price_mark} />
                              </div>
                            </div>
                            <div className="price-mark">
                              <div className="title">Kwaliteit</div>
                              <div className="star">
                                <StarRatingInfo rate={el.quality_mark} />
                              </div>
                            </div>
                            <div className="price-mark">
                              <div className="title">Personeel</div>
                              <div className="star">
                                <StarRatingInfo rate={el.service_mark} />
                              </div>
                            </div>
                            <div className="price-mark">
                              <div className="title">Wachttijd </div>
                              <div className="star">
                                <StarRatingInfo rate={el.wait_mark} />
                              </div>
                            </div>
                          </div>
                          <div className="review-card-comment">
                            {el.testmonial}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sluit venster
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shopReviews: state.account.account_review,
  account_profile: state.account.shop_account_profile,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCheckOut);
