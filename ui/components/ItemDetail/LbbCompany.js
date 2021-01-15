import React from "react";
import jobIcon from "../../public/images/icons/job.svg";
import companySizeIcon from "../../public/images/icons/employees.svg";
import { useSelector } from "react-redux";
import { fetchAddresses } from "../../services/baseAdresse";
import extendedSearchPin from "../../public/images/icons/trainingPin.svg";

const LbbCompany = ({ company, handleSelectItem, showTextOnly, searchForTrainingsOnNewCenter }) => {
  const { formValues } = useSelector((state) => state.trainings);

  const currentSearchRadius = formValues.radius || 30;

  const onSelectItem = () => {
    handleSelectItem(company, company.ideaType);
  };

  const getCenterSearchOnCompanyButton = () => {
    return (
      <button className="extendedTrainingSearchButton" onClick={centerSearchOnCompany}>
        <img src={extendedSearchPin} alt="" /> <span>Voir les formations proches</span>
      </button>
    );
  };

  const centerSearchOnCompany = async () => {
    // récupération du code insee manquant depuis la base d'adresse
    if (!company.place.insee) {
      const addresses = await fetchAddresses(company.place.address, "municipality");
      company.place.insee = "";
      company.place.zipCode = "";
      if (addresses.length) {
        company.place.insee = addresses[0].insee;
        company.place.zipCode = addresses[0].zipcode;
      }
    }

    const newCenter = {
      insee: company.place.insee,
      label: company.place.address,
      zipcode: company.place.zipCode,
      value: {
        type: "Point",
        coordinates: [company.place.longitude, company.place.latitude],
      },
    };

    searchForTrainingsOnNewCenter(newCenter);
  };

  return (
    <div className="resultCard">
      <div id={`${company.ideaType}${company.company.siret}`}>
        <img className="cardIcon" src={jobIcon} alt="" />
        <span className="cardDistance">{company.place.distance} km(s) du lieu de recherche</span>
      </div>

      <div className="title">{company.company.name}</div>
      <div className="body">
        <div className="companyAddress">{company.place.fullAddress}</div>
        {company.company.size ? (
          <div className="companySize">
            <img src={companySizeIcon} alt="" />{" "}
            {company.company.size && company.company.size === "0 salarié" ? "petite entreprise" : company.company.size}
          </div>
        ) : (
          ""
        )}
      </div>

      {showTextOnly ? (
        ""
      ) : (
        <>
          {Math.round(company.place.distance) > currentSearchRadius ? getCenterSearchOnCompanyButton() : ""}
          <div className="knowMore">
            <button className={`gtmSavoirPlus gtm${company.ideaType} gtmListe`} onClick={onSelectItem}>
              En savoir plus
            </button>
          </div>
          <div style={{ clear: "both" }} />
        </>
      )}
    </div>
  );
};

export default LbbCompany;
