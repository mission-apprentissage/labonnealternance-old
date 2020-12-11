import React from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";

const Organisme = (props) => {

  return (
    <div>

      <Navigation bgcolor="is-white"/>
      
      <Breadcrumb forPage="organisme"/>

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>
              <span className="d-block c-page-title is-color-1">Comment</span>
              <span className="d-block c-page-title is-color-1">référencer <span className="c-page-title is-color-2">ma </span></span>
              <span className="d-block c-page-title is-color-2">formation ?</span>
            </h1>
            <hr className="c-page-title-separator" align="left"/>
          </div>
          <div className="col-12 col-md-7">
            <p>
              La Bonne Alternance expose des données provenant du réseau Carif-oref.  
            </p>
            <p>
              Pour référencer votre formation, rendez-vous sur le site du Carif-Oref : 
            </p>
            <p>
              <img className="mt-n1 mr-2" src="/images/square_link.svg" alt="Lien relancer son offre de formation" />
              <a href="https://reseau.intercariforef.org/referencer-son-offre-de-formation" className="c-organisme-link">https://reseau.intercariforef.org/referencer-son-offre-de-formation.</a>
            </p>


          </div>
        </div>
      </div>
      <div className="mb-3">
        &nbsp;
      </div>

      <Footer />

      </div>
      );

}
export default Organisme;
