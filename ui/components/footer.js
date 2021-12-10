import React from "react";
import { Row, Col, Navbar, Container } from "reactstrap";

import { push } from "connected-next-router";
import { useDispatch } from "react-redux";


/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/examples/basic/components/navigation.js
*/
const Footer = (props) => {
  const dispatch = useDispatch();

  return (
    <>
    <nav className="c-footer c-footer--one py-4 border-bottom">
        <Container>
          <Row>
            <Col className="col-12 col-md-6">
              <img src="/images/marianne.svg#svgView(viewBox(19 0 162 78))" alt="Logo république française" width="290" height="130" />
            </Col>
            <Col className="col-12 col-md-6">
              <div>
                La bonne alternance. Trouvez votre alternance.
              </div>
              <div className="mt-4">
                La bonne alternance est proposée par les services suivants :
              </div>
              <div className="mt-4 c-footer-official-links">
                <a className="c-footer-official-link">legifrance.gouv.fr</a>
                <a className="c-footer-official-link">gouvernement.fr</a>
                <a className="c-footer-official-link">service-public.fr</a>
                <a className="c-footer-official-link">data.gouv.fr</a>
              </div>
            </Col>
            
          </Row>
        </Container>
    </nav>
    <nav className="c-footer pt-2 pb-5">
        <Container>
          <Row>
            <Col className="col-12">
              <ul className="c-footer-links">
                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link c-footer-smallword pr-3"
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
                    className="c-footer-links__link c-footer-smallword"
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
                    className="c-footer-links__link c-footer-smallword"
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
                    className="c-footer-links__link c-footer-smallword"
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
              <div className="c-footer-smallword c-footer-lastword">
                Sauf mention contraire, tous les contenus de ce site sont sous licence <a href="https://www.etalab.gouv.fr/licence-version-2-0-de-la-licence-ouverte-suite-a-la-consultation-et-presentation-du-decret" target="_blank" rel="noopener noreferrer">etalab-2.0 <img className="ml-1" src="/images/square_link.svg" alt="Lien" /></a>
              </div>
            </Col>
          </Row>
        </Container>
    </nav>
    </>
  );
};

export default Footer;
