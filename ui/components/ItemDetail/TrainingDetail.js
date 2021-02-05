import React, { useEffect } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { get, defaultTo } from "lodash";
import ReactHtmlParser from "react-html-parser";

const TrainingDetail = ({ training, seeInfo, setSeeInfo }) => {
  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  const kind = training?.ideaType;
  let contactEmail = training?.contact?.email;
  const companySize = training?.company?.size?.toLowerCase();
  let contactInfo = contactEmail ? (
    <span className="c-detail-km c-detail-pelink">
      <a href={`mailto:${contactEmail}`} className="ml-1" target="_blank" rel="noopener noreferrer">
        {contactEmail}
      </a>
    </span>
  ) : null;

  let siret = training?.company?.siret;

  return (
    <>
      <div className="text-left">
        {kind === "formation" ? (
          contactInfo ? (
            <p className="d-flex mt-4">
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
                  className="d-block btn btn-lg btn-dark w-75 font-weight-bold c-regular-darkbtn ml-3 mt-3"
                  onClick={() => setSeeInfo(true)}
                >
                  Voir les informations de contact
                </button>
              )}
            </p>
          ) : (
            ""
          )
        ) : (
          <p className="mb-4">
            <span className="c-detail-sizetitle d-block">Taille de l'entreprise</span>
            <span className="c-detail-sizetext d-block">
              {defaultTo(companySize, ReactHtmlParser("<em>Non renseigné</em>"))}
            </span>
            {siret ? (
              <a
                target="lbb"
                href={`https://labonneboite.pole-emploi.fr/${siret}/details`}
                className="d-block btn btn-outline-primary w-50 mt-3 c-detail-seeinfo"
              >
                Voir les informations de contact
              </a>
            ) : (
              ""
            )}
          </p>
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
      </div>
    </>
  );
};

export default TrainingDetail;
