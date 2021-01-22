import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import LbbCompany from "./LbbCompany";
import Training from "./Training";
import PeJobDetail from "./PeJobDetail";
import PeJob from "./PeJob";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import CommonDetail from "./CommonDetail";
import _ from "lodash";
import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";

const ItemDetail = ({ selectedItem, handleClose }) => {
  return (
    <div className={`itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
      <header>
        <div className='text-left'>
          <button className="c-detail-back" onClick={handleClose}>
            ← Retour aux résultats
          </button>          
          <p className="c-detail-title">
            {_.get(selectedItem, 'company.name', '')}
          </p>
          <p className="c-detail-activity">
            Activité non renseignée
          </p>
          <p>
            <span>
              <img className="cardIcon" src={smallMapPointIcon} alt="Illustration d'un point sur la carte" />
            </span>
            <span className="c-detail-address">
              {_.get(selectedItem, 'place.fullAddress', '').toLowerCase()}
            </span>
          </p>
        </div>
      </header>


      {selectedItem ? <CommonDetail thing={selectedItem} /> : ""}

    </div>
  );
};

export default ItemDetail;
