import React, { useEffect } from "react";
import moment from "moment";
import infoIcon from "../../public/images/icons/info.svg";
import linkIcon from "../../public/images/icons/link.svg";

const CommonDetail = ({ thing }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="itemDetailBody">
        {thing.ideaType}
      </div>
    </>
  );
};

export default CommonDetail;
