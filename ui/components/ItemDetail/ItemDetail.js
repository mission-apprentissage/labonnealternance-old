import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PeJobDetail from "./PeJobDetail";
import MatchaDetail from "./MatchaDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { findIndex, concat, pick, get, defaultTo, round } from "lodash";
import { amongst } from "../../utils/arrayutils";
import smallMapPointIcon from "public/images/icons/small_map_point.svg";
import chevronLeft from "public/images/chevronleft.svg";
import chevronRight from "public/images/chevronright.svg";
import chevronClose from "public/images/close.svg";
import { capitalizeFirstLetter } from "../../utils/strutils";
import { rawPostalAddress } from "../../utils/addressUtils";
import { isCfaEntreprise } from "../../services/cfaEntreprise";
import { filterLayers } from "../../utils/mapTools";

import { useSwipeable } from "react-swipeable";
import { mergeJobs, mergeOpportunities } from "../../utils/itemListUtils";

import TagCandidatureSpontanee from "./TagCandidatureSpontanee";
import TagOffreEmploi from "./TagOffreEmploi";
import TagCfaDEntreprise from "./TagCfaDEntreprise";
import LocationDetail from "./LocationDetail";

const ItemDetail = ({ selectedItem, handleClose, displayNavbar, handleSelectItem, activeFilter }) => {
  console.log('selectedItem', selectedItem);
  const kind = selectedItem?.ideaType;

  const isCfa = isCfaEntreprise(selectedItem?.company?.siret, selectedItem?.company?.headquarter?.siret);

  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  useEffect(() => {
    setSeeInfo(false);
    try {
      filterLayers(activeFilter);
    } catch (err) {
      //notice: gère des erreurs qui se présentent à l'initialisation de la page quand mapbox n'est pas prêt.
    }
  }, [selectedItem?.id, selectedItem?.company?.siret, selectedItem?.job?.id]);

  let actualTitle =
    kind === "formation"
      ? selectedItem?.title || selectedItem?.longTitle
      : selectedItem?.company?.name || selectedItem?.title || selectedItem?.longTitle;

  const { extendedSearch, formValues } = useSelector((state) => state.trainings);
  const hasLocation = formValues?.location?.value ? true : false;

  const currentList = useSelector((store) => {
    let picked = pick(store.trainings, ["trainings", "jobs"]);
    let trainingsArray = amongst(activeFilter, ["all", "trainings"]) ? get(picked, "trainings", []) : [];

    let jobList = [];
    let companyList = [];
    if (amongst(activeFilter, ["all", "jobs"])) {
      if (extendedSearch) jobList = mergeOpportunities(get(picked, "jobs"));
      else {
        jobList = mergeJobs(get(picked, "jobs"));
        companyList = mergeOpportunities(get(picked, "jobs"), "onlyLbbLba");
      }
    }
    let fullList = concat([], trainingsArray, jobList, companyList);
    let listWithoutEmptyValues = fullList.filter((el) => !!el);
    return listWithoutEmptyValues;
  });

  // See https://www.npmjs.com/package/react-swipeable
  const swipeHandlers = useSwipeable({
    onSwiped: (event_data) => {
      if (event_data.dir === "Right") {
        if (currentList.length > 1) {
          goPrev();
        }
      } else if (event_data.dir === "Left") {
        if (currentList.length > 1) {
          goNext();
        }
      }
    },
  });
  const goNext = () => {
    let currentIndex = findIndex(currentList, selectedItem);
    let nextIndex = currentIndex == currentList.length - 1 ? 0 : currentIndex + 1;
    handleSelectItem(currentList[nextIndex]);
  };
  const goPrev = () => {
    let currentIndex = findIndex(currentList, selectedItem);
    let prevIndex = currentIndex == 0 ? currentList.length - 1 : currentIndex - 1;
    handleSelectItem(currentList[prevIndex]);
  };

  const getPathLink = () => {
    return `https://www.google.fr/maps/dir//
            ${encodeURIComponent(rawPostalAddress(selectedItem.place.fullAddress))}/@
            ${selectedItem.place.latitude},
            ${selectedItem.place.longitude},
            14z/`;
  };

  const getPathBlock = () => {
    return selectedItem ? (
      <span className="d-block mt-2">
        <span>
          <img className="cardIcon mr-2" src={smallMapPointIcon} alt="" />
        </span>
        <span className="c-detail-sizetext">
          <a
            href={getPathLink()}
            target="_blank"
            className={`c-detail-googledir-link gtm${capitalizeFirstLetter(kind)} gtmPathLink`}
            rel="noopener noreferrer"
          >
            <span>
              Obtenir l'itinéraire <img className="mt-n1" src="/images/square_link.svg" alt="" />
            </span>
          </a>
        </span>
      </span>
    ) : (
      ""
    );
  };

  const buildPrdvButton = (training) => {
    return training?.prdvUrl ? (
      <div
        className="widget-prdv gtmPrdv"
        data-referrer="lba"
        data-id-cle-ministere-educatif={training.cleMinistereEducatif}
        data-id-rco-formation={training.idRcoFormation}
      >
        <a href={training.prdvUrl} target="_blank" rel="noopener noreferrer" className="gtmPrdv">
          Prendre rendez-vous
        </a>
      </div>
    ) : (
      ""
    );
  };

  return (
    <>
      <section
        className={`c-detail itemDetail ${kind ? `gtmDetail${capitalizeFirstLetter(kind)}` : ""} ${
          selectedItem ? "" : "hiddenItemDetail"
        }`}
        {...swipeHandlers}
      >
        {displayNavbar ? (
          <nav
            className="c-detail-stickynav"
            onClick={() => {
              setSeeInfo(false);
              handleClose();
            }}
          >
            <span className="mr-3">←</span> {actualTitle}
          </nav>
        ) : (
          ""
        )}
        <header className="c-detail-header">
          <div className="">
            <div className="d-flex justify-content-end mb-2">
              <div className="mr-auto">
                {kind === "formation" ? <TagCfaDEntreprise isCfa={isCfa} /> : ""}
                {amongst(kind, ["lbb", "lba"]) ? <TagCandidatureSpontanee /> : ""}
                {amongst(kind, ["peJob", "matcha"]) ? <TagOffreEmploi /> : ""}
              </div>
              <div>
                <button
                  className="c-tiny-btn"
                  onClick={() => {
                    goPrev();
                  }}
                >
                  <img className="c-tiny-btn__image" src={chevronLeft} alt="Résultat précédent" />
                </button>
              </div>
              <div className="ml-2">
                <button
                  className="c-tiny-btn"
                  onClick={() => {
                    goNext();
                  }}
                >
                  <img className="c-tiny-btn__image" src={chevronRight} alt="Résultat suivant" />
                </button>
              </div>
              <div className="ml-2">
                <button
                  className="c-tiny-btn"
                  onClick={() => {
                    setSeeInfo(false);
                    handleClose();
                  }}
                >
                  <img className="c-tiny-btn__image" src={chevronClose} alt="Fermer la fenêtre" />
                </button>
              </div>
            </div>

            {amongst(kind, ["lba", "lbb"]) ? (
              <p className={`c-detail-activity c-detail-title--${kind}`}>
                {get(selectedItem, "nafs[0].label", "Candidature spontanée")}
              </p>
            ) : (
              ""
            )}
            {amongst(kind, ["formation"]) ? (
              <p className={`c-detail-activity c-detail-title--formation mt-3`}>
                <span>{`${get(selectedItem, "company.name", "")} (${selectedItem.company.place.city})`}</span>
                <span className="c-detail-activity__proposal">&nbsp;propose cette formation</span>
              </p>
            ) : (
              ""
            )}
            <h1 className={"c-detail-title c-detail-title--" + kind}>{defaultTo(actualTitle, "")}</h1>

            {kind === "matcha" ? <div className="c-detail-matcha-subtitle text-left">{selectedItem.title}</div> : ""}

            {kind === "formation" ?
            <>
                <p className="d-flex mt-4 text-left">
                  <span className="d-block">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 21.7279L2.636 15.3639C1.37734 14.1052 0.520187 12.5016 0.172928 10.7558C-0.17433 9.00995 0.00390685 7.20035 0.685099 5.55582C1.36629 3.91129 2.51984 2.50569 3.99988 1.51677C5.47992 0.527838 7.21998 0 9 0C10.78 0 12.5201 0.527838 14.0001 1.51677C15.4802 2.50569 16.6337 3.91129 17.3149 5.55582C17.9961 7.20035 18.1743 9.00995 17.8271 10.7558C17.4798 12.5016 16.6227 14.1052 15.364 15.3639L9 21.7279ZM13.95 13.9499C14.9289 12.9709 15.5955 11.7236 15.8656 10.3658C16.1356 9.00795 15.9969 7.60052 15.4671 6.32148C14.9373 5.04244 14.04 3.94923 12.8889 3.18009C11.7378 2.41095 10.3844 2.00043 9 2.00043C7.61557 2.00043 6.26222 2.41095 5.11109 3.18009C3.95996 3.94923 3.06275 5.04244 2.53292 6.32148C2.00308 7.60052 1.86442 9.00795 2.13445 10.3658C2.40449 11.7236 3.07111 12.9709 4.05 13.9499L9 18.8999L13.95 13.9499ZM9 10.9999C8.46957 10.9999 7.96086 10.7892 7.58579 10.4141C7.21072 10.0391 7 9.53035 7 8.99992C7 8.46949 7.21072 7.96078 7.58579 7.58571C7.96086 7.21064 8.46957 6.99992 9 6.99992C9.53044 6.99992 10.0391 7.21064 10.4142 7.58571C10.7893 7.96078 11 8.46949 11 8.99992C11 9.53035 10.7893 10.0391 10.4142 10.4141C10.0391 10.7892 9.53044 10.9999 9 10.9999Z" fill="#2A2A2A" />
                    </svg>
                    <span className="c-detail-address">&nbsp;{get(selectedItem, "place.zipCode", "")}</span>
                    <span className="c-detail-address">&nbsp;{get(selectedItem, "place.city", "")}</span>
                  </span>
                </p>
                {
                  selectedItem?.prdvUrl ? 
                    <>
                      <hr className={"c-detail-header-separator c-detail-header-separator--upperformation"} />
                      <div className="c-detail-prdv mt-3 pb-4 w-75">{buildPrdvButton(selectedItem)}</div>
                    </>
                    :
                    <div>&nbsp;</div>
                }
            </>
              :
                <p className="d-flex mt-4 text-left">
                  <span className="d-block">
                    <span className="c-detail-address d-block">{get(selectedItem, "place.fullAddress", "")}</span>
                    {hasLocation && distance ? (
                      <span className="c-detail-km d-block">
                        {round(distance, 1) + " "}
                        km(s) du lieu de recherchez
                      </span>
                    ) : (
                      ""
                    )}
                    {getPathBlock()}
                  </span>
                </p>
              }            
          </div>
        </header>

        <div className="c-detail-body mt-4">
          {kind === "peJob" && selectedItem?.url ? (
            <div className="c-detail-description-me col-12 col-md-5">
              <div className="c-detail-pelink my-3">
                <a className="btn btn-dark ml-1 gtmContactPE" target="poleemploi" href={selectedItem.url}>
                  Je postule sur Pôle emploi
                </a>
              </div>
            </div>
          ) : (
            ""
          )}
          {kind === "peJob" ? <PeJobDetail job={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} /> : ""}
          {kind === "matcha" ? <MatchaDetail job={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} /> : ""}
          {amongst(kind, ["lbb", "lba"]) ? (
            <LbbCompanyDetail lbb={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} />
          ) : (
            ""
          )}
          {kind === "formation" ? <TrainingDetail training={selectedItem} isCfa={isCfa} /> : ""}


        </div>
        <LocationDetail item={selectedItem}></LocationDetail>
      </section>
    </>
  );
};

export default ItemDetail;
