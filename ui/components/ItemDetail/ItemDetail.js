import React, { useState } from "react";
import PeJobDetail from "./PeJobDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { get, includes, defaultTo, round } from "lodash";
import ReactHtmlParser from "react-html-parser";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";
import linkIcon from "../../public/images/icons/link.svg";

const ItemDetail = ({ selectedItem, handleClose }) => {
  const kind = selectedItem?.ideaType;
  const companySize = selectedItem?.company?.size?.toLowerCase();
  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  let contactEmail = selectedItem?.contact?.email;
  let contactInfo = contactEmail ? `écrire à ${contactEmail}` : "informations non communiquées";

  let siret = selectedItem?.company?.siret;

  return (
    <>
      <section className={`itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
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
            <p className={"c-detail-title c-detail-title--" + kind}>{get(selectedItem, "company.name", "")}</p>
            <p className="c-detail-activity">
              <em>Activité non renseignée</em>
            </p>
            <p className="d-flex">
              <div>
                <img className="cardIcon" src={smallMapPointIcon} alt="Illustration d'un point sur la carte" />
              </div>
              <div className="ml-2">
                <div className="c-detail-address">{get(selectedItem, "place.fullAddress", "").toLowerCase()}</div>
                {distance ? (
                  <div className="c-detail-km">
                    {round(distance, 1) + " "}
                    km(s) du lieu de recherche
                  </div>
                ) : (
                  ""
                )}
              </div>
            </p>

            {kind === "formation" ? (
              <>
                <div className="c-detail-km c-detail-pelink">
                  <img src={linkIcon} alt="Lien" />
                  <a href="http://www.ecoledetravail.fr" className="ml-3" target="_blank" rel="noopener noreferer">
                    www.ecoledetravail.fr
                  </a>
                </div>
                <div className="pt-5 pl-3">
                  {seeInfo ? (
                    contactInfo
                  ) : (
                    <button
                      className="d-block btn btn-lg btn-dark w-75 font-weight-bold c-regular-darkbtn ml-3 mt-3"
                      onClick={() => setSeeInfo(true)}
                    >
                      Voir les informations de contact
                    </button>
                  )}
                </div>
              </>
            ) : (
              <p className="mb-4">
                <span className="c-detail-sizetitle d-block">Taille de l'entreprise</span>
                <span className="c-detail-sizetext d-block">
                  {defaultTo(companySize, ReactHtmlParser("<em>Non renseigné</em>"))}
                </span>
                {siret ? (
                  <a
                    target="lbb"
                    href={`https://labonneboite.pole-emploi.fr/${siret}/details`}
                    className="d-block btn btn-outline-primary w-50 mt-3 c-detail-seeinfo"
                  >
                    Voir les informations de contact
                  </a>
                ) : (
                  ""
                )}
              </p>
            )}
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
