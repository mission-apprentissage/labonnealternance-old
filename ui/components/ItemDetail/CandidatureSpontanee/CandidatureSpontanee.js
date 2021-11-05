import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import CandidatureSpontaneeNominalBodyFooter from "./CandidatureSpontaneeNominalBodyFooter";
import CandidatureSpontaneeWorked from "./CandidatureSpontaneeWorked";
import CandidatureSpontaneeFailed from "./CandidatureSpontaneeFailed";
import submitCandidature from "./services/submitCandidature";
import toggleCandidature from "./services/toggleCandidature";
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
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fileName: "",
      fileContent: null,
      message: "",
    },
    validationSchema: Yup.object({
      fileName: Yup.string().nullable().required("⚠ La pièce jointe est obligatoire"),
      firstName: Yup.string().max(15, "⚠ Doit avoir 15 caractères ou moins").required("⚠ Le prénom est obligatoire."),
      lastName: Yup.string().max(20, "⚠ Doit avoir 20 caractères ou moins").required("⚠ Le nom est obligatoire."),
      email: Yup.string().email("⚠ Adresse e-mail invalide.").required("⚠ L'adresse e-mail est obligatoire."),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "⚠ Le numéro de téléphone doit avoir exactement 10 chiffres")
        .required("⚠ Le téléphone est obligatoire"),
    }),
    onSubmit: async (applicantValues) => {
      await submitCandidature(applicantValues, setSendingState, props.item);
    },
  });

  return (
    <div className="c-candidature">
      <div className="c-detail-description-me col-12 col-md-5">
        <div className="c-detail-pelink my-3">
          <Button
            onClick={toggle}
            className={`btn btn-dark ml-1 gtmFormulaireCandidature gtm${capitalizeFirstLetter(kind)}`}
            aria-label="jenvoie-une-candidature-spontanee"
          >
            J'envoie une candidature spontanée
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
            <CandidatureSpontaneeWorked email={formik.values.email} company={props?.item?.company?.name} />
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
