import React, { useState } from "react";
import { useSelector } from "react-redux";
import PeJobDetail from "./PeJobDetail";
import MatchaDetail from "./MatchaDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { findIndex, concat, pick, get, includes, defaultTo, round } from "lodash";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";
import { useSwipeable } from "react-swipeable";

const ItemDetail = ({ selectedItem, handleClose, displayNavbar, handleSelectItem, activeFilter }) => {
  const kind = selectedItem?.ideaType;

  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  let actualTitle = selectedItem?.title || selectedItem?.longTitle;

  const currentList = useSelector((store) => {
    let picked = pick(store.trainings, ['trainings', 'jobs'])
    let trainingsArray = includes(['all', 'trainings'], activeFilter) ? get(picked, 'trainings', []) : []
    let peArray = includes(['all', 'jobs'], activeFilter) ? get(picked, 'jobs.peJobs', []) : []
    let lbaArray = includes(['all', 'jobs'], activeFilter) ? get(picked, 'jobs.lbaCompanies', []) : []
    let lbbArray = includes(['all', 'jobs'], activeFilter) ? get(picked, 'jobs.lbbCompanies', []) : []
    let fullList = concat([], trainingsArray, peArray, lbaArray, lbbArray)
    let listWithoutEmptyValues = fullList.filter(el => !!el)
    return listWithoutEmptyValues
  })

  // See https://www.npmjs.com/package/react-swipeable
  const swipeHandlers = useSwipeable({
    onSwiped: (event_data) => {
      if (event_data.dir === 'Right') {
        if (currentList.length > 1) {
          goPrev()
        }
      } else if (event_data.dir === 'Left') {
        if (currentList.length > 1) {
          goNext()
        }
      }
    }
  })
  const goNext = () => {
    let currentIndex = findIndex(currentList, selectedItem)
    let nextIndex = (currentIndex == currentList.length - 1 ? 0 : currentIndex + 1)
    handleSelectItem(currentList[nextIndex])
  }
  const goPrev = () => {
    let currentIndex = findIndex(currentList, selectedItem)
    let prevIndex = (currentIndex == 0 ? currentList.length - 1 : currentIndex - 1)
    handleSelectItem(currentList[prevIndex])
  }

  return (
    <>
      <section className={`c-detail itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`} {...swipeHandlers}>
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
          <div className="text-left">
            <div className="d-flex">
              <div className="mr-auto">
                <button
                  className="c-tiny-btn"
                  onClick={() => {
                    setSeeInfo(false);
                    handleClose ();
                  }}
                >
                  ← Retour aux résultats
                </button>
              </div>
              <div>
                <button
                  className="c-tiny-btn"
                  onClick={() => { goPrev() }}
                >
                  ← Résultat précédent
                </button>              
              </div>
              <div className="ml-2">
                <button
                  className="c-tiny-btn"
                  onClick={() => { goNext() }}
                >
                  Résultat suivant →
                </button>              
              </div>
            </div>

            <p className={"c-detail-title c-detail-title--" + kind}>{defaultTo(actualTitle, "")}</p>

            <p className={`c-detail-activity c-detail-title--${kind}`}>
              {kind === "lba" || kind === "lbb"
                ? get(selectedItem, "nafs[0].label", "Candidature spontanée")
                : get(selectedItem, "company.name", "")}
              {kind === "formation" ? ` (${selectedItem.company.place.city})` : ""}
            </p>
            <p className="d-flex mt-4">
              <span className="d-block">
                <img className="cardIcon" src={smallMapPointIcon} alt="Illustration d'un point sur la carte" />
              </span>
              <span className="ml-2 d-block">
                <span className="c-detail-address d-block">{get(selectedItem, "place.fullAddress", "")}</span>
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
          </div>
        </header>

        <div className="c-detail-body">
          {selectedItem?.url ? (
            <div className="c-detail-description-me">
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
          {includes(["lbb", "lba"], kind) ? (
            <LbbCompanyDetail lbb={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} />
          ) : (
            ""
          )}
          {kind === "formation" ? (
            <TrainingDetail training={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} />
          ) : (
            ""
          )}
          
        </div>
      </section>
    </>
  );
};

export default ItemDetail;
