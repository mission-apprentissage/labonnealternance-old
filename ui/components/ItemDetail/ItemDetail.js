import React, { useState, useEffect, useContext } from "react";
import PeJobDetail from "./PeJobDetail";
import MatchaDetail from "./MatchaDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { findIndex, concat, pick, get, defaultTo } from "lodash";
import { amongst } from "../../utils/arrayutils";
import chevronLeft from "public/images/chevronleft.svg";
import chevronRight from "public/images/chevronright.svg";
import chevronClose from "public/images/close.svg";
import { capitalizeFirstLetter } from "../../utils/strutils";
import { isCfaEntreprise } from "../../services/cfaEntreprise";
import { filterLayers } from "../../utils/mapTools";
import ExternalLink from "../externalLink";
import { SearchResultContext } from "../../context/SearchResultContextProvider";
import { useSwipeable } from "react-swipeable";
import { mergeJobs, mergeOpportunities } from "../../utils/itemListUtils";

import TagCandidatureSpontanee from "./TagCandidatureSpontanee";
import TagOffreEmploi from "./TagOffreEmploi";
import TagCfaDEntreprise from "./TagCfaDEntreprise";
import TagFormationAssociee from "./TagFormationAssociee";
import LocationDetail from "./LocationDetail";
import DidYouKnow from "./DidYouKnow";
import CandidatureSpontanee from "./CandidatureSpontanee/CandidatureSpontanee";
import isCandidatureSpontanee from "./CandidatureSpontanee/services/isCandidatureSpontanee";

import GoingToContactQuestion, { getGoingtoId } from "./GoingToContactQuestion";
import gotoIcon from "public/images/icons/goto.svg";

const getTags = ({ kind, isCfa, isMandataire }) => {
  return (
    <div className="mr-auto c-tagcfa-container text-left">
      {kind === "formation" ? <TagCfaDEntreprise isCfa={isCfa} /> : ""}
      {amongst(kind, ["lbb", "lba"]) ? <TagCandidatureSpontanee /> : ""}
      {amongst(kind, ["peJob", "matcha"]) ? <TagOffreEmploi /> : ""}
      {amongst(kind, ["matcha"]) && isMandataire ? <TagFormationAssociee isMandataire /> : ""}
    </div>
  );
};

const getH1 = ({ kind, actualTitle }) => {
  return <h1 className={"c-detail-title c-detail-title--" + kind}>{defaultTo(actualTitle, "")}</h1>;
};

const getActualTitle = ({ selectedItem, kind }) => {
  let title = "";

  if (kind === "formation") {
    title = selectedItem?.title || selectedItem?.longTitle;
  } else if (kind === "matcha") {
    title = selectedItem?.title;
  } else if (kind === "peJob") {
    title = selectedItem?.title;
  } else {
    // lba / lbb
    title = selectedItem?.nafs[0]?.label;
  }

  return title;
};

const getCurrentList = (store, activeFilter, extendedSearch) => {
  let picked = pick(store, ["trainings", "jobs"]);
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
return  fullList.filter((el) => !!el);
};

const ItemDetail = ({ selectedItem, handleClose, displayNavbar, handleSelectItem, activeFilter }) => {
  const kind = selectedItem?.ideaType;

  const isCfa = isCfaEntreprise(selectedItem?.company?.siret, selectedItem?.company?.headquarter?.siret);
  const isMandataire = selectedItem?.company?.mandataire;

  const [seeInfo, setSeeInfo] = useState(false);

  useEffect(() => {
    setSeeInfo(false);
    try {
      filterLayers(activeFilter);
    } catch (err) {
      //notice: gère des erreurs qui se présentent à l'initialisation de la page quand mapbox n'est pas prêt.
    }
  }, [selectedItem?.id, selectedItem?.company?.siret, selectedItem?.job?.id]);

  let actualTitle = getActualTitle({ kind, selectedItem });

  const { trainings, jobs, extendedSearch } = useContext(SearchResultContext);
  const currentList = getCurrentList({ trainings, jobs }, activeFilter, extendedSearch);

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

  const buildPrdvButton = (training) => {
    return (
      <div
        className="widget-prdv gtmPrdv"
        data-referrer="lba"
        data-id-cle-ministere-educatif={training.cleMinistereEducatif}
        data-id-rco-formation={training.idRcoFormation}
      >
        <ExternalLink className="gtmPrdv" url={training.prdvUrl} title="Prendre rendez-vous" />
      </div>
    );
  };

  const [collapseHeader, setCollapseHeader] = useState(false);
  const maxScroll = 100;
  const handleScroll = () => {
    let currentScroll = document.querySelector(".c-detail").scrollTop;
    currentScroll += collapseHeader ? 100 : -100;
    setCollapseHeader(currentScroll > maxScroll);
  };

  const buttonJePostuleShouldBeDisplayed = (oneKind, oneItem) => {
    return oneKind === "peJob" && oneItem?.url;
  };

  const buttonPRDVShouldBeDisplayed = (oneItem) => {
    return oneItem?.prdvUrl;
  };

  const getNavigationButtons = () => {
    return (
      <>
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
      </>
    );
  };

  const getSurtitre = ({ selectedItem, kind }) => {
    let res = "";

    if (kind === "matcha") {
      res = (
        <p className={`c-detail-activity c-detail-title--entreprise mt-2`}>
          <span>{`${get(selectedItem, "company.name", "")}`}</span>
          <span className="c-detail-activity__proposal">
            &nbsp;propose actuellement cette offre dans le domaine suivant
          </span>
        </p>
      );
    }

    if (kind === "peJob") {
      res = (
        <p className={`c-detail-activity c-detail-title--entreprise mt-2`}>
          <span>{`${get(selectedItem, "company.name", "Une société ayant souhaité garder l'anonymat")}`}</span>
          <span className="c-detail-activity__proposal">&nbsp;propose actuellement cette offre</span>
        </p>
      );
    }

    if (amongst(kind, ["lba", "lbb"])) {
      res = (
        <p className={`c-detail-activity c-detail-title--entreprise mt-2`}>
          <span>{`${get(selectedItem, "company.name", "")}`}</span>
          <span className="c-detail-activity__proposal">
            &nbsp;a des salariés qui exercent le métier auquel vous vous destinez. Envoyez votre candidature spontanée !
          </span>
        </p>
      );
    }

    if (kind === "formation") {
      res = (
        <p className={`c-detail-activity c-detail-title--formation`}>
          <span>{`${get(selectedItem, "company.name", "")} (${selectedItem.company.place.city})`}</span>
          <span className="c-detail-activity__proposal">&nbsp;propose cette formation</span>
        </p>
      );
    }

    return res;
  };

  return (
    <>
      <section
        onScroll={handleScroll}
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
        <header className={`c-detail-header c-detail--collapse-header-${collapseHeader}`}>
          <div className="w-100">
            <div className="d-flex justify-content-end mb-2 c-tiny-btn-bar">
              {getTags({ kind, isCfa, isMandataire })}
              {getNavigationButtons()}
            </div>

            {getSurtitre({ selectedItem, kind })}

            {getH1({ kind, actualTitle })}

            <p className="mt-4 c-detail-address-section">
              <span className="d-block">
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 21.7279L2.636 15.3639C1.37734 14.1052 0.520187 12.5016 0.172928 10.7558C-0.17433 9.00995 0.00390685 7.20035 0.685099 5.55582C1.36629 3.91129 2.51984 2.50569 3.99988 1.51677C5.47992 0.527838 7.21998 0 9 0C10.78 0 12.5201 0.527838 14.0001 1.51677C15.4802 2.50569 16.6337 3.91129 17.3149 5.55582C17.9961 7.20035 18.1743 9.00995 17.8271 10.7558C17.4798 12.5016 16.6227 14.1052 15.364 15.3639L9 21.7279ZM13.95 13.9499C14.9289 12.9709 15.5955 11.7236 15.8656 10.3658C16.1356 9.00795 15.9969 7.60052 15.4671 6.32148C14.9373 5.04244 14.04 3.94923 12.8889 3.18009C11.7378 2.41095 10.3844 2.00043 9 2.00043C7.61557 2.00043 6.26222 2.41095 5.11109 3.18009C3.95996 3.94923 3.06275 5.04244 2.53292 6.32148C2.00308 7.60052 1.86442 9.00795 2.13445 10.3658C2.40449 11.7236 3.07111 12.9709 4.05 13.9499L9 18.8999L13.95 13.9499ZM9 10.9999C8.46957 10.9999 7.96086 10.7892 7.58579 10.4141C7.21072 10.0391 7 9.53035 7 8.99992C7 8.46949 7.21072 7.96078 7.58579 7.58571C7.96086 7.21064 8.46957 6.99992 9 6.99992C9.53044 6.99992 10.0391 7.21064 10.4142 7.58571C10.7893 7.96078 11 8.46949 11 8.99992C11 9.53035 10.7893 10.0391 10.4142 10.4141C10.0391 10.7892 9.53044 10.9999 9 10.9999Z"
                    fill="#2A2A2A"
                  />
                </svg>
                <span className="c-detail-address">&nbsp;{get(selectedItem, "place.zipCode", "")}</span>
                <span className="c-detail-address">
                  &nbsp;{selectedItem?.place?.city || selectedItem?.place?.address}
                </span>
              </span>
            </p>

            {buttonJePostuleShouldBeDisplayed(kind, selectedItem) ? (
              <div className="c-detail-description-me">
                <div className="c-detail-pelink my-3">
                  <a className="btn btn-blue ml-1 gtmContactPE" target="poleemploi" href={selectedItem.url}>
                    Je postule sur Pôle emploi
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}

            {isCandidatureSpontanee(selectedItem) ? (
              <>
                <hr className="c-detail-header-separator mt-0" />
                <CandidatureSpontanee item={selectedItem} />
              </>
            ) : (
              ""
            )}

            {kind === "formation" && buttonPRDVShouldBeDisplayed(selectedItem) ? (
              <>
                <hr className={"c-detail-header-separator c-detail-header-separator--upperformation"} />
                <div className="c-detail-prdv mt-3 pb-4 w-75">{buildPrdvButton(selectedItem)}</div>
              </>
            ) : (
              <div className="c-detail-emptyspace">&nbsp;</div>
            )}
          </div>
        </header>

        {kind === "peJob" ? <PeJobDetail job={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} /> : ""}
        {kind === "matcha" ? <MatchaDetail job={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} /> : ""}
        {amongst(kind, ["lbb", "lba"]) ? (
          <LbbCompanyDetail lbb={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} />
        ) : (
          ""
        )}

        {kind === "formation" ? <TrainingDetail training={selectedItem} isCfa={isCfa} /> : ""}

        {amongst(kind, ["lbb", "lba"]) ? (
          <div className="c-needHelp">
            <div className="c-needHelp-title">Besoin d'aide ?</div>
            <div className="c-needHelp-text">
              Découvrez les modules de formation de La Bonne Alternance. Des modules de quelques minutes pour bien
              préparer vos candidatures.
            </div>
            <ul className="c-needHelp-listLinks">
              <li>
                <span className="c-detail-traininglink ml-1">
                  <ExternalLink
                    className="gtmDidask1 c-nice-link"
                    url="https://dinum-beta.didask.com/courses/demonstration/60d21bf5be76560000ae916e"
                    title="Chercher un employeur"
                    withPic={<img src={gotoIcon} alt="Lien" />}
                  />
                </span>
              </li>
              <li>
                <span className="c-detail-traininglink ml-1">
                  <ExternalLink
                    className="gtmDidask2 c-nice-link"
                    url="https://dinum-beta.didask.com/courses/demonstration/60d1adbb877dae00003f0eac"
                    title="Préparer un entretien avec un employeur"
                    withPic={<img src={gotoIcon} alt="Lien" />}
                  />
                </span>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}

        <LocationDetail item={selectedItem}></LocationDetail>

        {kind === "peJob" ? (
          <>
            <DidYouKnow item={selectedItem}></DidYouKnow>

            {buttonJePostuleShouldBeDisplayed(kind, selectedItem) ? (
              ""
            ) : (
              <GoingToContactQuestion
                kind={kind}
                uniqId={getGoingtoId(kind, selectedItem)}
                key={getGoingtoId(kind, selectedItem)}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {kind === "formation" ? (
          <>
            {buttonPRDVShouldBeDisplayed(selectedItem) ? (
              ""
            ) : (
              <GoingToContactQuestion
                kind={kind}
                uniqId={getGoingtoId(kind, selectedItem)}
                key={getGoingtoId(kind, selectedItem)}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {kind === "lbb" || kind === "lba" ? (
          <>
            {isCandidatureSpontanee(selectedItem) ? (
              ""
            ) : (
              <GoingToContactQuestion
                kind={kind}
                uniqId={getGoingtoId(kind, selectedItem)}
                key={getGoingtoId(kind, selectedItem)}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default ItemDetail;
