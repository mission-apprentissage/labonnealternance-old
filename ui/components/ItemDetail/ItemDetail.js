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

const ItemDetail = ({ selectedItem, handleClose }) => {
  return (
    <div className={`itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
      <header>
        header
      </header>


      {selectedItem ? <CommonDetail thing={selectedItem} /> : ""}

    </div>
  );
};

export default ItemDetail;
