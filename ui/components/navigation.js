import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";
import { useRouter } from "next/router";
import ExternalLink from "./externalLink";

const Navigation = ({ currentPage, bgcolor }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let main_class_name = "c-navigation ";
  main_class_name += bgcolor ?? "is-filled";

  return (
    <div className={main_class_name}>
      <Navbar expand="lg" className="navbar-light">
        <div className="container">
          <NavbarBrand href="/">
            <img
              src="/images/marianne.svg"
              alt="Logo république française"
              width="162"
              height="78"
              className="c-marianne-header"
            />
            <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-navbar-brand-img" width="110" height="76" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="c-navbar-links ml-auto" navbar>
              <NavItem className={`ml-lg-5 mr-2 ${!currentPage ? "selected" : ""}`}>
                <a
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/");
                  }}
                  href="/"
                >
                  <span className="m-1">Candidat</span>
                </a>
              </NavItem>

              <div className="c-navigation__separator"></div>

              <NavItem className={`mr-2 ml-2 ${currentPage === "acces-recruteur" ? "selected" : ""}`}>
                <a
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/acces-recruteur");
                  }}
                  href="/acces-recruteur"
                >
                  <span className="m-1">Recruteur</span>
                </a>
              </NavItem>

              <div className="c-navigation__separator"></div>

              <NavItem className={`ml-2 ${currentPage === "organisme-de-formation" ? "selected" : ""}`}>
                <a
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/organisme-de-formation");
                  }}
                  href="/organisme-de-formation"
                >
                  <span className="m-1">Organisme de formation</span>
                </a>
              </NavItem>

              {currentPage === "acces-recruteur" ? (
                <>
                  <div className="ml-2 c-navigation__separator"></div>
                  <NavItem className="ml-2">
                    <ExternalLink
                      className="nav-link"
                      url="https://matcha.apprentissage.beta.gouv.fr/authentification"
                      title="Connexion"
                    />
                  </NavItem>
                </>
              ) : (
                ""
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Navigation;
