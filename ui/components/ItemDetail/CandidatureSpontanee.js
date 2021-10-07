import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import postCandidature from "services/postCandidature";
import CandidatureSpontaneeNominalBodyFooter from "./CandidatureSpontaneeNominalBodyFooter";
import CandidatureSpontaneeWorked from "./CandidatureSpontaneeWorked";
import extractCompanyValues from "services/extractCompanyValues";
import { string_wrapper as with_str } from "utils/wrapper_utils";

const CandidatureSpontanee = (props) => {
  const [modal, setModal] = useState(false);
  const [loadingState, setLoadingState] = useState('ok_sent');

  const toggle = () => {
    if (!modal) {
      setLoadingState('ok_sent')
    }
    setModal(!modal);
  }

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      terms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, "⚠ Doit avoir 15 caractères ou moins").required("⚠ Le prénom est requis."),
      lastName: Yup.string().max(20, "⚠ Doit avoir 20 caractères ou moins").required("⚠ Le nom est requis."),
      email: Yup.string().email("⚠ Adresse e-mail invalide.").required("⚠ L'adresse e-mail est requise."),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "⚠ Le numéro de téléphone doit avoir exactement 10 chiffres")
        .required("⚠ Le téléphone est requis"),
      terms: Yup.boolean().required().oneOf([true], "⚠ Accepter les conditions est obligatoire."),
    }),
    onSubmit: async (applicantValues) => {
      
      setLoadingState('currently_sending')
      let success = true

      try {
        await postCandidature(applicantValues, extractCompanyValues(props.item));
      } catch (error) {
        success = false
      }

      if (success) {
        setLoadingState('ok_sent')
      } else {
        setLoadingState('sent_but_errors')
      }
      
    },
  });

  return (
    <div className="c-candidature">
      <div className="c-detail-description-me col-12 col-md-5">
        <div className="c-detail-pelink my-3">
          <Button onClick={toggle} className="btn btn-dark ml-1">
            J'envoie une candidature spontanée
          </Button>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={"c-candidature-modal"}>

        <form onSubmit={formik.handleSubmit} className="c-candidature-form">

          <ModalHeader toggle={toggle} className={"c-candidature-modal-header"}></ModalHeader>

          {with_str(loadingState).amongst(['not_sent', 'currently_sending']) ? (
            <CandidatureSpontaneeNominalBodyFooter formik={formik} loadingState={loadingState} />
            ) : (
            <></>
            )}

          {with_str(loadingState).amongst(['ok_sent']) ? (
            <CandidatureSpontaneeWorked />
            ) : (
            <></>
          )}

        </form>
      </Modal>
    </div>
  );
};

export default CandidatureSpontanee;
