import React, { useState } from "react";
import PeJobDetail from "./PeJobDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { get, includes, defaultTo, round } from "lodash";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";
import { useSwipeable } from "react-swipeable";

const ItemDetail = ({ selectedItem, handleClose, displayNavbar }) => {
  const kind = selectedItem?.ideaType;

  const distance = selectedItem?.place?.distance;

  const [seeInfo, setSeeInfo] = useState(false);

  let actualTitle = selectedItem?.title || selectedItem?.longTitle;

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
            <button
              className="c-detail-back"
              onClick={() => {
                setSeeInfo(false);
                handleClose();
              }}
            >
              ← Retour aux résultats
            </button>

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
