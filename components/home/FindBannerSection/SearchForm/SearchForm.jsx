import "bootstrap/dist/css/bootstrap.min.css";
import "./SearchForm.style.less";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setFindedLocation, setSearchFilter } from "service/search/action.js";

import { CommonText, GreenText, h1 } from "./SearchForm.style.jsx";

const SearchForm = (routerProps) => {
  const { setFindedLocation, setSearchFilter } = routerProps;
  let btnInput = React.createRef();
  const [location, setLocation] = useState("");
  const router = useRouter();

  function handleChange(e) {
    console.log("handleChange is called");
    setLocation(e.target.value);
  }

  function handleKeyPress(e) {
    console.log(e);
    if (e.key === "Enter") {
      btnInput.current.click();
    }
  }

  function onSearch() {
    let loc = location;
    if (loc === "zipcode-error") {
      alert("Er gaat wat fout, klopt je locatie of postcode? ");
      return;
    }
    setFindedLocation(loc);
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
    router.push(
      `/zoek-een-reparateur?position=${loc}&device=${0}&brand=${0}&model=${0}&reparation=${0}`
    );
  }

  return (
    <div
      className="search-form"
      onSubmit={(e) => {
        onSearch();
      }}
    >
      <div className="form-title">
        <h1 className="main-title">
          Vind een betrouwbare telefoon reparateur bij jou in de buurt
        </h1>
        <GreenText />
      </div>
      <div className="form-group">
        <label
          htmlFor="main-search-from"
          style={{
            opacity: 0,
            width: 0,
            height: 0,
          }}
        >
          Woonplaats of postcode
        </label>
        <input
          type="input"
          id={"main-search-from"}
          name={"search"}
          className="form-control"
          placeholder="Woonplaats of postcode"
          value={location}
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyPress={(e) => {
            handleKeyPress(e);
          }}
        />
        <Button
          variant="light-green"
          type="submit"
          ref={btnInput}
          onClick={() => {
            onSearch();
          }}
        >
          Zoek
        </Button>
      </div>
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
    setFindedLocation: (data) => {
      dispatch(setFindedLocation(data));
    },
    setSearchFilter: (data) => {
      dispatch(setSearchFilter(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
