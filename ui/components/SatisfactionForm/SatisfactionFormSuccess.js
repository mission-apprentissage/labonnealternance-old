import React from "react";


const SatisfactionFormSuccess = () => {

  return (
    <div className="container flex-center pt-5" data-testid="SatisfactionFormSuccess">
      <div className="row flex-center py-5">
        <div className="col col-lg-7 mx-auto">
          <div className="d-flex-center pb-5">
            <img src="/images/tada.svg" alt="Cotillons" className="" width="56" height="56" />
          </div>
          <h1 className="h4 text-center">
            <strong>
              Merci beaucoup d’avoir pris le temps de nous aider à améliorer le service La Bonne Alternance
            </strong>
          </h1>
          <p className="pt-3 halflead text-center">
            Nous prenons connaissance de tous les retours pour faire évoluer le service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionFormSuccess;
