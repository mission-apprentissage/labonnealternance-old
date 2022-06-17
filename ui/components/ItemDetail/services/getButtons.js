import ExternalLink from "../../externalLink";
import chevronLeft from "public/images/chevronleft.svg";
import chevronRight from "public/images/chevronright.svg";
import chevronClose from "public/images/close.svg";


export const buttonJePostuleShouldBeDisplayed = (oneKind, oneItem) => {
  return oneKind === "peJob" && oneItem?.url;
};

export const buttonPRDVShouldBeDisplayed = (oneItem) => {
  return oneItem?.prdvUrl;
};

export const buildPrdvButton = (training) => {
  return (
    <div
      className="widget-prdv gtmPrdv"
      data-referrer="lba"
      data-id-cle-ministere-educatif={training.cleMinistereEducatif}
      data-id-rco-formation={training.idRcoFormation}
    >
      <ExternalLink className="gtmPrdv" url={training.prdvUrl} title="Prendre rendez-vous" />
    </div>
  );
};

export const getNavigationButtons = (goPrev, goNext, setSeeInfo, handleClose) => {
  return (
    <>
      <div>
        <button
          className="c-tiny-btn"
          onClick={() => {
            goPrev();
          }}
        >
          <img className="c-tiny-btn__image" src={chevronLeft} alt="Résultat précédent" />
        </button>
      </div>
      <div className="ml-2">
        <button
          className="c-tiny-btn"
          onClick={() => {
            goNext();
          }}
        >
          <img className="c-tiny-btn__image" src={chevronRight} alt="Résultat suivant" />
        </button>
      </div>
      <div className="ml-2">
        <button
          className="c-tiny-btn"
          onClick={() => {
            setSeeInfo(false);
            handleClose();
          }}
        >
          <img className="c-tiny-btn__image" src={chevronClose} alt="Fermer la fenêtre" />
        </button>
      </div>
    </>
  );
};
