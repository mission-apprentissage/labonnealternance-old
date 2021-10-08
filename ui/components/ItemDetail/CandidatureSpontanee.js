import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import postCandidature from "services/postCandidature";
import extractCompanyValues from "services/extractCompanyValues";
import FileDropzone from "components/FileDropzone";
import { setIsFormVisible } from "store/actions";

const CandidatureSpontanee = (props) => {
  const [modal, setModal] = useState(false);

  const [fileData, setFileData] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [showUnacceptedFileMessage, setShowUnacceptedFileMessages] = useState(false);
  const toggle = () => setModal(!modal);

  const onDrop = (files) => {
    console.log("HEY ha ", files);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("HEY ho ", e.target);
      setFileData(e.target.result);
    };

    reader.onloadstart = (e) => {
      console.log("DEBUT");
      setFileLoading(true);
      setShowUnacceptedFileMessages(false);
    };

    reader.onloadend = (e) => {
      console.log("FINI");
      setTimeout(() => {
        setFileLoading(false);
      }, 2500);
    };

    if (files.length) {
      console.log(files[0].name);
      reader.readAsDataURL(files[0]);
    } else {
      setShowUnacceptedFileMessages(true);
      setFileData(null);
    }
  };

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
      await postCandidature(applicantValues, extractCompanyValues(props.item));
    },
  });

  return (
    <div className="c-candidature">
      <div className="c-detail-description-me col-12 col-md-5">
        <div className="c-detail-pelink my-3">
          <Button onClick={toggle} className="btn btn-dark ml-1">
            J’envoie une candidature spontanée
          </Button>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} className={"c-candidature-modal"}>
        <form onSubmit={formik.handleSubmit} className="c-candidature-form">
          <ModalHeader toggle={toggle} className={"c-candidature-modal-header"}></ModalHeader>
          <ModalBody>
            <h1 className="c-candidature-title">Candidature spontanée</h1>

            <div className="c-candidature-personaldata d-flex flex-column flex-md-row mt-4">
              <div
                className={`mr-0 mr-md-3 c-candidature-field ${
                  formik.touched.lastName ? `is-valid-${!formik.errors.lastName}` : "is-not-validated"
                }`}
              >
                <label htmlFor="lastName">Nom *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="c-candidature-erreur visible">{formik.errors.lastName}</div>
                ) : (
                  <div className="invisible">{"pas d'erreur"}</div>
                )}
              </div>

              <div
                className={`mt-1 mt-md-0 c-candidature-field ${
                  formik.touched.firstName ? `is-valid-${!formik.errors.firstName}` : "is-not-validated"
                }`}
              >
                <label htmlFor="firstName">Prénom *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="c-candidature-erreur visible">{formik.errors.firstName}</div>
                ) : (
                  <div className="invisible">{"pas d'erreur"}</div>
                )}
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row mt-0 mt-md-3">
              <div
                className={`mt-1 mt-md-0 mr-0 mr-md-3 c-candidature-field ${
                  formik.touched.email ? `is-valid-${!formik.errors.email}` : "is-not-validated"
                }`}
              >
                <label htmlFor="email">E-mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="c-candidature-erreur visible">{formik.errors.email}</div>
                ) : (
                  <div className="c-candidature-erreur invisible">{"pas d'erreur"}</div>
                )}
              </div>

              <div
                className={`mt-1 mt-md-0 c-candidature-field ${
                  formik.touched.phone ? `is-valid-${!formik.errors.phone}` : "is-not-validated"
                }`}
              >
                <label htmlFor="email">Téléphone *</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="c-candidature-erreur visible">{formik.errors.phone}</div>
                ) : (
                  <div className="invisible">{"pas d'erreur"}</div>
                )}
              </div>
            </div>

            <div className="c-candidature-message mt-3">
              <h2 className="c-candidature-message-title mb-0">
                Votre message au responsable du recrutement{" "}
                <span className="c-candidature-message-title-optional">(Facultatif)</span>
              </h2>
              <div className="c-candidature-message-subtitle mb-2">
                Indiquez pourquoi vous souhaitez réaliser votre alternance dans son entreprise
              </div>
              <textarea
                id="message"
                name="message"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.message}
              />
            </div>

            <div className="c-candidature-message mt-3">
              {fileLoading ? "Ca charge" : "NOT LOADING"}
              <FileDropzone accept=".pdf,.docx" onDrop={onDrop} maxFiles={1}>

                {showUnacceptedFileMessage?"FIchier pas bon, max 1, taille <3mo, docx ou pdf":""}

                Afficher le fichier actuellement uploadé (nom + icône) avec handle de suppression
                <br />
                Charter le composant
                <br />
                Faire transiter la data vers le serveur
                <br />
                Ajouter la PJ en copie des emails AR et vers recruteur
                <br />
                Animation LOADING + gel bouton pendant l'upload
                <br />

              </FileDropzone>
            </div>

            <fieldset
              className={`c-candidature-terms mt-3 ${
                formik.touched.terms ? `is-valid-${!formik.errors.terms}` : "is-not-validated"
              }`}
            >
              <label htmlFor="terms" className="c-candidature-terms-text">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.terms}
                />
                En remplissant ce formulaire, vous acceptez les Conditions générales d'utilisation du service La Bonne
                Alternance et acceptez le partage de vos informations avec l'entreprise {props?.item.company.name}
              </label>
            </fieldset>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="c-candidature-erreur visible">{formik.errors.terms}</div>
            ) : (
              <div className="invisible">{"pas d'erreur"}</div>
            )}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-dark btn-dark-action c-candidature-submit" type="submit">
              Je postule
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default CandidatureSpontanee;
