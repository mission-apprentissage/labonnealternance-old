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
import "./itemdetail.module.css";

const ItemDetail = ({ selectedItem, handleClose }) => {
  return (
    <div className={`itemDetail ${selectedItem ? "" : "hiddenItemDetail"}`}>
      <header>
        <Button className="closeButton" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        {selectedItem && selectedItem.ideaType === "peJob" ? <PeJob job={selectedItem} showTextOnly={true} /> : ""}
        {selectedItem && (selectedItem.ideaType === "lbb" || selectedItem.ideaType === "lba") ? (
          <LbbCompany company={selectedItem} showTextOnly={true} />
        ) : (
          ""
        )}
        {selectedItem && selectedItem.ideaType === "formation" ? (
          <Training training={selectedItem} showTextOnly={true} />
        ) : (
          ""
        )}
      </header>
      <div className="clearBoth" />
      {selectedItem && selectedItem.ideaType === "peJob" ? <PeJobDetail job={selectedItem} /> : ""}
      {selectedItem && (selectedItem.ideaType === "lbb" || selectedItem.ideaType === "lba") ? (
        <LbbCompanyDetail company={selectedItem} />
      ) : (
        ""
      )}
      {selectedItem && selectedItem.ideaType === "formation" ? <TrainingDetail training={selectedItem} /> : ""}
    </div>
  );
};

export default ItemDetail;
