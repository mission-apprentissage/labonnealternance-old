import React, { useState } from "react";
import { Row, Col, Navbar } from "reactstrap";

import Link from "next/link";
import Router from "next/router";
import { push, replace, goBack, goForward, prefetch } from "connected-next-router";
import { useDispatch } from "react-redux";

import logoFSE from "public/images/logo_fse.svg";
import logoFranceRelance from "public/images/logo_france_relance.png";
import logoPoleEmploi from "public/images/logo_pole_emploi.svg";

/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/examples/basic/components/navigation.js
*/
const Footer = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="c-footer py-5">
      <Navbar expand="lg" className="footer-light">
        <div className="container">
          <Row>
            <Col className="d-none d-md-block" md="3">
              <a href="/">
                <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-footer__brand-img" />
              </a>
              <br />
              <small>Trouvez la formation et l'entreprise pour réaliser votre projet</small>
            </Col>
            <Col xs="12" sm="6" md="3" lg="2" className="ml-md-5">
              <ul className="c-footer-links">
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/a-propos" }));
                    }}
                    href="/a-propos"
                  >
                    A propos
                  </a>
                </li>
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/faq" }));
                    }}
                    href="/faq"
                  >
                    FAQ
                  </a>
                </li>
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/rgpd" }));
                    }}
                    href="/rgpd"
                  >
                    RGPD
                  </a>
                </li>
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/accessibilite" }));
                    }}
                    href="/accessibilite"
                  >
                    Accessibilité
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs="12" sm="6" md="3" lg="2" className="ml-md-5">
              <ul className="c-footer-links">
                <li className="c-footer-links__line">
                  <a className="c-footer-links__link" href="mailto:labonnealternance@pole-emploi.fr">
                    Contact
                  </a>
                </li>
                <li className="c-footer-links__line">
                  <div className="d-flex cursor-pointer">
                    <a
                      className="c-footer-links__link"
                      target="_blank"
                      rel="noopener noreferer"
                      href="https://mission-apprentissage.gitbook.io/la-bonne-alternance/"
                    >
                      Développeurs
                    </a>
                  </div>
                </li>

                <li className="c-footer-links__line">
                  <div className="d-flex cursor-pointer">
                    <a
                      className="c-footer-links__link"
                      target="_blank"
                      rel="noopener noreferer"
                      href="https://labonnealternance.pole-emploi.fr/stats"
                    >
                      Statistiques
                    </a>
                  </div>
                </li>
              </ul>
            </Col>

            <Col xs="12" sm="6" md="6" lg="3" className="ml-sm-5 ml-lg-5 ml-md-0 mt-md-3 mt-lg-0 c-footer-imgs">
              <a href="http://www.fse.gouv.fr" target="_blank" rel="noopener norefer">
                <img className="c-footer--partner-logo ml-md-5 ml-lg-3 mb-lg-2" src={logoFSE} alt="Logo du FSE" />
              </a>
              <a href="https://www.gouvernement.fr/france-relance" target="_blank" rel="noopener norefer">
                <img
                  className="c-footer--partner-logo ml-md-5 ml-lg-3 mb-lg-2"
                  src={logoFranceRelance}
                  alt="Logo France Relance"
                />
              </a>
              <a href="http://www.pole-emploi.fr" target="_blank" rel="noopener norefer">
                <img
                  className="c-footer--partner-logo ml-md-5 ml-lg-3 mb-lg-2"
                  src={logoPoleEmploi}
                  alt="Logo de Pôle emploi"
                />
              </a>
            </Col>
          </Row>
        </div>
      </Navbar>
    </div>
  );
};

export default Footer;
