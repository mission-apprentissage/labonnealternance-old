import React, { useEffect } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";

const TrainingDetail = ({ training }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="c-detail-training">
        {training.onisepUrl ? (
          <div className="">
            <span>Descriptif du {training.title ? training.title : training.longTitle} sur&nbsp;</span>
            <span className="c-detail-traininglink">
              <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
                <img src={gotoIcon} alt="Lien" />
                &nbsp;le site Onisep
              </a>
            </span>
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
