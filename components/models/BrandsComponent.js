import "./modelDetails.css";

import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";

export default function BrandsComponent({ data, deviceId }) {
  const router = useRouter();

  const onModelSelect = (model) => {
    const modelName = model.name.replaceAll(" ", "-");

    let path = "";
    if (deviceId === 1) {
      path = "telefoon-reparatie";
    } else if (deviceId === 2) {
      path = "tablet-reparatie";
    } else if (deviceId === 3) {
      path = "headphone-reparatie";
    } else if (deviceId === 7) {
      path = "tv-reparatie";
    } else if (deviceId === 8) {
      path = "laundry-machines-reparatie";
    } else if (deviceId === 9) {
      path = "consoles-reparatie";
    }
    router.push(`${path}/${modelName}`);
  };

  return (
    <Fragment>
      {data.length > 0 ? (
        data.map((model, i) => (
          <div className="col-md-3  col-sm-4 col-xs-6  py-2" key={i}>
            <h5 className="brand-title">{model.name}</h5>
            <div className="brand-list">
              {model.model.length > 0 ? (
                model.model.map((m, i) => (
                  <div
                    className="model-list"
                    key={i}
                    onClick={(e) => onModelSelect(m)}
                  >
                    {m.name}
                  </div>
                ))
              ) : (
                <div className="model-list">No models found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="no-data-found">No brands found</div>
      )}
    </Fragment>
  );
}
