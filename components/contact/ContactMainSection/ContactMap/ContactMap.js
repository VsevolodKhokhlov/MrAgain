import GoogleMapReact from "google-map-react";
import React from "react";

const googleMapsApiKey = "AIzaSyBE2P-vg2-gzleHsoAYa7pesL7CLpPpISE";
const COORDIANTES = {
  lat: 52.1134604,
  lng: 5.1213952,
};

function ShopMarker() {
  let imageProps = {
    src: "/images/map/marker.png",
    width: "23px",
    height: "27px",
  };

  return <img {...imageProps} />;
}

const ContactMap = () => {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapsApiKey }}
        zoom={11}
        defaultCenter={{
          lat: COORDIANTES.lat,
          lng: COORDIANTES.lng,
        }}
      >
        <ShopMarker lat={COORDIANTES.lat} lng={COORDIANTES.lng} />
      </GoogleMapReact>
    </>
  );
};

export default ContactMap;
