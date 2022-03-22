import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import postFeedback from "./services/postFeedback";
import postIntention from "./services/postIntention";
import submitCommentaire from "./services/submitCommentaire.js";
import SatisfactionFormSuccess from "./SatisfactionFormSuccess.js";
import SatisfactionFormNavigation from "./SatisfactionFormNavigation.js";

import { getValueFromPath } from "../../utils/tools";
import { amongst } from "../../utils/arrayutils";
import { testingParameters } from "../../utils/testingParameters";

let iv = null;
let id = null;
let avis = null;
let intention = null;

const SatisfactionForm = ({ formType }) => {
  const initParametersFromPath = () => {
    iv = getValueFromPath("iv");
    id = getValueFromPath("id");
    avis = getValueFromPath("avis");
    intention = getValueFromPath("intention");
    if (formType === "avis") {
      setAvisState(avis);
    }
  };

  const getFeedbackText = () => {
    let localIntention = getValueFromPath("intention")
    let firstName = getValueFromPath("fn")
    let lastName = getValueFromPath("ln")
    let text = (
      <div className="mb-4">
        <p className="pt-4">Merci beaucoup pour votre réponse.</p>
        {localIntention === 'entretien' ?
          <div>
            <strong>Vous avez indiqué accepter la candidature de {`${firstName} ${lastName}`}.</strong>
            <p className="pt-4 pb-0 mb-0">
              Souhaitez-vous envoyer un message ou commentaire au candidat pour lui proposer une date de rencontre / d'entretien ?
            </p>
            <p>
              <small className="satisfaction-smallhint">Le candidat recevra votre commentaire ainsi que vos coordonnées directement sur sa boîte mail.</small>
            </p>
          </div>
          :
          ''
        }
        {localIntention === 'ne_sais_pas' ?
          <div>
            <strong>Vous avez indiqué temporiser la candidature de {`${firstName} ${lastName}`}.</strong>
            <p className="pt-4 pb-0 mb-0">
              Précisez au candidat votre intérêt pour sa candidature, en lui envoyant un message personnalisé.
            </p>
            <p>
              <small className="satisfaction-smallhint">Le candidat recevra votre commentaire ainsi que vos coordonnées directement sur sa boîte mail.</small>
            </p>
          </div>
          :
          ''
        }
      </div>
    );

    if (formType === "avis") {
      if (avisState === "utile") {
        text = (
          <>
            <p className="pt-5">
              Merci beaucoup d'avoir pris le temps de nous faire un retour et d'avoir trouvé le service satisfaisant.
            </p>
            <p className="pt-2">
              Aidez-nous à le rendre encore meilleur en nous faisant part de vos suggestions d'amélioration !
            </p>
          </>
        );
      } else if (avisState === "neutre") {
        text = (
          <>
            <p className="pt-5">Nous sommes désolés que le service ne vous apporte pas entière satisfaction.</p>
            <p className="pt-2">Selon vous, comment pourrions-nous améliorer le service La Bonne Alternance ?</p>
          </>
        );
      } else if (avisState === "pasUtile") {
        text = (
          <>
            <p className="pt-5">
              Nous sommes désolés que le service La Bonne Alternance ne vous apporte pas satisfaction.
            </p>
            <p className="pt-2">Aidez-nous à l'améliorer en nous partageant vos attentes.</p>
          </>
        );
      }
    }

    return text;
  };

  const saveAnswer = () => {
    if (iv && id) {
      if (formType === "avis" && amongst(avis, ["utile", "pasUtile", "neutre"])) {
        postFeedback({ iv, id, avis });
      } else if (formType === "intention" && amongst(intention, ["refus", "ne_sais_pas", "entretien"])) {
        // postIntention({ iv, id, intention });
      } //else invalid params 2
    } //else invalid params
  };

  useEffect(() => {
    // enregistrement en state des params provenant du path
    initParametersFromPath();
    // requête post avis pour enregistrement en base si et seulement si params corrects
    saveAnswer();
  }, []);

  const [sendingState, setSendingState] = useState("not_sent");
  const [avisState, setAvisState] = useState("");

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: Yup.object({
      comment: Yup.string().nullable().required("Veuillez remplir le commentaire"),
      email: Yup.string().email("⚠ Adresse e-mail invalide.").required("⚠ L'adresse e-mail est obligatoire."),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "⚠ Le numéro de téléphone doit avoir exactement 10 chiffres")
        .required("⚠ Le téléphone est obligatoire"),
    }),
    onSubmit: async (formikValues) => {
      await submitCommentaire(
        {
          comment: formikValues.comment,
          phone: formikValues.phone,
          email: formikValues.email,
          id,
          intention,
          iv,
          formType,
        },
        setSendingState
      );
    },
  });

  const getFieldError = () => {
    let errorMsg = "";
    if (formik.touched.comment && formik.errors.comment) {
      errorMsg = <div className="c-candidature-erreur mb-2 visible">{formik.errors.comment}</div>;
    } else if (sendingState === "not_sent_because_of_errors") {
      errorMsg = (
        <div className="c-candidature-erreur mb-2 visible">
          Une erreur technique empêche l'enregistrement de votre avis. Merci de réessayer ultérieurement;
        </div>
      );
    } else {
      errorMsg = <div className="c-candidature-erreur invisible">{"pas d'erreur"}</div>;
    }
    return errorMsg;
  };

  return (
    <div className="c-formulaire-satisfaction">
      <SatisfactionFormNavigation />
      {sendingState !== "ok_sent" ? (
        <div className="container flex-center">
          <div className="row flex-center py-5">
            <div className="col col-lg-7 mx-auto">
              {getFeedbackText()}
              <form onSubmit={formik.handleSubmit} className="">
                <fieldset
                  data-testid="fieldset-message"
                  className={`pt-2 c-candidature-field ${
                    formik.touched.comment ? `is-valid-${!formik.errors.comment}` : "is-not-validated"
                  }`}
                > 
                  <textarea
                    id="comment"
                    data-testid="comment"
                    name="comment"
                    placeholder={`${getValueFromPath("intention") === 'entretien' ? "Nous acceptons votre candidature parce que..." : getValueFromPath("intention") === 'ne_sais_pas' ? "Bonjour, Merci pour l'intérêt que vous portez à notre établissement. Votre candidature a retenu toute notre attention mais nous ne sommes actuellement pas ..." : "Bonjour, Merci pour l'intérêt que vous portez à notre établissement. Nous ne sommes malheureusement pas en mesure de donner une suite favorable à votre candidature car ..." }`}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                  />
                </fieldset>
                {getFieldError()}

                <div className="c-candidature-personaldata d-flex flex-column flex-md-row justify-content-between">
                  <div>
                    <fieldset
                      data-testid="fieldset-email"
                      className={`mt-1 mt-md-0 mr-0 mr-md-3 c-candidature-field ${formik.touched.email ? `is-valid-${!formik.errors.email}` : "is-not-validated"
                        }`}
                    >
                      <label htmlFor="email">E-mail *</label>
                      <input
                        id="email"
                        className="w-100"
                        data-testid="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email || ""}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="c-candidature-erreur visible">{formik.errors.email}</div>
                      ) : (
                        <div className="c-candidature-erreur invisible">{"pas d'erreur"}</div>
                      )}
                      {testingParameters?.simulatedRecipient ? (
                        <div>Les emails seront envoyés à {testingParameters.simulatedRecipient}</div>
                      ) : (
                        ""
                      )}
                    </fieldset>
                  </div>

                  <div>
                    <fieldset
                      data-testid="fieldset-phone"
                      className={`mt-1 mt-md-0 c-candidature-field ${formik.touched.phone ? `is-valid-${!formik.errors.phone}` : "is-not-validated"
                        }`}
                    >
                      <label htmlFor="email">Téléphone *</label>
                      <input
                        id="phone"
                        className="w-100"
                        data-testid="phone"
                        name="phone"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone || ""}
                      />
                      {formik.touched.phone && formik.errors.phone ? (
                        <div className="c-candidature-erreur visible">{formik.errors.phone}</div>
                      ) : (
                        <div className="invisible">{"pas d'erreur"}</div>
                      )}
                    </fieldset>
                  </div>
                </div>


                <div className="d-flex flex-row-reverse">
                  <button
                    aria-label="jenvoie-mon-commentaire"
                    className={`btn btn-dark btn-dark-action c-satisfaction-submit mt-3`}
                    type="submit"
                  >
                    {"j'envoie mon commentaire !"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <SatisfactionFormSuccess />
      )}
    </div>
  );
};

export default SatisfactionForm;
