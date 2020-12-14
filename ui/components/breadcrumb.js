import React from "react";
import Link from "next/link";

import separator from "public/images/breadcrumb_separator.svg";

const Breadcrumb = ({ forPage, label }) => {
  let suffix = forPage ? <Link href={{ pathname: `/${forPage}` }}>{label}</Link> : <div></div>;

  return (
    <div className="c-breadcrumb d-none d-sm-block">
      <div className="container d-flex pl-0 pt-5 pb-4">
        <Link href={{ pathname: "/" }}>Accueil</Link>

        <div className="c-breadcrumb-separator mx-3">
          <img className="c-breadcrumb-separator-img" src={separator} alt="" />
        </div>

        {suffix}
      </div>
    </div>
  );
};

export default Breadcrumb;
