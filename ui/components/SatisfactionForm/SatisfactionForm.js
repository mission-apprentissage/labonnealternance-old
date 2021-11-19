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
    let text = (
      <>
        <p className="pt-5">Merci beaucoup pour votre réponse</p>
        <p className="pt-2">
          Aidez-nous à rendre le service meilleur en nous faisant part de vos suggestions d'amélioration !
        </p>
      </>
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
        postIntention({ iv, id, intention });
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
    }),
    onSubmit: async (formikValues) => {
      await submitCommentaire(
        {
          comment: formikValues.comment,
          id,
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
                    placeholder="J’ai une suggestion à propos de ..."
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                  />
                </fieldset>
                {getFieldError()}
                <div className="d-flex flex-row-reverse">
                  <button
                    aria-label="jenvoie-mon-commentaire"
                    className={`btn btn-dark btn-dark-action c-candidature-submit c-candidature-submit--default`}
                    type="submit"
                  >
                    {"J'envoie mon commentaire !"}
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
