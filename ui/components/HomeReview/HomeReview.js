import React from "react";

import homereview from "public/images/homereview.svg";


const HomeReview = (props) => {
  return (
    <>
      <section className="c-home-review container mb-0 mb-sm-5 p-4">
        <div className="row">
          <div className="col-12 col-lg-4">
            <div className="d-flex-center h-100">
              <img src={homereview} className="card-img-top c-home-review__img" alt="Une dame dit bonjour" />
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <p className="pt-5 pt-md-2">
              <strong>Donnez votre avis</strong>
            </p>
            <h2 className="c-home-review-title">Améliorons ensemble La Bonne Alternance</h2>
            <p className="m-0">
              La Bonne Alternance est un service jeune et en construction. Pour le faire évoluer, nous consultons régulièrement les utilisateurs actuels ainsi que les futurs utilisateurs du service. Nous prenons en compte vos cas d'usage, les freins que vous rencontrez, et vos besoins.
            </p>
            <p className="pt-2">
              <strong>Nous organisons régulièrement des échanges , des tests utilisateurs ou des démos des nouvelles fonctionnalités. Si cela vous intéresse, renseignez vos coordonnées dans le formulaire sur le lien ci-dessous. </strong>
            </p>
            <a
              className="btn btn-outline-primary px-1 px-sm-5 mt-3"
              rel="noopener noreferrer"
              href="https://mission-apprentissage.gitbook.io/general/"
              target="_blank"
            >
              <span className="d-inline px-3 px-sm-0">Je participe !</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeReview;
