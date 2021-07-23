import React from "react";
import Link from "next/link";

import separator from "public/images/breadcrumb_separator.svg";

const Breadcrumb = ({ forPage, label, items = null }) => {
  console.log('forPage', forPage);

  const links = forPage.split('/')
  console.log('links', links);

  let suffix = forPage ? <Link href={{ pathname: `/${forPage}` }}>{label}</Link> : <div></div>;

  if (items) {
    let parsedItems = JSON.parse(items)
  }

  return (
    <div className="c-breadcrumb d-none d-sm-block">
      <div className="container d-flex pl-0 pt-5 pb-4">
        <Link href={{ pathname: "/" }}>Accueil</Link>

        {
          !items ?
          <>
            <div className="c-breadcrumb-separator mx-3">
              <img className="c-breadcrumb-separator-img" src={separator} alt="" />
            </div>
            {suffix}
            </>
            :
            <>
              { 
                
                parsedItems.map((parsedItem, index) => {
                  return <div key={index}>
                    <a href={`/metiers/${parsedItem.path}`}>#</a>
                  </div>
                })
              }
            </>
        }


      </div>
    </div>
  );
};

export default Breadcrumb;
