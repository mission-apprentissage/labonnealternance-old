import React from "react";
import { Row, Col, Container } from "reactstrap";
import ExternalLink from "./externalLink";
import { useRouter } from "next/router";

/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/examples/basic/components/navigation.js
*/
const Footer = (props) => {
  const router = useRouter();

  return (
    <>
      <nav className="c-footer c-footer--one py-4 border-bottom">
        <Container>
          <Row>
            <Col className="col-12 col-md-6">
              <img
                src="/images/marianne.svg#svgView(viewBox(19 0 162 78))"
                alt="Logo république française"
                width="290"
                height="130"
              />
            </Col>
            <Col className="col-12 col-md-6 c-footer-text">
              <div>La bonne alternance. Trouvez votre alternance.</div>
              <div className="mt-4">La bonne alternance est proposée par les services suivants :</div>
              <div className="mt-4 c-footer-official-links">
                <ExternalLink
                  className="c-footer-official-link"
                  url="https://legifrance.gouv.fr"
                  title="legifrance.gouv.fr"
                />
                <ExternalLink
                  className="c-footer-official-link"
                  url="https://gouvernement.fr"
                  title="gouvernement.fr"
                />
                <ExternalLink
                  className="c-footer-official-link"
                  url="https://service-public.fr"
                  title="service-public.fr"
                />
                <ExternalLink className="c-footer-official-link" url="https://data.gouv.fr" title="data.gouv.fr" />
                <ExternalLink className="c-footer-official-link" url="https://pole-emploi.fr" title="pole-emploi.fr" />
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
                      //dispatch(push({ pathname: "/mentions-legales" }));
                      router.push("/mentions-legales");
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
                      //dispatch(push({ pathname: "/cgu" }));
                      router.push("/cgu");
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
                      //dispatch(push({ pathname: "/cookies" }));
                      router.push("/cookies");
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
                      //dispatch(push({ pathname: "/stats" }));
                      router.push("/stats");
                    }}
                    href="/stats"
                  >
                    Statistiques
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link c-footer-smallword"
                    onClick={(e) => {
                      e.preventDefault();
                      //dispatch(push({ pathname: "/faq" }));
                      router.push("/faq");
                    }}
                    href="/faq"
                  >
                    FAQ
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link c-footer-smallword"
                    onClick={(e) => {
                      e.preventDefault();
                      //dispatch(push({ pathname: "/contact" }));
                      router.push("/contact");
                    }}
                    href="/contact"
                  >
                    Contact
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link c-footer-smallword"
                    onClick={(e) => {
                      e.preventDefault();
                      //dispatch(push({ pathname: "/metiers" }));
                      router.push("/metiers");
                    }}
                    href="/metiers"
                  >
                    Métiers
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link c-footer-smallword"
                    onClick={(e) => {
                      e.preventDefault();
                      //dispatch(push({ pathname: "/a-propos" }));
                      router.push("/a-propos");
                    }}
                    href="/a-propos"
                  >
                    A propos
                  </a>
                </li>

                <li className="c-footer-links__line">
                  <a
                    className="c-footer-links__link c-footer-smallword"
                    onClick={(e) => {
                      e.preventDefault();
                      //dispatch(push({ pathname: "/developpeurs" }));
                      router.push("/developpeurs");
                    }}
                    href="/developpeurs"
                  >
                    Développeurs
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="col-12">
              <div className="c-footer-smallword c-footer-lastword">
                Sauf mention contraire, tous les contenus de ce site sont sous licence{" "}
                <ExternalLink
                  url="https://www.etalab.gouv.fr/licence-version-2-0-de-la-licence-ouverte-suite-a-la-consultation-et-presentation-du-decret"
                  title="etalab-2.0"
                  withPic={<img className="ml-1" src="/images/square_link.svg" alt="Lien" />}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </nav>
    </>
  );
};

export default Footer;
