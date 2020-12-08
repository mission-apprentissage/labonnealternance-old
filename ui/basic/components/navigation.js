import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Link from "next/link";
import Router from "next/router";
import { push, replace, goBack, goForward, prefetch } from "connected-next-router";
import { useDispatch } from "react-redux";

import styles from "./navigation.module.scss";

/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/examples/basic/components/navigation.js
*/
const Navigation = (props) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="c-navigation">
      <Navbar expand="md" className="navbar-light">
        <div className="container">
          <NavbarBrand href="/">
            <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-navbar-brand-img" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="c-navbar-links ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Accès recruteur</NavLink>
              </NavItem>
              <NavItem className="ml-md-5">
                <div className="d-flex cursor-pointer">
                  <img src="/images/square_link.svg" alt="Lien organisme de formation" />
                  <NavLink href="#" className="ml-1">
                    Accès organisme de formation
                  </NavLink>
                </div>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Navigation;
