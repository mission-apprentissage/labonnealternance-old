import React from "react";
import Link from 'next/link';

import separator from "public/images/breadcrumb_separator.svg";


const Breadcrumb = () => (
  <div className="c-breadcrumb d-none d-sm-block">
    <div className="container d-flex pl-0 pt-5 pb-4">

      <Link href={{ pathname: '/' }}>
        <a>Accueil</a>
      </Link>
      <div className="c-breadcrumb-separator mx-3">
        <img 
          className="c-breadcrumb-separator-img" 
          src={separator} 
          alt="Separateur du fil d'ariane" />
      </div>
      <Link href={{ pathname: '/faq' }}>
        <a>FAQ</a>
      </Link>

    </div>
  </div>
);

export default Breadcrumb;
