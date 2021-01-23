import React, { useEffect } from "react";
import moment from "moment";
import infoIcon from "../../public/images/icons/info.svg";
import linkIcon from "../../public/images/icons/link.svg";
import { get } from "lodash";

const CommonDetail = ({ thing }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });


  return (
    <>
      <main className="c-detail-body">
        <div className="c-detail-company">
          {get(thing, 'company.name', 'Une entreprise')} <span className="c-detail-proposal"> propose actuellement cette offre</span>
        </div>
        <div className="c-detail-jobname">
        </div>
        
      </main>
    </>
  );
};

export default CommonDetail;
