import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchForm.style.less";

import { message } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, input, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { setFindedLocation, setSearchFilter } from "service/search/action.js";
import { searchShopFilter } from "service/search/operations.js";

import lib from "@/assets/js/lib";

import { CommonText, GreenText } from "./SearchForm.style.jsx";

const SearchForm = (routerProps) => {
  const { findShopbyFilter, setFindedLocation, setSearchFilter } = routerProps;
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleChange(e) {
    setLocation(e.target.value);
  }

  function onSearch() {
    let loc = location;
    if (loc === "zipcode-error") {
      alert("Er gaat wat fout, klopt je locatie of postcode?");
      return;
    }
    setFindedLocation(loc);
    if (location !== "") {
      let filter = {
        location: loc,
        distance: 0,
        phone: 0,
        brand: 0,
        model: 0,
        reparation: 0,
        price: -1,
        guarantee: -1,
        sort: 0,
      };
      let _filters = {
        isSearchFilter: false,
        filters: {
          location: "",
          device: null,
          brand: null,
          model: null,
          reparation: null,
        },
      };
      setSearchFilter(_filters);
      findShopbyFilter(filter);
    }
    router.push("/zoek-een-reparateur");
  }

  const [show, setShow] = useState(false);

  return (
    <div
      className="search-form"
      onSubmit={(e) => {
        onSearch();
      }}
    >
      <div className="form-title">
        <CommonText>Altijd een werkende telefoon</CommonText>{" "}
        <GreenText></GreenText>
      </div>
      <div className="form-subtitle">
        <GreenText>Vind de beste reparateur bij jou in de buurt</GreenText>
      </div>
      <div className="form-group">
        <input
          type="input"
          className="form-control"
          placeholder="Woonplaats of postcode"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Button
          variant="light-green"
          type="submit"
          onClick={() => {
            onSearch();
          }}
        >
          Zoek
        </Button>
      </div>

      {/* <Modal show={show} onHide={handleClose} className="search-result-modal">
        <Modal.Header closeButton>
          <Modal.Title>Find Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {shoplist.map(shop => {
            return (
              <p>
                `ShopName: {shop.name} - Zip code: {shop.zipcode} - distance:{" "}
                {shop.distance}km - latitude: {shop.geo_lat} - longitude:{" "}
                {shop.geo_long} `
              </p>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  shoplist: state.search.list,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    findShopbyFilter: (data) => {
      searchShopFilter(data, dispatch);
    },
    setFindedLocation: (data) => {
      dispatch(setFindedLocation(data));
    },
    setSearchFilter: (data) => {
      dispatch(setSearchFilter(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
