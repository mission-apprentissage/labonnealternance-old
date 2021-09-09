import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PeJobDetail from "./PeJobDetail";
import MatchaDetail from "./MatchaDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { findIndex, concat, pick, get, defaultTo, round } from "lodash";
import { amongst } from "utils/arrayutils";
import smallMapPointIcon from "public/images/icons/small_map_point.svg";
import chevronLeft from "public/images/chevronleft.svg";
import chevronRight from "public/images/chevronright.svg";
import chevronClose from "public/images/close.svg";
import { capitalizeFirstLetter } from "utils/strutils";
import { rawPostalAddress } from "utils/addressUtils";
import { isCfaEntreprise } from "services/cfaEntreprise";

import { useSwipeable } from "react-swipeable";
import { mergeJobs, mergeOpportunities } from "utils/itemListUtils";

import TagCandidatureSpontanee from "./TagCandidatureSpontanee";
import TagOffreEmploi from "./TagOffreEmploi";
import TagCfaDEntreprise from "./TagCfaDEntreprise";

const ItemDetail = ({ selectedItem, handleClose, displayNavbar, handleSelectItem, activeFilter }) => {
  console.log('selectedItem', selectedItem);
  const kind = selectedItem?.ideaType;

  const isCfa = isCfaEntreprise(selectedItem?.company?.siret)

  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  useEffect(() => {
    setSeeInfo(false);
  }, [selectedItem?.id, selectedItem?.company?.siret, selectedItem?.job?.id]);

  let actualTitle =
    kind === "formation"
      ? selectedItem?.title || selectedItem?.longTitle
      : selectedItem?.company?.name || selectedItem?.title || selectedItem?.longTitle;

  const { extendedSearch } = useSelector((state) => state.trainings);

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
                {kind === "formation" ? (
                  <TagCfaDEntreprise isCfa={isCfa} />
                ) : (
                  ""
                )}
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

            <h1 className={"c-detail-title c-detail-title--" + kind}>{defaultTo(actualTitle, "")}</h1>

            {amongst(kind, ["lba", "lbb"]) ? (
              <p className={`c-detail-activity c-detail-title--${kind}`}>
                {kind === "lba" || kind === "lbb" ? get(selectedItem, "nafs[0].label", "Candidature spontanée") : ""}
              </p>
            ) : (
              ""
            )}
            {amongst(kind, ["formation"]) ? (
              <p className={`c-detail-activity c-detail-title--formation`}>
                {`${get(selectedItem, "company.name", "")} (${selectedItem.company.place.city})`}
              </p>
            ) : (
              ""
            )}
            {kind === "matcha" ? <div className="c-detail-matcha-subtitle text-left">{selectedItem.title}</div> : ""}
            <p className="d-flex mt-4 text-left">
              <span className="d-block">
                <span className="c-detail-address d-block">{get(selectedItem, "place.fullAddress", "")}</span>
                {distance ? (
                  <span className="c-detail-km d-block">
                    {round(distance, 1) + " "}
                    km(s) du lieu de recherche
                  </span>
                ) : (
                  ""
                )}
                {getPathBlock()}
              </span>
            </p>
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
          {kind === "formation" ? (
            <TrainingDetail training={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} isCfa={isCfa} />
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default ItemDetail;
