import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { Collapse, NavbarToggler, Nav, NavItem, NavLink } from "reactstrap";

const FormulaireSatisfaction = () => {
  //getValueFromPath

  //

  useEffect(() => {
    // enregistrement en state des params provenant du path
    // requête post avis pour enregistrement en base si et seulement si params corrects
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <NextSeo
        title="Formulaire de satisfaction | La Bonne Alternance | Trouvez votre alternance"
        description="Formulaire de satisfaction."
      />
      <div class="c-navigation is-filled">
        <nav class="navbar-light navbar navbar-expand-lg">
          <div class="container">
            <a href="/" class="navbar-brand">
              <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-navbar-brand-img" width="110" height="76" />
            </a>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="c-navbar-links ml-auto" navbar>
                <NavItem className="ml-lg-5">
                  <NavLink href="/" className="ml-1">
                    Page d'accueil La Bonne Alternance
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </nav>
      </div>
      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            Texte remerciement
            <br />
            <br />
            Textarea commentaire
            <br />
            <br />
            Bouton enregistrement
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireSatisfaction;
