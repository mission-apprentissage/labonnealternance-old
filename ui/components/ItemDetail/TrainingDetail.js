import React, { useEffect } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";
import contactIcon from "../../public/images/icons/contact_icon.svg";

const TrainingDetail = ({ training, seeInfo, setSeeInfo }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  useEffect(() => {
    if (window && window.initPrdvWidget) {
      const el = document.getElementsByClassName("widget-prdv");

      if (el.length && !el[0].innerHTML) {
        window.initPrdvWidget();
      }
    }
  }, []);

  const buildPrdvButton = () => {
    return <div className="widget-prdv gtmPrdv" data-referrer="lba" data-id-rco-formation={training.idRcoFormation} />;
  };

  const kind = training?.ideaType;
  let contactEmail = training?.contact?.email;
  let contactInfo = contactEmail ? (
    <span className="c-detail-km c-detail-contactlink">
      <a href={`mailto:${contactEmail}`} className="ml-1" target="_blank" rel="noopener noreferrer">
        {contactEmail}
      </a>
    </span>
  ) : null;

  return (
    <>
      <div className="text-left">
        {contactInfo ? (
          <div className="d-flex mb-3">
            {seeInfo ? (
              <>
                <span className="d-block">
                  <img className="cardIcon" src={contactIcon} alt="" />
                </span>
                <span className="ml-2 d-block">
                  <span className="c-detail-address d-block">{contactInfo}</span>
                </span>
              </>
            ) : (
              <button
                className="c-see-info d-block btn btn-lg btn-outline-primary gtmContact gtmFormation"
                onClick={() => setSeeInfo(true)}
              >
                Voir les informations de contact
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />
      <div className="c-detail-training">
        {training.onisepUrl ? (
          <div className="">
            <span>Descriptif du {training.title ? training.title : training.longTitle} sur&nbsp;</span>
            <span className="c-detail-traininglink">
              <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
                <img src={gotoIcon} alt="Lien" />
                &nbsp;le site Onisep
              </a>
            </span>
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="c-detail-prdv mt-3 ml-3 w-75">{buildPrdvButton()}</div>
      </div>
    </>
  );
};

export default TrainingDetail;
