import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./FakeFeature.css";

const FakeFeature = ({
  buttonText,
  tagName,
  modalTitleBeforeSelection,
  modalTextBeforeSelection,
  modalTitleAfterSelection,
  modalTextAfterSelection,
  questionsAndTags,
}) => {
  
  const handleClick = () => {
    setIsOptionSelected(true);
  };

  const [modal, setModal] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="avenir">
        <button onClick={toggle} className={tagName}>
          {buttonText}
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
                    <Button color="primary" className={`${question.tagName} question`} onClick={handleClick}>
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
