import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import submitCommentaire from "./services/submitCommentaire.js";
import SatisfactionFormSuccess from "./SatisfactionFormSuccess.js";
import SatisfactionFormNavigation from "./SatisfactionFormNavigation.js";

import { getValueFromPath } from "utils/tools";
import { amongst } from "utils/arrayutils";
import postFeedback from "services/postFeedback";

const SatisfactionForm = () => {
  let iv = null;
  let id = null;
  let avis = null;

  const initParametersFromPath = () => {
    //console.log("dddd",getValueFromPath("iv"));

    iv = getValueFromPath("iv");
    id = getValueFromPath("id");
    avis = getValueFromPath("avis");
  };

  const saveFeedback = () => {
    if (iv && id && amongst(avis, ["utile", "pasUtile", "neutre"])) {
      console.log("good : ", iv, id, avis);
      postFeedback({ iv, id, avis });
    } else {
      //else invalid params
      console.log("ca va pas !");
    }
  };

  useEffect(() => {
    // enregistrement en state des params provenant du path
    initParametersFromPath();
    // requête post avis pour enregistrement en base si et seulement si params corrects
    saveFeedback();
  }, []);

  const [sendingState, setSendingState] = useState("not_sent");

  const formik = useFormik({
    initialValues: { message: "" },
    validationSchema: Yup.object({
      message: Yup.string().nullable().required("Veuillez remplir le commentaire"),
    }),
    onSubmit: async (formikValues) => {
      await submitCommentaire(
        {
          message: formikValues.message,
          id,
          iv,
        },
        setSendingState
      );
    },
  });

  const getFieldError = () => {
    let errorMsg = "";
    if (formik.touched.message && formik.errors.message) {
      errorMsg = <div className="c-candidature-erreur visible">{formik.errors.message}</div>;
    } else {
      errorMsg = <div className="c-candidature-erreur invisible">{"pas d'erreur"}</div>;
    }
    return errorMsg;
  };

  return (
    <div className="c-formulaire-satisfaction">
      <SatisfactionFormNavigation />
      {sendingState == "not_sent" ? (
        <div className="container flex-center">
          <div className="row flex-center py-5">
            <div className="col col-lg-7 mx-auto">
              <p className="pt-5">
                Merci beaucoup pour ce retour positif sur le service <strong>La Bonne Alternance</strong> et d'avoir
                pris le temps de le faire.
              </p>
              <p className="pt-2">Avez-vous tout de même des suggestions d'améliorations ?</p>
              <form onSubmit={formik.handleSubmit} className="">
                <fieldset
                  data-testid="fieldset-message"
                  className={`pt-2 c-candidature-field ${
                    formik.touched.message ? `is-valid-${!formik.errors.message}` : "is-not-validated"
                  }`}
                >
                  <textarea
                    id="message"
                    data-testid="message"
                    name="message"
                    placeholder="J’ai une suggestion à propos de ..."
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.message}
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
