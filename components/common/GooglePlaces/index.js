import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styled from "styled-components";

const googleMapsApiKey = "AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE";

const MainWrap = styled.div`
  .ant-select-selection__placeholder {
    padding-left: 22px;
  }

  * {
    font-size: 12px !important;
  }

  .ant-select {
    width: 100%;
  }

  .ant-input-prefix {
    color: #d9d9d9;
  }
`;

let scriptLoaded = false;
export const loadScript = () => {
  const url = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places,geocode`;
  const script = document.getElementById("google-places");
  if (script) {
    if (scriptLoaded) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      script.onload = () => {
        scriptLoaded = true;
        resolve();
      };
    });
  }

  return new Promise((resolve) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "google-places";
    function onResolve() {
      scriptLoaded = true;
      resolve();
    }

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          onResolve();
        }
      };
    } else {
      script.onload = () => onResolve();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};

export async function getLongAndLat(location) {
  if (!location) {
    return {
      long: 0,
      lat: 0,
    };
  }

  try {
    await loadScript();
    const [result] = await geocodeByAddress(location);
    const res = await getLatLng(result);
    const { lng, lat } = res;

    return {
      long: lng,
      lat,
      res,
    };
  } catch (err) {
    return {};
  }
}

export default function GooglePlaces({
  value,
  onChange,
  isPrefix = true,
  size,
  placeholder = "Stad of postcode",
  onLocationSelected,
  disabled,
  searchOptions = {
    componentRestrictions: {
      country: ["nl", "be"],
    },
  },
}) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadScriptAction = async () => {
      await loadScript();
      await setScriptLoaded(true);
    };

    if (!scriptLoaded) {
      loadScriptAction();
    }
  }, []);

  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);

  if (!scriptLoaded) {
    return (
      <MainWrap>
        <AutoComplete size={size} placeholder={placeholder}>
          <Input
            prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            aria-label={"Postcode of stad"}
            onFocus={async () => {
              await loadScript();
              setScriptLoaded(true);
            }}
          />
        </AutoComplete>
      </MainWrap>
    );
  }

  return (
    <MainWrap>
      <PlacesAutocomplete
        value={searchTerm}
        onChange={setSearchTerm}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, loading }) => {
          const { onChange: onSearch } = getInputProps();
          return (
            <AutoComplete
              dataSource={suggestions.map((suggestion) => ({
                text: suggestion.description,
                value: suggestion.description,
              }))}
              disabled={disabled}
              value={searchTerm}
              size={size || "small"}
              placeholder={placeholder}
              loading={loading}
              allowClear={true}
              dropdownStyle={{ minWidth: "320px" }}
              onSelect={(description) => {
                getLongAndLat(description).then(
                  (res) => onLocationSelected && onLocationSelected(res)
                );
                setSearchTerm(description);
                onChange(description);
              }}
              onChange={(value) => {
                if (!value) {
                  onChange(value);
                }
              }}
              onSearch={(value) => onSearch({ target: { value } })}
            >
              {isPrefix && (
                <Input
                  prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                  aria-label={"Postcode of stad"}
                />
              )}
            </AutoComplete>
          );
        }}
      </PlacesAutocomplete>
    </MainWrap>
  );
}
