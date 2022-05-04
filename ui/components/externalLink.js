import React from "react";
import { SendPlausibleEvent } from "../utils/gtm";

const ExternalLink = ({ url, title, className }) => {
  const onClick = () => {
    SendPlausibleEvent("Clic lien externe", {
      url,
    });
  };

  return (
    <a className={className} target="_blank" rel="noopener norefferer" href={url} onClick={onClick}>
      {title}
    </a>
  );
};

export default ExternalLink;
