import { Head } from "next/document";

export default class HeadWithoutPreload extends Head {
  getPreloadDynamicChunks() {
    return [];
  }

  getPreloadMainLinks() {
    return [];
  }
}
