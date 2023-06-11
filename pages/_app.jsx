import "./_app.less";
import "rc-dialog/assets/index.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "moment/locale/nl";
// calendar styles
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
// fontawesome icons
import { fas } from "@fortawesome/free-solid-svg-icons";
// fontawesome icons
import { ConnectedRouter } from "connected-next-router";
import moment from "moment";
import App from "next/app";
import router from "next/router";
import React from "react";
import { connect } from "react-redux";

import * as gtag from "@/lib/gtag";
import { ScreenSizeProvider } from "@/utils/media";

import { wrapper } from "../configureStore";

const isProduction = process.env.NODE_ENV === "production";
const handleRouteChange = (url, { shallow }) => {
  if (!isProduction || shallow) {
    return;
  }
  gtag.pageview(url);
};

config.autoAddCss = false;
library.add(fas, fab, far);
moment.locale("nl");

class MyApp extends App {
  componentDidMount() {
    router.router.events.on("routeChangeComplete", handleRouteChange);
  }
  render() {
    const { Component, pageProps, isLoggedIn, getAuthUser } = this.props;

    return (
      <ScreenSizeProvider>
        <React.Fragment>
          <ConnectedRouter>
            <Component
              {...pageProps}
              isLoggedIn={isLoggedIn}
              getAuthUser={getAuthUser}
            />
          </ConnectedRouter>
        </React.Fragment>
      </ScreenSizeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.account.isLogged,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthUser: () => {
      getAuthUser(dispatch);
    },
  };
};

export default wrapper.withRedux(
  connect(mapStateToProps, mapDispatchToProps)(MyApp)
);
