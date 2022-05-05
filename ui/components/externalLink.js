import React from "react";
import { SendPlausibleEvent } from "../utils/gtm";

const ExternalLink = ({ url, title, className = "", withPic, picPosition = "right", dataTestid }) => {
  const onClick = () => {
    SendPlausibleEvent("Clic lien externe", {
      url,
    });
  };

  const getPic = (position = "right") => {
    let res = "";
    if (withPic && picPosition === position) {
      if (position === "left") {
        res = <>{withPic} </>;
      } else {
        res = <> {withPic}</>;
      }
    }
    return res;
  };

  return (
    <a
      className={className}
      target="_blank"
      rel="noopener norefferer"
      href={url}
      //onClick={onClick}
      data-testid={dataTestid}
    >
      {getPic("left")}
      {title}
      {getPic("right")}
    </a>
  );
};

export default ExternalLink;
