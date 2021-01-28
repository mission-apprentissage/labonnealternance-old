import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import LbbCompany from "./LbbCompany";
import Training from "./Training";
import PeJobDetail from "./PeJobDetail";
import PeJob from "./PeJob";
import MobileNavbar from "./MobileNavbar";
import LbbCompanyDetail from "./LbbCompanyDetail";
import TrainingDetail from "./TrainingDetail";
import CommonDetail from "./CommonDetail";
import { get, includes, defaultTo } from "lodash";
import ReactHtmlParser from 'react-html-parser'; 

import smallMapPointIcon from "../../public/images/icons/small_map_point.svg";

const ItemDetail = ({ selectedItem, handleClose }) => {

  const kind = selectedItem?.ideaType
  const companySize = selectedItem?.company?.size?.toLowerCase()
  return (
    <>
      <section className={`itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>

        <header className='c-detail-header'>
          <div className='text-left'>
            <button className="c-detail-back" onClick={handleClose}>
              ← Retour aux résultats
            </button>          
            <p className="c-detail-title">
              {get(selectedItem, 'company.name', '')}
            </p>
            <p className="c-detail-activity">
              <em>Activité non renseignée</em>
            </p>
            <p>
              <span>
                <img className="cardIcon" src={smallMapPointIcon} alt="Illustration d'un point sur la carte" />
              </span>
              <span className="c-detail-address">
                {get(selectedItem, 'place.fullAddress', '').toLowerCase()}
              </span>
            </p>
            <p>
              <span className="c-detail-sizetitle d-block">
                Taille de l'entreprise
              </span>
              <span className="c-detail-sizetext d-block">
                {defaultTo(companySize, ReactHtmlParser('<em>Non renseigné</em>'))}
              </span>
            </p>
          </div>
          <hr className="c-detail-header-separator"/>
        </header>

        <div>
          { kind === "peJob" ? <PeJobDetail job={selectedItem} /> : ""}
          { includes(['lbb', 'lba'], kind) ? <LbbCompanyDetail  company={selectedItem} /> : ""}
          { kind === "formation" ? <TrainingDetail training={selectedItem}  /> : ""}        
        </div>


      </section>
    </>
  );
};

export default ItemDetail;
