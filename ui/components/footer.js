import React from "react";
import { Row, Col, Navbar } from "reactstrap";

import { push } from "connected-next-router";
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
            <Col className="col-12 col-md-6">
              <img src="/images/marianne.svg" alt="Logo république française" width="290" height="130" />
            </Col>
            <Col className="col-12 col-md-6">
              <div>
                Texte optionnel 3 lignes maximum.
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur et vel quam auctor semper. Cras si amet mollis dolor.
              </div>
              <div>
                <a>legifrance.gouv.fr</a>
                <a>gouvernement.fr</a>
                <a>service-public.fr</a>
                <a>data.gouv.fr</a>
              </div>
            </Col>
            <Col className="col-12">
              <ul className="c-footer-links">
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/mentions-legales" }));
                    }}
                    href="/mentions-legales"
                  >
                    Mentions légales
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/cgu" }));
                    }}
                    href="/cgu"
                  >
                    CGU
                  </a>
                </li>


                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/cookies" }));
                    }}
                    href="/cookies"
                  >
                    Cookies
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(push({ pathname: "/stats" }));
                    }}
                    href="/stats"
                  >
                    Statistiques
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="col-12">
              Sauf mention contraire, tous les contenus de ce site sont sous licence etalab-2.0
            </Col>
          </Row>
        </div>
      </Navbar>
    </div>
  );
};

export default Footer;
