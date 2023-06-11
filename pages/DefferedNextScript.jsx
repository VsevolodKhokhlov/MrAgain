import { NextScript } from "next/document";
import React from "react";

class DeferredNextScript extends NextScript {
  getScripts() {
    return super.getScripts().map((script) => {
      return React.cloneElement(script, {
        key: script.props.src,
        defer: true,
        async: false,
      });
    });
  }
  getDynamicChunks() {
    return super.getDynamicChunks().map((script) => {
      return React.cloneElement(script, {
        key: script.props.src,
        defer: true,
        async: false,
      });
    });
  }
}
export default DeferredNextScript;
