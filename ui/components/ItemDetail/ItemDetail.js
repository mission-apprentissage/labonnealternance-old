import React, { useState } from "react";
import { useSelector  } from "react-redux";
import PeJobDetail from "./PeJobDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";
import { get, pick, concat, includes, defaultTo, round, findIndex } from 'lodash';

const ItemDetail = ({ selectedItem, handleClose, handleSelectedItem }) => {

  console.log('handleSelectedItem', handleSelectedItem);
  const kind = selectedItem?.ideaType;

  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  let actualTitle = selectedItem?.title || selectedItem?.longTitle;

  const currentList = useSelector((store) => {
    let picked = pick(store.trainings, ['trainings', 'jobs'])
    let trainingsArray = get(picked, 'trainings', [])
    let lbaArray = get(picked, 'jobs.lbaCompanies', [])
    let lbbArray = get(picked, 'jobs.lbbCompanies', [])
    let peArray = get(picked, 'jobs.peJobs', [])
    return concat([], trainingsArray, lbaArray, lbbArray, peArray)
  }) 


  const goNext = () => {
    let currentIndex = findIndex(currentList, selectedItem)
    let nextIndex = (currentIndex == currentList.length - 1 ? 0 : currentIndex + 1)
    console.log('nextIndex', nextIndex)
    console.log('handleSelectedItem', handleSelectedItem);
  }
  
  const goPrev = () => {
    console.log('goPrev');
  }

  return (
    <>
      <section className={`c-detail itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
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
          {kind === "peJob" ? <PeJobDetail job={selectedItem} seeInfo={seeInfo} setSeeInfo={setSeeInfo} /> : ""}
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
