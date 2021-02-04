import React, { useState, useEffect } from "react";
import PeJobDetail from "./PeJobDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { get, includes, defaultTo, round, capitalize } from "lodash";
import ReactHtmlParser from "react-html-parser";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";
import linkIcon from "../../public/images/icons/link.svg";

const ItemDetail = ({ selectedItem, handleClose, displayNavbar }) => {
  console.log('selectedItem', selectedItem);
  const kind = selectedItem?.ideaType;
  const companySize = selectedItem?.company?.size?.toLowerCase();
  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  let contactEmail = selectedItem?.contact?.email;
  let contactInfo = contactEmail ? `écrire à ${contactEmail}` : "informations non communiquées";

  let siret = selectedItem?.company?.siret;

  let actualTitle = selectedItem?.title || selectedItem?.longTitle;

  return (
    <>
      <section className={`c-detail itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
        {displayNavbar ? (
          <nav
            className="c-detail-stickynav"
            onClick={() => {
              setSeeInfo(false);
              handleClose();
            }}
          >
            <span className="mr-3">←</span> {get(selectedItem, "company.name", "Retour")}
          </nav>
        ) : (
          ""
        )}
        <header className="c-detail-header">
          <div className="text-left">
            <button
              className="c-detail-back"
              onClick={() => {
                setSeeInfo(false);
                handleClose();
              }}
            >
              ← Retour aux résultats
            </button>

            <p className={"c-detail-title c-detail-title--" + kind}>
              {kind === "formation" ? (
                <>
                  {defaultTo(actualTitle, 'Formation')}
                </>
              ) : (
                <>
                  {get(selectedItem, "company.name", "")}  
                </>
              )}
            </p>

            <p className="c-detail-activity">
              {kind === "formation" ? (
                <>
                  {get(selectedItem, "company.name", "")}
                </>
              ) : (
                <>
                  {defaultTo(actualTitle, 'Entreprise')}
                </>
              )}
            </p>
            <p className="d-flex">
              <span className="d-block">
                <img className="cardIcon" src={smallMapPointIcon} alt="Illustration d'un point sur la carte" />
              </span>
              <span className="ml-2 d-block">
                <span className="c-detail-address d-block">{get(selectedItem, "place.fullAddress", "").toLowerCase()}</span>
                {distance ? (
                  <span className="c-detail-km d-block">
                    {round(distance, 1) + " "}
                    km(s) du lieu de recherche
                  </span>
                ) : (
                  ""
                )}
              </span>
            </p>

            <p className="mb-4">
              <span className="c-detail-sizetitle d-block">Taille de l'entreprise</span>
              <span className="c-detail-sizetext d-block">
                {defaultTo(companySize, ReactHtmlParser("<em>Non renseigné</em>"))}
              </span>
              {siret ? (
                <a
                  target="lbb"
                  href={`https://labonneboite.pole-emploi.fr/${siret}/details`}
                    className={`gtmContact gtmContact${capitalize(kind)} d-block btn btn-outline-primary w-50 mt-3 c-detail-seeinfo`}
                >
                  <span className="d-block d-sm-inline">Voir les informations</span>
                  <span className="d-block d-sm-inline">&nbsp;de contact</span>
                </a>
              ) : (
                ""
              )}
            </p>
          </div>
          <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />
        </header>

        <div>
          {kind === "peJob" ? <PeJobDetail job={selectedItem} /> : ""}
          {includes(["lbb", "lba"], kind) ? <LbbCompanyDetail lbb={selectedItem} /> : ""}
          {kind === "formation" ? <TrainingDetail training={selectedItem} /> : ""}
        </div>
      </section>
    </>
  );
};

export default ItemDetail;
