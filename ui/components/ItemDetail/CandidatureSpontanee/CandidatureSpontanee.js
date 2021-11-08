import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import CandidatureSpontaneeNominalBodyFooter from "./CandidatureSpontaneeNominalBodyFooter";
import CandidatureSpontaneeWorked from "./CandidatureSpontaneeWorked";
import CandidatureSpontaneeFailed from "./CandidatureSpontaneeFailed";
import submitCandidature from "./services/submitCandidature";
import toggleCandidature from "./services/toggleCandidature";
import { getValidationSchema, getInitialSchemaValues } from "./services/getSchema";
import { string_wrapper as with_str } from "../../../utils/wrapper_utils";
import { capitalizeFirstLetter } from "../../../utils/strutils";

const CandidatureSpontanee = (props) => {
  const [modal, setModal] = useState(false);
  const [sendingState, setSendingState] = useState("not_sent");
  const kind = props?.item?.ideaType || "";

  const toggle = () => {
    toggleCandidature({ modal, setSendingState, setModal });
  };

  useEffect(() => {
    setModal(false);
  }, [props?.item]);

  const formik = useFormik({
    initialValues: getInitialSchemaValues(),
    validationSchema: getValidationSchema(kind),
    onSubmit: async (applicantValues) => {
      await submitCandidature(applicantValues, setSendingState, props.item);
    },
  });

  return (
    <div className="c-candidature" data-testid="CandidatureSpontanee">
      <div className="c-detail-description-me col-12 col-md-5">
        <div className="c-detail-pelink my-3">
          <Button
            onClick={toggle}
            className={`btn btn-dark ml-1 gtmFormulaireCandidature gtm${capitalizeFirstLetter(kind)}`}
            aria-label="jenvoie-une-candidature-spontanee"
          >
            J'envoie une candidature{with_str(kind).amongst(["lbb", "lba"]) ? " spontanée" : ""}
          </Button>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={"c-candidature-modal"}>
        <form onSubmit={formik.handleSubmit} className="c-candidature-form">
          <ModalHeader toggle={toggle} className={"c-candidature-modal-header"}></ModalHeader>

          {with_str(sendingState).amongst(["not_sent", "currently_sending"]) ? (
            <CandidatureSpontaneeNominalBodyFooter
              formik={formik}
              sendingState={sendingState}
              company={props?.item?.company?.name}
              item={props?.item}
              kind={kind}
            />
          ) : (
            <></>
          )}

          {with_str(sendingState).amongst(["ok_sent"]) ? (
            <CandidatureSpontaneeWorked kind={kind} email={formik.values.email} company={props?.item?.company?.name} />
          ) : (
            <></>
          )}

          {with_str(sendingState).amongst(["not_sent_because_of_errors"]) ? <CandidatureSpontaneeFailed /> : <></>}
        </form>
      </Modal>
    </div>
  );
};

export default CandidatureSpontanee;
