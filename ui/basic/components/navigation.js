import React, { useState } from 'react';
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
  NavbarText
} from 'reactstrap';

import Link from 'next/link'
import Router from 'next/router'
import { push, replace, goBack, goForward, prefetch } from 'connected-next-router'
import { useDispatch } from 'react-redux'

import styles from "./navigation.module.scss";


/*
 Different kind of navigation are available here :
 https://raw.githubusercontent.com/danielr18/connected-next-router/master/Navigations/basic/components/navigation.js
*/
const Navigation = (props) => {
  const dispatch = useDispatch()
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className={styles.root}>
        <NavbarBrand href="/">
          <img src='/images/logo_lba.svg' alt="Logo LBA" className={styles['c-navbar-brand']}/>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;

// import React from 'react'
// import Link from 'next/link'
// import Router from 'next/router'
// import { push, replace, goBack, goForward, prefetch } from 'connected-next-router'
// import { useDispatch } from 'react-redux'


// const Navigation = props => {
//   const dispatch = useDispatch()
//   return (
//     <div>
//       <h2>Navigation</h2>
//       <ul>
//         <li>
//           <a href="recherche-apprentissage" onClick={e => {e.preventDefault();Router.push('/recherche-apprentissage');}}>
//             /recherche-apprentissage
//           </a>
//         </li>
//         <li>
//           <a href="recherche-apprentissage-formation" onClick={e => {e.preventDefault();Router.push('/recherche-apprentissage-formation');}}>
//             /recherche-apprentissage-formation
//           </a>
//         </li>
//         <li>
//           <Link href={{ pathname: '/styleguide' }}>
//             <a>/styleguide</a>
//           </Link>
//         </li>
//       </ul>
//     </div>
//                           )
// }

// export default Navigation
