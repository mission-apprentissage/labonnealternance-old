import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./FakeFeature.css";
import buttonPriseDeRDVIcon from "../../assets/icons/fake_feature_btn.svg";

const FakeFeature = ({
  buttonText,
  tagName,
  modalTitleBeforeSelection,
  modalTextBeforeSelection,
  modalTitleAfterSelection,
  modalTextAfterSelection,
  questionsAndTags,
  isOptionSelected,
  setIsOptionSelected,
}) => {
  const handleClick = () => {
    setIsOptionSelected(true);
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="avenir">
        <button onClick={handleClick} className={tagName}>
          <img src={buttonPriseDeRDVIcon} alt="thumb up icon" />{buttonText}
        </button>
      </div>
      <Modal isOpen={modal} toggle={toggle} backdrop="static" className="avenirModale">
        {isOptionSelected && (
          <>
            <ModalHeader toggle={toggle}>{modalTitleAfterSelection}</ModalHeader>
            <ModalBody>{modalTextAfterSelection}</ModalBody>
          </>
        )}
        {!isOptionSelected && (
          <>
            <ModalHeader toggle={toggle}>{modalTitleBeforeSelection}</ModalHeader>
            {questionsAndTags ? (
              <ModalBody>
                {modalTextBeforeSelection}
                {questionsAndTags.map((question, idx) => (
                  <div key={idx}>
                    <Button color="primary" className={`${question.tagName} question`} onClick={toggle}>
                      {question.question}
                    </Button>
                  </div>
                ))}
              </ModalBody>
            ) : (
              ""
            )}
          </>
        )}
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Retour
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FakeFeature;
