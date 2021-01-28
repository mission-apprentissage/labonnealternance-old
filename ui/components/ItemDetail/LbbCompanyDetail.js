import React, { useEffect } from "react";
import bulbIcon from "../../public/images/icons/bulb.svg";

const LbbCompanyDetail = ({ company }) => {
  console.log("lbb : ", company);

  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="c-detail-body">
        <div className="c-detail-advice p-2">
          <img src={bulbIcon} alt="" />
          <div className="c-detail-advice-text">
            <p>Cette entreprise a des salariés qui exercent le métier auquel vous vous destinez.</p>
            <p className="mb-0">Faites-lui découvrir les avantages d’un recrutement en alternance dans votre candidature !</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LbbCompanyDetail;
