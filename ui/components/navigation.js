import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

//import { push } from "connected-next-router";
//import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/examples/basic/components/navigation.js
*/
const Navigation = (props) => {
  //const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let main_class_name = "c-navigation ";
  main_class_name += props.bgcolor ?? "is-filled";

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
              <NavItem>
                <a
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    //dispatch(push({ pathname: "/acces-recruteur" }));
                    router.push("/acces-recruteur");
                  }}
                  href="/acces-recruteur"
                >
                  <span className="ml-1">Recruteur</span>
                </a>
              </NavItem>
              <NavItem className="ml-lg-5">
                <NavLink href="/organisme-de-formation" className="ml-1">
                  Organisme de formation
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Navigation;
