import {
  faMapMarkerAlt,
  faSortAmountDown,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio, Rate, Slider, Switch } from "antd";
import isEqual from "fast-deep-equal";
import moment from "moment";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Waypoint } from "react-waypoint";
import styled, { css } from "styled-components";

import GooglePlaces, { loadScript } from "@/components/common/GooglePlaces";
import { TAG_TO_COLOR } from "@/components/home/ShopsSection";
import DefaultLayout from "@/components/layouts/Homepage";
import Map from "@/components/search-results/Map";
import {
  brandFetcher,
  deviceFetcher,
  filtersFormModule,
  modelFetcher,
  refineSearchModal,
  serviceFetcher,
  shopListModule,
} from "@/components/search-results/modules";
import { FieldWrap } from "@/components/styled/Forms";
import { MaxConstraints } from "@/components/styled/layout";
import { SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { TextButton } from "@/components/ui/Button";
import { MobileRadioButtons } from "@/components/ui/MobileRadioButtons";
import Select from "@/components/ui/Select";
import { store, wrapper } from "@/configureStore";
import { createSelectComponent } from "@/modules/dataFetcher";
import Form, { useFormContext } from "@/modules/forms";
import {
  Field,
  parseNativeEvent,
  SyncFormValues,
} from "@/modules/forms/Blocks";
import List, { useListContext } from "@/modules/list";
import { Listing, NoResults } from "@/modules/list/Blocks.js";
import Modal from "@/modules/modal/index.js";
import media, { OnMobile } from "@/utils/media.js";
import { getShopLogo, getShopRoute } from "@/utils/shop";

import { FRONT_END_URL } from "../constants.js";

//

const MainWrap = styled.div`
  margin-bottom: -127px;
  background: #f3f3f3;
  padding-bottom: 30px;
  position: relative;

  > div {
    display: flex;
  }

  ${media.tablet`
    padding-bottom: 0px;
    background: linear-gradient(to right, #fff 30%, #f3f3f3 30%);
  `}
`;

const Sidebar = styled.div`
  flex-basis: 200px;
  padding: 0 30px 30px 0;
  background-color: #fff;
  display: none;
  ${media.tablet`
    display: block;
  `}
`;

const SidebarInnerWrap = styled.div`
  position: sticky;
  top: 0;

  .ant-slider-mark {
    font-size: 10px;
  }
`;

const MapTriggerWrap = styled(FieldWrap)`
  > label {
    margin-top: 0;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  height: 75px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  justify-content: space-between;
  margin: 0 -30px 30px 0;

  ${SubTitle} {
    margin-bottom: 0;
  }

  ${TextButton} {
    font-size: 11px;
    letter-spacing: 0px;
    color: #ed1c24;
    font-weight: 300;
    margin-right: 10px;
    text-transform: none;
    height: auto;
    line-height: 1em;
  }
`;

const ModelFields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 19px 0;
  overflow: hidden;
  width: 100%;

  > div {
    flex-grow: 1;
    width: 100%;
    margin-top: 0 !important;
    margin: 10px 0;
    background-color: #fff;

    &[disabled] {
      background-color: #f5f5f5;
    }

    > label {
      margin: 11px 11px 2px 11px;
    }
  }

  > div:first-child {
    background-color: transparent;
  }

  .ant-radio-group {
    max-width: 100%;
  }

  .ant-radio-button-wrapper {
    background-color: transparent;
    color: #fff;
    border: 0;
    padding: 0 11px;
    border-radius: 6px !important;
  }
  .menu-item-wrapper.active .ant-radio-button-wrapper {
    color: #000;
    background-color: #fff;
  }

  > ${MapTriggerWrap} {
    display: none;
    flex-grow: 0;
    background-color: transparent;
    width: auto;

    > label {
      margin-top: 0;
    }
  }

  ${media.tablet`
    flex-direction: row;
    align-items: center;
    margin: 19px -5px;
    > div {
      margin: 0 5px;
    }

    > div:first-child {
      background-color: #fff;
    }

    > ${MapTriggerWrap} {
      display: block;
    }
  `}
`;

const ZipFields = styled.div`
  display: flex;
  align-items: center;
  border-radius: 27px;
  background-color: #fff;
  height: 55px;
  justify-content: space-between;
  background-color: #06b279;

  input {
    border: 0;
    background-color: transparent;
  }

  .ant-select-selection__placeholder {
    color: #fff;
  }

  .ant-select-selection {
    background-color: transparent;
    color: #fff;
  }

  .ant-input-prefix {
    color: #fff;
  }

  > div {
    margin-top: 0 !important;
  }

  hr {
    display: none;
    height: 41px;
    border: 0;
    border-left: 1px solid #ddd;
    margin: 0 30px;
  }

  .svg-inline--fa {
    margin-right: 8px;
  }

  ${FieldWrap} {
    display: flex;
    align-items: center;
    margin: 0;

    > label {
      display: none;
      margin-bottom: 0;
      margin-right: 10px;
    }
  }

  ${media.tablet`
    border-radius: 5px;
    background-color: #fff;
    height: 70px;

    input {
      ::placeholder {
        color: rgba(0, 0, 0, 0.65);
      }
    }

    .ant-select-selection {
      color: rgba(0, 0, 0, 0.65);
    }

    .ant-input-prefix {
      color: rgba(0, 0, 0, 0.65);
    }

    ${FieldWrap} {
      margin: 0 20px;

      > label {
        display: block;
      }
    }

    hr {
      display: block;
    }
  `}
`;

const MobileSearchWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 11;
  display: flex;
  align-items: center;
  padding: 10px 20px 20px;
  background: linear-gradient(to bottom, #f3f3f3 90%, transparent 100%);

  ${ZipFields} {
    background-color: #fff;

    input {
      border: 0;
      background-color: transparent;
    }

    .ant-select-selection__placeholder {
      color: rgba(0, 0, 0, 0.65);
    }

    .ant-select-selection {
      color: rgba(0, 0, 0, 0.65);
    }

    .ant-input-prefix {
      color: rgba(0, 0, 0, 0.65);
    }
  }
`;

const Content = styled.div`
  background-color: #f3f3f3;
  flex-grow: 1;
  padding: 0;
  max-width: 100%;

  > form {
    margin: 0 -20px;
    padding: 30px 20px 0;
    position: relative;
    overflow: hidden;
    min-height: 220px;

    > div {
      position: relative;
      z-index: 1;
    }

    &:after {
      background-color: #06c987;
      content: "";
      width: 200%;
      height: 100%;
      position: absolute;
      top: -20%;
      left: -50%;
      border-radius: 400%;
    }
  }

  ${media.tablet`
    padding: 50px;
    margin-right: -43px;

    form:after {
      display: none;
    }
  `}
`;

const ModelFieldsMobile = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #fff;
  align-items: center;
  border-radius: 15px;
  justify-content: space-between;

  .ant-select {
    margin-left: -11px;
  }

  hr {
    height: 41px;
    border: 0;
    border-left: 1px solid #ddd;
    width: 0;
    margin: 0 10px;
  }

  > div {
    width: 100%;
  }
`;

const selectedMixin = css`
  box-shadow: 0 0 0 2px #06c987;
  background-color: #e6f9f3;
`;

const ShopWrap = styled.div`
  height: 125px;
  border-radius: 10px;
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    ${selectedMixin}
  }

  ${(props) => props.isSelected && selectedMixin}

  ${media.tablet`
    height: 190px;
    padding: 20px;
  `}
`;

const ShopImageWrap = styled.div`
  min-width: 105px;
  height: 105px;
  border-radius: 5px;
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;

  ${media.tablet`
    min-width: 150px;
    height: 150px;
    border-radius: 15px;
  `}

  d-def {
    position: absolute;
    bottom: 6px;
    right: 6px;
    font-size: 10px;
    line-height: 25px;
    border-radius: 3px;
    background-color: #fff;
    padding: 0 8px;
  }
`;

const ShopDetails = styled.div`
  margin-left: 21px;
  flex-grow: 1;

  tag {
    position: absolute;
    top: 15px;
    left: 0;
    display: inline-block;
    font-size: 8px;
    height: 26px;
    background-color: #ddd;
    color: #fff;
    line-height: 26px;
    padding: 0 10px;
    border-radius: 15px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    text-transform: uppercase;
    margin: 0 1px 14px 1px;

    &[data-ffd342] {
      background-color: #ffd342;
    }
    &[data-c90648] {
      background-color: #c90648;
    }
    &[data-06c987] {
      background-color: #06c987;
    }

    &[data-0076a3] {
      background-color: #0076a3;
    }

    ${media.tablet`
      position: static;
      height: 31px;
      line-height: 31px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    `}
  }
`;

ShopDetails.SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: #303030;
  font-weight: 400;
  flex-direction: column;

  label {
    display: block;
    font-size: 10px;
    color: #707070;
    font-weight: 300;
  }

  ${Button} {
    display: none;
    min-width: 51px;
  }

  ${media.tablet`
    flex-direction: row;
    align-items: center;

    ${Button} {
      display: inline-block;
    }
  `}
`;

ShopDetails.NameWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #707070;
  font-weight: 300;

  h3 {
    font-size: 15px;
    color: #0d3244;
    font-weight: 500;
    margin: 0;
  }

  .svg-inline--fa {
    margin-right: 8px;
  }

  .ant-rate-star:not(:last-child) {
    margin-right: 3px;
  }

  ${media.tablet`
    h3 {
      font-size: 20px;
    }
  `}
`;

const ToolbarButtonWrap = styled.div`
  border-radius: 36px;
  padding: 8px;
  position: relative;
  top: -20px;
  background-color: #fff;
  height: 67px;
`;

const MobileToolbar = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 11;
  justify-content: space-between;
  align-items: center;

  ${TextButton} {
    min-width: 40px;
    text-transform: none;
    font-size: 13px;
    font-weight: normal;
    .svg-inline--fa {
      margin-right: 10px;
      vertical-align: middle;
    }
  }

  ${ToolbarButtonWrap} ${Button} {
    min-width: 51px;
    border-radius: 34px;
    font-size: 17px;
    box-shadow: 0 0 8px #06c987;
  }
`;

ShopDetails.PriceWrap = styled.div`
  display: none;
  margin-left: 40px;

  ${media.tablet`
    display: block;
  `}
`;

ShopDetails.ThirdRow = styled.div`
  margin-top: 14px;
  border-top: 2px;
  padding-top: 8px;
  border-top: 2px solid #ddd;
  display: none;

  ${media.tablet`
    display: flex;
  `}
`;

ShopDetails.Service = styled.div`
  background-color: #f1fefa;
  color: #06c987;
  padding: 0 14px;
  line-height: 30px;
  border-radius: 5px;
  margin: 0 1px;
  font-size: 10px;
`;

ShopDetails.AppointmentInfo = styled.div`
  margin-top: 10px;
  padding-top: 8px;
  border-top: 2px solid #ddd;
  label {
    margin-bottom: 0;
  }
  date {
    font-size: 13px;
  }

  form {
    display: none;
  }

  ${media.tablet`
    padding-top: 0;
    border-top: none;
    margin-top: 0;
    display: flex;
    align-items: center;

    form {
      display: block;
    }


    label {
      margin-bottom: 5px;
    }

    date {
      font-size: 15px;
    }
  `}
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat";
  font-size: 10px !important;
  letter-spacing: 0.06em !important;
  font-weight: 400;
  text-transform: uppercase;
  & > label {
    margin-left: 0px !important;
    font-size: 10px !important;
    color: #808080 !important;
    margin-bottom: 5px;
  }
`;

const shopRefs = {};
const ShopBridgeContext = createContext();

function ShopPrice({ item }) {
  const { values } = useFormContext().state;
  if (!item.price || values.service === "0") {
    return null;
  }

  return (
    <ShopDetails.PriceWrap>
      <label>Vanaf</label>
      <price>&euro; {item.price}</price>
    </ShopDetails.PriceWrap>
  );
}

function ShopItem({ item }) {
  const router = useRouter();
  const { selectedShop, updateSelectedShop, showMap } =
    useContext(ShopBridgeContext);
  const location = [item.shop.city || ""].filter(Boolean).join(", ");
  function renderService(service) {
    return <ShopDetails.Service>{service.device_name}</ShopDetails.Service>;
  }

  const tags = item.shop_type_text;
  console.log(item);
  const formState = filtersFormModule.state.values;
  // API changed does not include the city any longer?
  // const shopRoute = `/${item.shop.name}--${item.shop.city}?device=${formState.device}&brand=${formState.brand}&model=${formState.model}`;

  const shopRoute = `${getShopRoute(item.shop)}?device=${
    formState.device
  }&brand=${formState.brand}&model=${formState.model}`;

  function onClick() {
    if (!showMap) {
      router.push(shopRoute);
      return;
    }
    if (item.shop.id === selectedShop) {
      router.push(shopRoute);
      return;
    }

    updateSelectedShop(item.shop.id);
  }

  const shopCard = (
    <ShopWrap
      ref={(node) => (shopRefs[item.shop.id] = node)}
      isSelected={item.shop.id === selectedShop}
      onClick={onClick}
    >
      <ShopImageWrap>
        <Image
          loading="lazy"
          src={getShopLogo(item?.shop?.logo_photo)}
          layout="responsive"
          width={150}
          height={150}
          objectFit="contain"
        />
        <d-def>{item.shop.distance} km</d-def>
      </ShopImageWrap>
      <ShopDetails>
        <div>
          {tags
            ? tags.map((tag) => {
                const value = Object.values(tag)[0];
                const props = {
                  [`data-${TAG_TO_COLOR[value]}`.replace("#", "")]: true,
                };
                return <tag {...props}>{value}</tag>;
              })
            : null}
        </div>
        <ShopDetails.SecondRow>
          <ShopDetails.NameWrap>
            <h3>{item.shop.name}</h3>
            {location ? (
              <location>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {location}
              </location>
            ) : null}
            <Rate
              disabled
              style={{ fontSize: "13px" }}
              value={item.shop.mark}
              onChange={null}
            />
          </ShopDetails.NameWrap>
          <ShopDetails.AppointmentInfo>
            {item.next_slot ? (
              <div>
                <label>Eerst mogelijke afspraak</label>
                <date>
                  {moment(item.next_slot).isValid()
                    ? moment(item.next_slot).format("DD MMM, HH:mm")
                    : item.next_slot}
                </date>
              </div>
            ) : null}
            <Form module={filtersFormModule}>
              <ShopPrice item={item} />
            </Form>
          </ShopDetails.AppointmentInfo>
        </ShopDetails.SecondRow>
        {item.devices?.length ? (
          <ShopDetails.ThirdRow>
            {item.devices.map(renderService)}
          </ShopDetails.ThirdRow>
        ) : null}
      </ShopDetails>
    </ShopWrap>
  );

  if (typeof window === "undefined") {
    return (
      <Link href={shopRoute}>
        <a>{shopCard}</a>
      </Link>
    );
  }

  return shopCard;
}

function parseOptions(arr, key) {
  return [
    {
      id: "0",
      [key]: "Alle",
    },
    ...arr,
  ].map((item) => ({
    value: `${item.id}`,
    label: item[key],
  }));
}

const DeviceSelector = createSelectComponent({
  dataFetcher: deviceFetcher,
  parseOptions(items = []) {
    return parseOptions(items || [], "device_name");
  },
});

const MobileDeviceSelector = createSelectComponent({
  dataFetcher: deviceFetcher,
  parseOptions(items = []) {
    return parseOptions(items || [], "device_name");
  },
  Component: MobileRadioButtons,
});

function AppendIdentifier({ Component, name }) {
  return function IdentifiedComponent(props) {
    const { state } = useFormContext();
    return <Component identifier={`${state?.values?.[name]}`} {...props} />;
  };
}

const BrandSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: brandFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "brand_name");
    },
  }),
  name: "device",
});

const ModelSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: modelFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "model_name");
    },
  }),
  name: "brand",
});

const ServiceSelector = AppendIdentifier({
  Component: createSelectComponent({
    dataFetcher: serviceFetcher,
    parseOptions(items = []) {
      return parseOptions(items || [], "reparation_name");
    },
  }),
  name: "model",
});

const REPAIR_TYPES = [
  {
    label: "Alle",
    value: 0,
  },
  {
    label: "Fysieke winkel",
    value: 1,
  },
  {
    label: "Reparatie op locatie",
    value: 2,
  },
];

const DISTANCES = [
  {
    label: "+5 km",
    value: "5",
  },
  {
    label: "+10 km",
    value: "10",
  },
  {
    label: "+15 km",
    value: "15",
  },
  {
    label: "+30 km",
    value: "30",
  },
];

const SORT_BY = [
  {
    label: "Standaard",
    value: 0,
  },
  {
    label: "Rating",
    value: 1,
  },
  {
    label: "Prijs",
    value: 4,
  },
  {
    label: "Garantie",
    value: 5,
  },
  {
    label: "Afstand",
    value: 8,
  },
];

const WARRANTIES = {
  0: "Geen",
  3: "",
  6: "",
  9: "",
  12: "12",
};

function warrantyLabel(value) {
  const mapping = {
    3: "3 maanden garantie",
    6: "6 maanden garantie",
    9: "9 maanden garantie",
    12: "12 maanden garantie",
  };

  return mapping[value] || "Geen garantie";
}

const WORKING_TIME = [
  {
    label: "minder dan 30 minuten",
    value: "30",
  },
  {
    label: "minder dan 1 uur",
    value: "60",
  },
  {
    label: "minder dan 2 uur",
    value: "120",
  },
  {
    label: "binnen een dag",
    value: "180",
  },
  {
    label: "binnen 3 dagen",
    value: "180",
  },
];

const RefineModalWrap = styled.div`
  ${SubTitle} {
    margin-bottom: 21px;
  }

  .ant-select {
    margin-left: -11px;
  }

  footer {
    margin-top: 11px;
    border-top: 1px solid #ddd;
    padding-top: 30px;
    text-align: center;

    ${TextButton} {
      text-transform: none;
      font-weight: normal;
      font-size: 12px;
      color: #0076a3;
      font-weight: 400;
    }
  }
`;

function ClearFilters({ label = "Reset", alwaysShow = false }) {
  const { state, actions } = useFormContext();

  const hasDiff = !isEqual(state.initialValues, state.values);
  if (!alwaysShow && !hasDiff) {
    return null;
  }

  return (
    <TextButton
      onClick={() => actions.batchChange({ updates: state.initialValues })}
    >
      {label}
    </TextButton>
  );
}

function RefineFooter() {
  return (
    <footer>
      <Button onClick={() => refineSearchModal.actions.close()}>
        Toon resultaten
      </Button>
      <Form module={filtersFormModule}>
        <ClearFilters label="Reset filters" alwaysShow />
      </Form>
    </footer>
  );
}

function RefineSearchForm() {
  return (
    <Form module={filtersFormModule}>
      <Field name="price" as={Slider} label="Maximum prijs" />
      <Field name="rate" as={Rate} label="Minimale rating" />
      <Field name="shop_type" as={Radio.Group} label="Reparatie Type">
        <Options>
          {REPAIR_TYPES.map((type, i) => (
            <Radio key={i} value={type.value} disabled={type.disabled}>
              {type.label}
            </Radio>
          ))}
        </Options>
      </Field>
      <Field
        name="guarantee"
        as={Slider}
        marks={WARRANTIES}
        label="Minimale garantie (maanden)"
        tipFormatter={warrantyLabel}
        min={0}
        max={12}
        step={null}
      />
      {false && (
        <Field
          name="time"
          as={Select}
          options={WORKING_TIME}
          label="Reparatietijd"
        />
      )}
    </Form>
  );
}

function ModelFieldsComponent({
  showMap,
  updateShowMap,
  setShowMobileSearch,
  showMobileSearch,
}) {
  const { state } = useFormContext();
  const onDeviceChange = useCallback((ev) => {
    const value = parseNativeEvent(ev);
    filtersFormModule.actions.batchChange({
      updates: {
        device: value,
        brand: "0",
        model: "0",
        service: "0",
      },
    });
    brandFetcher.key(`${value}`).fetch();
  });

  const onBandChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        brand: value,
        model: "0",
        service: "0",
      },
    });
    modelFetcher.key(`${value}`).fetch();
  });

  const onModelChange = useCallback((value) => {
    filtersFormModule.actions.batchChange({
      updates: {
        model: value,
        service: "0",
      },
    });
    serviceFetcher.key(`${value}`).fetch();
  });
  return (
    <ModelFields>
      <OnMobile only>
        <Field
          as={MobileDeviceSelector}
          name="device"
          aria-input-field-name="device"
          onChange={onDeviceChange}
        />
        {state.values.device === "0" ? null : (
          <ModelFieldsMobile>
            <BrandSelector
              name="brand"
              as={Select}
              label="Merk"
              aria-input-field-name="brand"
              onChange={onBandChange}
              dropdownStyle={{ minWidth: "200px" }}
            />
            <ModelSelector
              name="model"
              as={Select}
              label="Model"
              aria-input-field-name="model"
              disabled={state.values.brand === "0"}
              onChange={onModelChange}
            />
            <ServiceSelector
              name="service"
              as={Select}
              label="Reparatie"
              disabled={state.values.model === "0"}
              aria-input-field-name="service"
              dropdownStyle={{ minWidth: "200px" }}
            />
            <Waypoint
              onEnter={() => setShowMobileSearch(false)}
              onLeave={() => setShowMobileSearch(true)}
            />
            <Field
              name="sort"
              as={Select}
              options={SORT_BY}
              label="Sorteer op"
            />
          </ModelFieldsMobile>
        )}
      </OnMobile>
      <OnMobile show={false}>
        <DeviceSelector
          name="device"
          as={Select}
          label="Apparaat"
          aria-input-field-name="device"
          onChange={onDeviceChange}
          dropdownStyle={{ minWidth: "200px" }}
        />
        <BrandSelector
          name="brand"
          as={Select}
          label="Merk"
          aria-input-field-name="brand"
          onChange={onBandChange}
          dropdownStyle={{ minWidth: "200px" }}
          disabled={state.values.device === "0"}
        />
        <ModelSelector
          name="model"
          as={Select}
          label="Model"
          aria-input-field-name="model"
          disabled={state.values.brand === "0"}
          onChange={onModelChange}
          dropdownStyle={{ minWidth: "200px" }}
        />
        <ServiceSelector
          name="service"
          as={Select}
          label="Reparatie"
          aria-input-field-name="service"
          disabled={state.values.model === "0"}
          dropdownStyle={{ minWidth: "200px" }}
          popupPlacement="bottomRight"
        />
      </OnMobile>
      <MapTriggerWrap>
        <label>Kaart</label>
        <Switch checked={showMap} onChange={(val) => updateShowMap(val)} />
      </MapTriggerWrap>
    </ModelFields>
  );
}

function ResultCount() {
  const context = useListContext();
  if (!context.items || context.state.isLoading) {
    return null;
  }

  return ` (${context.items.length})`;
}

export default function SearchResults() {
  const [showMobileSearch, setShowMobileSearch] = useState();
  const [selectedShop, updateSelectedShop] = useState(null);
  const [showMap, updateShowMap] = useState(false);
  const mobileSelectorsRef = useRef(null);

  useEffect(() => {
    async function main() {
      await loadScript();
      const formValues = filtersFormModule.state.values;
      if (formValues.device) {
        await brandFetcher.key(formValues.device).fetch();
      }
      if (formValues.brand) {
        await modelFetcher.key(formValues.brand).fetch();
      }

      if (formValues.model) {
        await serviceFetcher.key(formValues.model).fetch();
      }
    }
    main();
  }, []);

  useEffect(() => {
    if (shopRefs[selectedShop]) {
      shopRefs[selectedShop].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedShop]);

  const locationField = (
    <Field
      prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      noBorder
      as={GooglePlaces}
      name="location"
    />
  );

  return (
    <ShopBridgeContext.Provider
      value={{ selectedShop, updateSelectedShop, showMap }}
    >
      <DefaultLayout>
        <Head>
          <title>Zoek een telefoon reparateur | Mr Again</title>
          <meta
            name="Keywords"
            content="Zoek een telefoon reparateur, telefoon maken, telefoon reparateur, telefoon reparatie, scherm maken, Mr Again"
          />
          <meta
            name="description"
            content="Telefoon maken of telefoon reparatie? Bekijk de zoek resultaten bij MrAgain"
          />
          <link rel="canonical" href={FRONT_END_URL + "/zoek-een-reparateur"} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content="Zoek een telefoon reparateur"
          />
          <meta
            property="og:description"
            content="Zoek een telefoon reparateur"
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
        </Head>
        <MainWrap>
          <MaxConstraints>
            <Sidebar>
              <SidebarInnerWrap>
                <SidebarHeader>
                  <SubTitle>
                    Filter resultaten
                    <List module={shopListModule}>
                      <ResultCount />
                    </List>
                  </SubTitle>
                  <Form module={filtersFormModule}>
                    <ClearFilters />
                  </Form>
                </SidebarHeader>
                <RefineSearchForm />
              </SidebarInnerWrap>
            </Sidebar>
            <Content ref={mobileSelectorsRef}>
              <Form module={filtersFormModule}>
                <ZipFields>
                  {locationField}
                  <hr />
                  <Field
                    as={Select}
                    label="Afstand"
                    name="distance"
                    options={DISTANCES}
                  />
                  <OnMobile show={false}>
                    <Field
                      name="sort"
                      as={Select}
                      options={SORT_BY}
                      label="Sorteer op"
                      dropdownStyle={{ minWidth: "150px" }}
                    />
                  </OnMobile>
                </ZipFields>
                <ModelFieldsComponent
                  showMap={showMap}
                  updateShowMap={updateShowMap}
                  setShowMobileSearch={setShowMobileSearch}
                  showMobileSearch={showMobileSearch}
                />
                <SyncFormValues onChange={shopListModule.actions.updateQuery} />
              </Form>
              <List module={shopListModule}>
                <NoResults message="Sorry, er zijn geen resultaten gevonden. Pas je afstand filter aan en probeer het opnieuw" />
                <Listing Item={ShopItem} />
              </List>
            </Content>
            <List module={shopListModule}>
              {showMap ? (
                <Map
                  selectedShop={selectedShop}
                  updateSelectedShop={updateSelectedShop}
                />
              ) : null}
            </List>
          </MaxConstraints>
          <OnMobile only>
            {showMobileSearch || showMap ? (
              <MobileSearchWrap>
                <Form module={filtersFormModule}>
                  <ZipFields>
                    {locationField}
                    <hr />
                    <Field
                      as={Select}
                      label="Afstand"
                      name="distance"
                      aria-input-field-name="distance"
                      options={DISTANCES}
                    />
                  </ZipFields>
                </Form>
              </MobileSearchWrap>
            ) : null}
          </OnMobile>
          <OnMobile only>
            <MobileToolbar>
              <TextButton onClick={() => refineSearchModal.actions.open()}>
                <FontAwesomeIcon icon={faSortAmountDown} />
                Resultaten filteren
              </TextButton>
              <ToolbarButtonWrap>
                <Button onClick={() => updateShowMap((state) => !state)}>
                  {!showMap ? (
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  ) : (
                    <FontAwesomeIcon icon={faStore} />
                  )}
                </Button>
              </ToolbarButtonWrap>
            </MobileToolbar>
            <Modal module={refineSearchModal} footer={null}>
              <RefineModalWrap>
                <SubTitle>
                  Resultaten filteren
                  <List module={shopListModule}>
                    <ResultCount />
                  </List>
                </SubTitle>
                <RefineSearchForm />
                <RefineFooter />
              </RefineModalWrap>
            </Modal>
          </OnMobile>
        </MainWrap>
      </DefaultLayout>
    </ShopBridgeContext.Provider>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }) => {
    await filtersFormModule.actions.initialize(query);
    await shopListModule.actions.initialize();
    await deviceFetcher.fetch();
  }
);
