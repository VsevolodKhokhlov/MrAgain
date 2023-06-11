import "./pages.css";

import dateFormat from "dateformat";
import { useRouter } from "next/router";
import React from "react";
import { Fragment } from "react";

import noImageFound from "../../assets/images/noBlogImage.png";

const Pagelist = ({ pages }) => {
  const router = useRouter();
  const path = router.pathname;

  const getBlogDetails = (blog) => {
    if (path === "/reparatie") {
      router.push(`/reparatie/${blog.slug}`);
    } else if (path === "/blog") {
      router.push(`/blog/${blog.slug}`);
    }
  };
  return (
    <Fragment>
      {pages.length > 0
        ? pages.map((blog, i) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={i}>
              <div
                className="card shadow mb-4 "
                style={{ width: "100%", height: "fit-content" }}
              >
                <img
                  className="card-img-top w-100"
                  src={
                    blog.post_image_thumb !== ""
                      ? blog.post_image_thumb
                      : noImageFound
                  }
                  alt={
                    blog.post_image_alt_text !== null
                      ? blog.post_image_alt_text
                      : "blog image"
                  }
                  onClick={() => getBlogDetails(blog)}
                />
                <div className="card-body">
                  <h4 className="card-title text-left">{blog.title}</h4>
                  <div className="w-100">
                    <div className="date-content text-left d-inline ">
                      {dateFormat(
                        blog.created_on.toUpperCase(),
                        "mmmm dS, yyyy"
                      )}
                    </div>
                    <span className=" float-right ">
                      <a
                        className="read-more"
                        onClick={() => getBlogDetails(blog)}
                      >
                        Lees meer...{" "}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </Fragment>
  );
};
export default Pagelist;
