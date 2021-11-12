import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

const FormulaireSatisfaction = () => {
  //getValueFromPath

  //

  useEffect(() => {
    // enregistrement en state des params provenant du path
    // requête post avis pour enregistrement en base si et seulement si params corrects
  }, []);

  return (
    <div>
      <NextSeo
        title="Formulaire de satisfaction | La Bonne Alternance | Trouvez votre alternance"
        description="Formulaire de satisfaction."
      />
      <div class="c-navigation is-filled">
        <nav class="navbar-light navbar navbar-expand-lg">
          <div class="container">
            <a href="/" class="navbar-brand">
              <img src="/images/logo_lba.svg" alt="Logo LBA" className="c-navbar-brand-img" width="110" height="76" />
            </a>
            <button aria-label="Toggle navigation" type="button" class="navbar-toggler">
              <span class="navbar-toggler-icon">

              </span>
            </button>
            <div class="collapse navbar-collapse">
              <ul class="c-navbar-links ml-auto navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/acces-recruteur">
                    <span class="ml-1">Recruteur</span>
                  </a>
                </li>
                <li class="ml-lg-5 nav-item">
                  <a href="/" class="ml-1 nav-link">Page d'accueil La Bonne Alternance</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      Logo LBA, lien vers home lba
      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            Texte remerciement
            <br />
            <br />
            Textarea commentaire
            <br />
            <br />
            Bouton enregistrement
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireSatisfaction;
