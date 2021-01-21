import React, { useState } from "react";
import { Row, Col, Navbar } from "reactstrap";

import Link from "next/link";
import Router from "next/router";
import { push, replace, goBack, goForward, prefetch } from "connected-next-router";
import { useDispatch } from "react-redux";

import logoFSE from "public/images/logo_fse.svg";
import logoFranceRelance from "public/images/logo_relance.svg";
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
            <Col className="d-none d-md-block col-md-4 col-lg-3">
              <a href="/">
                <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-footer__brand-img" />
              </a>
              <br />
              <small>Trouvez la formation et l'entreprise pour réaliser votre projet</small>
            </Col>
            <Col className="col-md-4 col-lg-3">
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
            <Col className="col-md-4 col-lg-3">
              <ul className="c-footer-links">
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/contact" }));
                    }}
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/developpeurs" }));
                    }}
                    href="/developpeurs"
                  >
                    Développeurs
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <div className="d-flex cursor-pointer">
                    <a
                      className="c-footer-links__link"
                      target="_blank"
                      rel="noopener noreferer"
                      href="https://datastudio.google.com/u/0/reporting/1v-Sim2qMlFSMn4n9JJWaMk8PIONvM757/page/3CME"
                    >
                      Statistiques
                    </a>
                  </div>
                </li>
              </ul>
            </Col>
            <Col className="text-center col-12 col-lg-3">
              <a href="http://www.fse.gouv.fr" target="_blank" rel="noopener norefer" className="c-footer-logocontainer">
                <img className="c-footer--partner-logo" src={logoFSE} alt="Logo du FSE" />
              </a>
              <a href="https://www.gouvernement.fr/france-relance" target="_blank" rel="noopener norefer" className="c-footer-logocontainer">
                <img
                  className="c-footer--partner-logo"
                  src={logoFranceRelance}
                  width="60px"
                  alt="Logo France Relance"
                />
              </a>
              <a href="http://www.pole-emploi.fr" target="_blank" rel="noopener norefer" className="c-footer-logocontainer">
                <img
                  className="c-footer--partner-logo"
                  src={logoPoleEmploi}
                  alt="Logo de Pôle emploi"
                />
              </a>
            </Col>
            <Col className="col-12 text-center c-footer-credit pt-3">
              <small><a href="https://www.freepik.com/vectors/people">Illustration réalisée par pikisuperstar - www.freepik.com</a></small>
            </Col>
          </Row>
        </div>
      </Navbar>
    </div>
  );
};

export default Footer;
