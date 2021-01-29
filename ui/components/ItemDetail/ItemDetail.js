import React from "react";
import PeJobDetail from "./PeJobDetail";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import { get, includes, defaultTo } from "lodash";
import ReactHtmlParser from "react-html-parser";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";

const ItemDetail = ({ selectedItem, handleClose }) => {
  const kind = selectedItem?.ideaType;
  const companySize = selectedItem?.company?.size?.toLowerCase();

  return (
    <>
      <section className={`itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
        <header className="c-detail-header">
          <div className="text-left">
            <button className="c-detail-back" onClick={handleClose}>
              ← Retour aux résultats
            </button>
            <p className={"c-detail-title c-detail-title--" + kind}>{get(selectedItem, "company.name", "")}</p>
            <p className="c-detail-activity">
              <em>Activité non renseignée</em>
            </p>
            <p>
              <span>
                <img className="cardIcon" src={smallMapPointIcon} alt="Illustration d'un point sur la carte" />
              </span>
              <span className="c-detail-address">{get(selectedItem, "place.fullAddress", "").toLowerCase()}</span>
              <div>{selectedItem?.place?.distance} km(s) du lieu de recherche</div>
            </p>
            <p>
              <span className="c-detail-sizetitle d-block">Taille de l'entreprise</span>
              <span className="c-detail-sizetext d-block">
                {defaultTo(companySize, ReactHtmlParser("<em>Non renseigné</em>"))}
              </span>
            </p>
          </div>
          <hr className="c-detail-header-separator" />
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
