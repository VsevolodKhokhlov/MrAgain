import "./geef-een-review.less";

import { Button, Input, message, Radio, Rate } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  checkReviewPage,
  createReview,
} from "service/appointments/operations.js";

import shopReviewIcon from "@/assets/images/shop-review.png";
import DefaultLayout from "@/components/layouts/Homepage";

const CheckoutReview = (routerProps) => {
  const [shopInfo, setShopInfo] = useState({});
  const [isLoad, setLoad] = useState(false);
  const { location, createReview, checkReviewPage } = routerProps;
  const [review, setReview] = useState({
    price_mark: 0,
    quality_mark: 0,
    service_mark: 0,
    wait_mark: 0,
    recommend: 1,
    client_name: "",
    testmonial: "",
    shop: 0,
  });

  console.log("shopInfo", shopInfo);
  const router = useRouter();
  const { TextArea } = Input;

  useEffect(() => {
    if (isLoad === false) {
      parseArgument(router.query);
      setLoad(true);
    }
  }, []);

  async function validationReviewPage(_data) {
    let _auth = {
      uid: _data.uid,
      token: _data.token,
    };
    let status = await checkReviewPage(_auth);
    if (status !== true) {
      alert("Je hebt al een review gegeven, bedankt!");
      router.push("/");
    }
    return;
  }

  function parseArgument(str) {
    console.log(str);
    let _data = {
      email: "",
      shop: 0,
      shop_name: "",
      avatar: "",
    };
    if (str !== null) {
      if (str.uid !== "" && str.uid !== null) {
        _data.uid = str.uid;
      }
      if (str.token !== "" && str.token !== null) {
        _data.token = str.token;
      }
      if (str.email !== "" && str.email !== null) {
        _data.email = str.email;
      }
      if (str.shop !== "" && str.shop !== null) {
        _data.shop = str.shop;
      }
      if (str.avatar !== "" && str.avatar !== null) {
        _data.avatar = str.avatar;
      }
      if (str.shop_name !== "" && str.shop_name !== null) {
        _data.shop_name = str.shopname;
      }
    }
    setShopInfo(_data);
    validationReviewPage(_data);
  }

  function handleRateChange(e, tarName) {
    let obj = review;
    setReview({ ...obj, [tarName]: e });
  }

  function makeid(length) {
    // var result = "";
    // var characters =
    //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // var charactersLength = characters.length;
    // for (var i = 0; i < length; i++) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    return "Anoniem";
  }

  function handleClientChange(value) {
    if (value === 2) {
      let obj = review;
      let client_name = "client_name";
      setReview({ ...obj, [client_name]: makeid(5) });
    }
  }

  async function submitReview() {
    let _data = review;
    _data.shop = shopInfo.shop;
    let _auth = {
      uid: shopInfo.uid,
      token: shopInfo.token,
    };
    if (_data.client_name.length < 1) {
      alert("Vul a.u.b. je naam in of selecteer de anonieme optie");
    } else {
      let status = await createReview(_auth, _data);
      if (status === true) {
        message.success("Je review is verzonden, bedankt!", [2.5]);
      } else {
        alert("Het lijkt erop dat je al een review gegeven hebt.");
      }
      router.push("/");
    }
  }

  return (
    <DefaultLayout>
      <div className="checkout-review-page">
        <div className="checkout-review-page-container">
          <div className="checkout-review-page-main">
            <div className="checkout-review-page-main-title">
              Geef je mening
            </div>
            <div className="checkout-review-board">
              <div className="checkout-review-board-title">
                <img
                  src={
                    typeof shopInfo.avatar !== "undefined"
                      ? shopInfo.avatar
                      : shopReviewIcon
                  }
                  className="shop-review-icon"
                  alt="Logo"
                />
              </div>
              <div>
                <div className="shop-name">{shopInfo.shop_name}</div>
                <div className="rate-mark">
                  <div className="title">Prijs</div>
                  <div className="star">
                    <Rate
                      value={review.price_mark}
                      className="star-rate"
                      name="price_mark"
                      onChange={(e) => {
                        handleRateChange(e, "price_mark");
                      }}
                    />
                  </div>
                </div>
                <div className="rate-mark">
                  <div className="title">Kwaliteit</div>
                  <div className="star">
                    <Rate
                      value={review.quality_mark}
                      className="star-rate"
                      name="quality_mark"
                      onChange={(e) => {
                        handleRateChange(e, "quality_mark");
                      }}
                    />
                  </div>
                </div>
                <div className="rate-mark">
                  <div className="title">Personeel</div>
                  <div className="star">
                    <Rate
                      value={review.service_mark}
                      className="star-rate"
                      name="service_mark"
                      onChange={(e) => {
                        handleRateChange(e, "service_mark");
                      }}
                    />
                  </div>
                </div>
                <div className="rate-mark">
                  <div className="title">Wachttijd</div>
                  <div className="star">
                    <Rate
                      value={review.wait_mark}
                      className="star-rate"
                      name="wait_mark"
                      onChange={(e) => {
                        handleRateChange(e, "wait_mark");
                      }}
                    />
                  </div>
                </div>
                <div className="recommend">
                  <div className="title">Beveel je deze reparateur aan?</div>
                  <Radio.Group
                    defaultValue={1}
                    onChange={(e) => {
                      handleRateChange(e.target.value, "recommend");
                    }}
                  >
                    <Radio value={1}>Ja</Radio>
                    <Radio value={0}>Nee</Radio>
                  </Radio.Group>
                </div>
                <div className="client-name-input-group">
                  <Radio.Group
                    defaultValue={1}
                    onChange={(e) => {
                      handleClientChange(e.target.value);
                    }}
                  >
                    <Radio value={1}>
                      <Input
                        placeholder="Je naam"
                        onChange={(e) => {
                          handleRateChange(e.target.value, "client_name");
                        }}
                      />
                      <span className="client-name-margin">Of</span>
                    </Radio>
                    <Radio value={2}>Review anoniem</Radio>
                  </Radio.Group>
                </div>
                <div className="comment-input">
                  <TextArea
                    rows={4}
                    placeholder="Schrijf hier je commentaar"
                    onChange={(e) => {
                      handleRateChange(e.target.value, "testmonial");
                    }}
                  />
                </div>
                <Button
                  className="submit-review"
                  onClick={() => {
                    submitReview();
                  }}
                >
                  Verzend review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    checkReviewPage: (_auth) => checkReviewPage(_auth, dispatch),
    createReview: (_auth, data) => createReview(_auth, data, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutReview);
