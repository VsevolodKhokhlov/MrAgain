import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Radio } from "antd";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import styled, { css } from "styled-components";

import Loader from "@/components/common/Loader";
import ConfirmationModal from "@/components/common/modals/ConfirmationModal";
import { continueWitoutServiceModal } from "@/components/shop-profile/modules";
import { MaxConstraints } from "@/components/styled/layout";
import { SubTitle, SubTitleDescription } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import { MobileRadioButtons } from "@/components/ui/MobileRadioButtons";
import Select from "@/components/ui/Select";
import { store } from "@/configureStore";
import { createSelectComponent, useFetcher } from "@/modules/dataFetcher";
import Form, { useFormContext } from "@/modules/forms";
import {
  Field,
  parseNativeEvent,
  SyncFormValues,
} from "@/modules/forms/Blocks";
import List from "@/modules/list";
import { Listing, Table } from "@/modules/list/Blocks";
import media, { OnMobile, useScreenSize } from "@/utils/media";

import {
  brandFetcher,
  deviceFetcher,
  filtersFormModule,
  modelFetcher,
  nextSlotFetcher,
  serviceFormModule,
  shopServicesListModule,
} from "../modules";
import { ContactButton } from "../ShopHeader";

const Menu = dynamic(() => import("react-horizontal-scrolling-menu"), {
  loading: Loader,
  ssr: false,
});

const nextSlotCss = css`
  next-slot {
    display: flex;
    white-space: nowrap;
    font-size: 12px;
    line-height: 18px;
    margin-right: 10px;

    > div:first-child {
      display: none !important;
    }

    label {
      color: #c0c0c0;
      display: block;
      margin: 0;
    }
  }

  ${media.tablet`
    next-slot {
      > div:first-child {
        width: 40px;
        display: block!important;
      }

      > div:nth-child(2) {
        margin-left: 16px;
      }
  `}
`;

const ModelFields = styled.div`
  display: flex;
  align-items: center;
  margin: 19px -24px;
  padding: 0 10px;

  > div {
    width: 100%;
    margin-top: 0 !important;
    margin: 0 5px;
    background-color: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 4px;

    .ant-select {
      width: 100%;
    }
    > label {
      margin: 11px 11px 2px 11px;
    }
  }

  ${media.tablet`
    padding: 0 24px;
  `}

  ${nextSlotCss}
`;

const ReparationCell = styled.div`
  > div {
    display: flex;
  }
  .ant-checkbox-wrapper,
  .ant-radio-wrapper {
    font-size: 15px;
    color: #303030;
    font-weight: 500;
    text-transform: none;
  }
  .ant-radio,
  .ant-checkbox {
    margin-right: 36px;
  }
`;

const NextStepWrap = styled.div`
  margin: 20px -24px 0;
  padding: 15px 24px;
  border-top: 1px solid #ddd;
`;

const MobileToolbar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  background-color: #fff;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 0 27px rgba(0, 0, 0, 0.3);
  width: 100%;
  z-index: 110;
  left: 0;
  justify-content: space-between;
  align-items: center;

  ${NextStepWrap} {
    text-align: right;
    margin: 0;
    white-space: nowrap;
    padding: 0;
    border: 0;
  }

  ${Button} {
    padding: 7px 22px;
    height: 37px;
    line-height: 23px;
    box-shadow: 0 0 8px #06c987;

    &[disabled] {
      box-shadow: 0 0 8px #a0a0a0;
    }
  }

  ${nextSlotCss}
`;

const SERVICE_COLUMNS = [
  {
    title: "Reparatie",
    key: "reparation_name",
    render: (item) => {
      if (false) {
        return (
          <ReparationCell>
            <Field
              as={Checkbox}
              name={`services.${item.id}`}
              label={item.reparation.reparation_name}
            />
          </ReparationCell>
        );
      }

      return (
        <ReparationCell>
          <Field
            as={(props) => (
              <Radio
                {...props}
                value={props.option}
                checked={props.value === props.option}
              >
                {item.reparation.reparation_name}
              </Radio>
            )}
            name="service"
            option={item.id}
          />
        </ReparationCell>
      );
    },
  },
  {
    title: "Garantie",
    key: "guarantee_time",
    render: (data) => {
      if (
        data.guarantee_time === 0 &&
        data.price === 0 &&
        data.reparation_time === "0"
      ) {
        return {
          props: {
            colSpan: 3,
          },
          children: (
            <div style={{ textAlign: "center", border: "1px solid #ddd" }}>
              Prijs op aanvraag
            </div>
          ),
        };
      }

      return `${data.guarantee_time} maanden`;
    },
  },
  {
    title: "Reparatie tijd",
    key: "reparation_time",
    render: (data) => {
      if (
        data.guarantee_time === 0 &&
        data.price === 0 &&
        data.reparation_time === "0"
      ) {
        return {
          props: {
            colSpan: 0,
          },
        };
      }

      return `${data.reparation_time} minuten`;
    },
  },
  {
    title: "Prijs",
    key: "price",
    render: (data) => {
      if (
        data.guarantee_time === 0 &&
        data.price === 0 &&
        data.reparation_time === "0"
      ) {
        return {
          props: {
            colSpan: 0,
          },
        };
      }
      return <span>&euro;{data.price}</span>;
    },
  },
];

const ServiceMobileListing = styled.div`
  background-color: #fafafa;
  margin: 0 -24px;
  padding: 0 20px;
`;

const PriceOnDemand = styled.div`
  font-size: 13px;
  text-align: center;
  border: 1px solid #ddd;
  padding: 5px 7px;
  color: #555;
`;

const ServiceMobileItemWrap = styled.div`
  padding: 26px 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;

  .ant-radio,
  .ant-checkbox {
    margin-right: 10px;
  }

  span {
    font-size: 13px;
    letter-spacing: 0px;
    color: #0d3244;
    font-weight: 600;
  }

  &:last-child {
    border: 0;
  }
`;

ServiceMobileItemWrap.FirstColumn = styled.div`
  color: #a0a0a0;
  font-size: 11px;
  > d-def {
    display: block;
    margin-left: 34px;
  }
`;

function MobileServiceItem({ item }) {
  const firstColumn = SERVICE_COLUMNS[0].render(item);
  return (
    <ServiceMobileItemWrap>
      <ServiceMobileItemWrap.FirstColumn>
        {firstColumn}
        {item.guarantee_time ? (
          <d-def>{item.guarantee_time} maanden garantie</d-def>
        ) : null}
      </ServiceMobileItemWrap.FirstColumn>
      <price>
        {item.price ? (
          <span>&euro;{item.price}</span>
        ) : (
          <PriceOnDemand>Prijs op aanvraag</PriceOnDemand>
        )}
      </price>
    </ServiceMobileItemWrap>
  );
}

function parseOptions(arr, key) {
  return [...arr].map((item) => ({
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

const MobileDeviceSelectorWrap = styled.div`
  background-color: #fff;
  margin: 5px -24px;
  padding: 5px 10px;

  .ant-radio-group {
    width: 100%;
  }

  .menu-wrapper {
    min-width: 100%;
  }

  .ant-radio-button-wrapper {
    background-color: transparent;
    color: #c0c0c0;
    border: 0 !important;
    padding: 0 11px;
    border-radius: 7px !important;

    &.ant-radio-button-wrapper-checked {
      color: #fff !important;
      background-color: #06c987;
    }
  }
`;

const Panel = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1px 24px 0;
  margin-bottom: 40px;
  margin-top: 40px;
  margin-top: 40px;
  overflow: hidden;

  .ant-table-wrapper {
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
  }

  .ant-table-thead tr th {
    background: #fafafa;
  }

  ${SubTitle} {
    margin: 0 -24px;
    padding: 15px 24px 0 24px;
  }

  ${SubTitleDescription} {
    margin: 0 -24px;
    padding: 15px 24px;
    border-bottom: 1px solid #ddd;
  }

  ${media.tablet`
    margin-top: 0;
  `}
`;

function AppendIdentifier({ Component, name }) {
  return function (props) {
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
    Component: (props) => {
      const { state } = useFormContext();
      return <Field {...props} identifier={state?.values?.brand} />;
    },
  }),
  name: "brand",
});

function AppointmentButton() {
  const { values } = useFormContext().state;
  const router = useRouter();
  const formValues = filtersFormModule.state.values;
  const nextLocation = `/${router.query["city"]}/${router.query["shopId][api"]}/${router.query["street"]}/appointment?device=${formValues.device}&brand=${formValues.brand}&model=${formValues.model}&service=${values.service}`;
  return (
    <NextStepWrap>
      <Link href={nextLocation}>
        <Button
          aria-label="Book service"
          onClick={(ev) => {
            if (!values.service) {
              ev.preventDefault();
              continueWitoutServiceModal.actions
                .open({
                  type: "success",
                  message: "Algemene afspraak",
                  description:
                    "Je hebt geen reparatie geselecteerd, als je een afspraak wilt maken maken we daarom een algemene diagnose afspraak voor je.",
                  buttonLabel: "Prima!",
                })
                .then(() => {
                  router.push(nextLocation);
                });
            }
          }}
        >
          Afspraak maken <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </Link>
    </NextStepWrap>
  );
}

function NextSlot({ id }) {
  const { data } = useFetcher({
    identifier: id,
    dataFetcher: nextSlotFetcher,
  });

  if (!data?.next_slot) {
    return null;
  }

  return (
    <next-slot>
      <Image src="/images/icons/nextSlot.svg" width={41} height={40} />
      <div>
        <label>Eerst mogelijke afspraak</label>
        <date>
          {moment(data.next_slot).isValid()
            ? moment(data.next_slot).format("DD MMM, HH:mm")
            : data.next_slot}
        </date>
      </div>
    </next-slot>
  );
}

export default function ShopServices({ shop }) {
  useEffect(() => {
    async function main() {
      await filtersFormModule.actions.initialize(shop.id);
      nextSlotFetcher.key(`${shop.id}`).fetch();
      serviceFormModule.actions.initialize();
      const devices = await deviceFetcher.fetch();
      const formValues = filtersFormModule.state.values;
      if (formValues.device) {
        brandFetcher.key(formValues.device).fetch();
      }
      if (formValues.brand) {
        modelFetcher.key(formValues.brand).fetch();
      }

      if (formValues.device === "0" && devices.length > 0) {
        filtersFormModule.actions.batchChange({
          updates: {
            device: `${devices[0].id}`,
          },
        });
        const brands = await brandFetcher.key(`${devices[0].id}`).fetch();
        const models = await modelFetcher.key(`${brands[0].id}`).fetch();
        const updates = {
          device: devices.length > 0 ? `${devices[0].id}` : `0`,
          brand: brands.length > 0 ? `${brands[0].id}` : `0`,
          model: models.length > 0 ? `${models[0].id}` : `0`,
        };

        filtersFormModule.actions.batchChange({
          updates,
        });
      }

      shopServicesListModule.actions.initialize();
    }

    main();
  }, [shop.id]);

  const onDeviceChange = useCallback(async (ev) => {
    const value = parseNativeEvent(ev);
    const brands = await brandFetcher.key(value).fetch();
    filtersFormModule.actions.batchChange({
      updates: {
        device: value,
        brand: brands.length > 0 ? `${brands[0].id}` : `0`,
      },
    });
    const models = await modelFetcher.key(`${brands[0].id}`).fetch();
    filtersFormModule.actions.batchChange({
      updates: {
        model: models.length > 0 ? `${models[0].id}` : `0`,
      },
    });
    // brandFetcher.key(`${value}`).fetch();
  });

  const onBandChange = useCallback(async (value) => {
    const models = await modelFetcher.key(value).fetch();
    filtersFormModule.actions.batchChange({
      updates: {
        brand: value,
        model: models.length > 0 ? `${models[0].id}` : `0`,
      },
    });
    modelFetcher.key(`${value}`).fetch();
  });

  const screenSize = useScreenSize().size;
  const apointmentButton = (
    <Form module={filtersFormModule}>
      <Form module={serviceFormModule}>
        <AppointmentButton />
      </Form>
    </Form>
  );

  return (
    <MaxConstraints>
      <Panel>
        <SubTitle>
          Selecteer je apparaat, merk en model & bekijk onze reparaties
        </SubTitle>
        <SubTitleDescription>
          Staat je model of reparatie er niet tussen? Waarschijnlijk kunnen we
          je wel helpen, maak een afspraak en we kijken er naar!
        </SubTitleDescription>
        <Form module={filtersFormModule}>
          <OnMobile only>
            <MobileDeviceSelectorWrap>
              <Field
                as={MobileDeviceSelector}
                name="device"
                onChange={onDeviceChange}
              />
            </MobileDeviceSelectorWrap>
          </OnMobile>
          <ModelFields>
            <OnMobile show={false}>
              <NextSlot id={shop.id} />
              <DeviceSelector
                name="device"
                as={Select}
                label="Apparaat"
                aria-input-field-name="device"
                onChange={onDeviceChange}
                dropdownStyle={{ minWidth: "200px" }}
              />
            </OnMobile>
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
              {...(screenSize === "mobile"
                ? {}
                : { dropdownStyle: { minWidth: "200px" } })}
            />
          </ModelFields>
          <SyncFormValues
            onChange={(data) => {
              // TODO (V.T leave explanation)
              const models =
                modelFetcher.key(data.brand).selector(store.ref.getState())
                  ?.result || [];
              if (
                models.find((model) => +model.id === +data.model) !== undefined
              ) {
                shopServicesListModule.actions.updateQuery(data);
                if (!serviceFormModule.state) {
                  return;
                }
                serviceFormModule.actions.onFieldChange({
                  name: "service",
                  value: null,
                });
              }
            }}
          />
        </Form>
        <List module={shopServicesListModule}>
          <Form module={serviceFormModule}>
            <OnMobile show={false}>
              <Table columns={SERVICE_COLUMNS} />
            </OnMobile>
            <OnMobile only>
              <ServiceMobileListing>
                <Listing Item={MobileServiceItem} />
              </ServiceMobileListing>
            </OnMobile>
          </Form>
        </List>
        <OnMobile>{apointmentButton}</OnMobile>
        <OnMobile only>
          <MobileToolbar>
            <ContactButton secondary />
            {apointmentButton}
          </MobileToolbar>
        </OnMobile>
        <ConfirmationModal module={continueWitoutServiceModal} />
      </Panel>
    </MaxConstraints>
  );
}
