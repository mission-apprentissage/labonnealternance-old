import React, { useEffect } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";

const TrainingDetail = ({ training }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="c-detail-training">
        {training.onisepUrl ? (
          <div className="c-detail-pelink">
            <span>
              Descriptif du {training.title ? training.title : training.longTitle} sur{" "}
            </span>
            <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
              <img src={gotoIcon} alt="Lien" />
              {" "}le site Onisep
            </a>
          </div>
        ) : (
          ""
        )}
        <br />
      </div>
    </>
  );
};

export default TrainingDetail;
