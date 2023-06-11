import "./pages.css";

import dateFormat from "dateformat";
import parse from "html-react-parser";
import React from "react";
import { Fragment } from "react";

export default function PageDetails({ pageDetails }) {
  console.log("🚀 => PageDetails => pageDetails", pageDetails);
  return (
    <Fragment>
      <div className="col-md-2 col-xs-2"></div>
      <div className="col-md-8 col-xs-8">
        <div className="blog-title">{pageDetails.title}</div>
        <div className="date-content">
          {dateFormat(
            pageDetails.created_on.toUpperCase(),
            "mmmm dS, yyyy, h:MM TT"
          )}
        </div>
        <img
          className="blog-image"
          src={pageDetails.post_image}
          alt={
            pageDetails.post_image_alt_text !== null
              ? pageDetails.post_image_alt_text
              : "pageDetails image"
          }
        />
        <div className="my-3 blog-description">
          {parse(pageDetails !== null ? pageDetails.content : "")}
        </div>
      </div>
      <div className="col-md-2 col-xs-2"></div>
    </Fragment>
  );
}
