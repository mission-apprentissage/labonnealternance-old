import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const FakeFeature = ({ buttonText, tagName, modalTitle, modalText, questionsAndTags }) => {
  const handleClick = () => {
    console.log("aaaa ", modalText, "  ----- ", questionsAndTags);
    toggle();
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <button onClick={handleClick} className={`${tagName} avenir`}>
        {buttonText}
      </button>
      <Modal isOpen={modal} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        {questionsAndTags ? (
          <ModalBody>
            {modalText}
            {questionsAndTags.map((question, idx) => (
              <div key={idx}>
                <Button color="secondary" className={question.tagName} onClick={toggle}>
                  {question.question}
                </Button>
              </div>
            ))}
          </ModalBody>
        ) : (
          ""
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
