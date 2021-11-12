import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { NextSeo } from "next-seo";
import { Collapse, NavbarToggler, Nav, NavItem, NavLink } from "reactstrap";
import { useFormik } from "formik";
import submitCommentaire from "../services/submitCommentaire.js";


const FormulaireSatisfaction = () => {
  //getValueFromPath

  useEffect(() => {
    // enregistrement en state des params provenant du path
    // requête post avis pour enregistrement en base si et seulement si params corrects
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);



  const formik = useFormik({
    initialValues: {message: ""},
    validationSchema: Yup.object({
      message: Yup.string().nullable().required("Veuillez remplir le commentaire"),
    }),
    onSubmit: async (formikValues) => {
      await submitCommentaire(formikValues.message);
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
      <NextSeo
        title="Formulaire de satisfaction | La Bonne Alternance | Trouvez votre alternance"
        description="Formulaire de satisfaction."
      />
      <div className="c-navigation is-filled">
        <nav className="navbar-light navbar navbar-expand-lg">
          <div className="container">
            <a href="/" className="navbar-brand">
              <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-navbar-brand-img" width="110" height="76" />
            </a>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="c-navbar-links ml-auto" navbar>
                <NavItem className="ml-lg-5">
                  <NavLink href="/" className="ml-1 c-formulaire-satisfaction-navlink">
                    Page d'accueil La Bonne Alternance
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </nav>
      </div>
      <div className="container flex-center">
        <div className="row flex-center py-5">
          <div className="col col-lg-7 mx-auto">
            <p className="pt-5">Merci beaucoup pour ce retour positif sur le service <strong>La Bonne Alternance</strong> et d'avoir pris le temps de le faire.</p>
            <p className="pt-3">Avez-vous tout de même des suggestions d'améliorations ?</p>
            <form onSubmit={formik.handleSubmit} className="">
              <fieldset data-testid="fieldset-message" className={`pt-3 c-candidature-field is-not-validated ${
                formik.touched.message ? `is-valid-${!formik.errors.message}` : "is-not-validated"
              }`}>
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
                  aria-label="je-postule"
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
    </div>
  );
};

export default FormulaireSatisfaction;
