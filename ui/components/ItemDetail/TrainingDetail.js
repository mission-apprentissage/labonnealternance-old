import React, { useEffect } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTrainingsAndSelectedItem } from "store/actions";
import fetchTrainingDetails from "services/fetchTrainingDetails";
import questionmarkIcon from "public/images/icons/questionmark2.svg";
import clipboardListIcon from "public/images/icons/traning-clipboard-list.svg";

const TrainingDetail = ({ training, seeInfo, setSeeInfo }) => {
  const dispatch = useDispatch();

  const { trainings } = useSelector((state) => state.trainings);

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  useEffect(() => {
    if (window && window.initPrdvWidget) {
      const el = document.getElementsByClassName("widget-prdv");

      if (el.length) {
        window.initPrdvWidget();
      }
    }
  }, [training.idRcoFormation]);

  useEffect(() => {
    if (training && !training.lbfLoaded) {
      loadDataFromLbf();
    }
  }, [training.idRco]);

  const loadDataFromLbf = () => {
    let updatedTrainings = trainings;

    updatedTrainings.forEach(async (v) => {
      //Test if projectname  == parameter1. If it is update status
      if (v.idRco === training.idRco && !v.lbfLoaded) {
        v.lbfLoaded = true;
        let trainingDetail = await fetchTrainingDetails(training);

        await updateTrainingFromLbf(v, trainingDetail);
        dispatch(setTrainingsAndSelectedItem(updatedTrainings, v));
      }
    });
  };

  const buildPrdvButton = () => {
    return <div className="widget-prdv gtmPrdv" data-referrer="lba" data-id-rco-formation={training.idRcoFormation} />;
  };

  const kind = training?.ideaType;
  let contactEmail = training?.contact?.email;
  let contactPhone = training?.contact?.phone;

  let contactInfo = (
    <>
      {contactEmail ? (
        <p className="c-detail-km c-detail-contactlink">
          <a href={`mailto:${contactEmail}`} className="ml-1">
            {contactEmail}
          </a>
        </p>
      ) : (
        ""
      )}
      {contactPhone ? (
        <p className="c-detail-km c-detail-contactlink">
          <a href={`tel:${contactPhone}`} className="ml-1">
            {contactPhone}
          </a>
        </p>
      ) : (
        ""
      )}
    </>
  );

  return (
    <>
      <div className="text-left">
        {contactPhone || contactEmail ? (
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
                className={`c-see-info d-block btn btn-outline-primary gtmContact gtmFormation`}
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

      <div className="">
        {training.onisepUrl ? (
          <div className="c-detail-advice c-detail-advice--training">
            <div className="c-detail-advice__figure">
              <img src={questionmarkIcon} alt="point d'interrogation" />
            </div>
            <div className="c-detail-advice__body">
              <div className="c-detail-advice-text" >
                  <span>Descriptif du {training.title ? training.title : training.longTitle} sur&nbsp;</span>
                  <span className="c-detail-traininglink">
                    <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
                      <img src={gotoIcon} alt="Lien" />
                      &nbsp;le site Onisep
                    </a>
                  </span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="c-detail-prdv mt-3 ml-3 w-75">{buildPrdvButton()}</div>
      </div>

      {getTrainingDetails(training.training)}

    </>
  );
};

const updateTrainingFromLbf = (training, detailsFromLbf) => {
  if (training && detailsFromLbf) {
    training.training = detailsFromLbf;

    // remplacement des coordonnées de contact catalogue par celles de lbf
    const contactLbf = detailsFromLbf.organisme.contact;

    training.contact = training.contact || {};

    training.contact.phone = contactLbf.tel || training.contact.phone;
    training.contact.email = contactLbf.email || training.contact.email;

    training.company.url = contactLbf.url || training.company.url;
  }
};

const getTrainingDetails = (training) => {
  if (!training) return "";

  let res = (
    <>
      {training.description ? (
        <div className="c-detail-description media">
          <img src={clipboardListIcon} alt="dossier" />
          <div className="c-detail-training media-body">
            <h3 className="c-detail-description-title mb-3 mt-0">Description</h3>
            {training.description}
          </div>
        </div>
      ) : (
        ""
      )}

      {training.objectif ? (
        <div className="c-detail-description">
          <h3 className="c-detail-description-title">Objectif</h3>
          <div className="c-detail-training">{training.objectif}</div>
        </div>
      ) : (
        ""
      )}

      {training["duree-indicative"] ? (
        <div className="c-detail-description">
          <h3 className="c-detail-description-title">Durée indicative</h3>
          <div className="c-detail-training">{training["duree-indicative"]}</div>
        </div>
      ) : (
        ""
      )}

      {training["modalites-alternance"] ? (
        <div className="c-detail-description">
          <h3 className="c-detail-description-title">Modalités alternance</h3>
          <div className="c-detail-training">{training["modalites-alternance"]}</div>
        </div>
      ) : (
        ""
      )}

      {training["modalites-enseignement"] ? (
        <div className="c-detail-description">
          <h3 className="c-detail-description-title">Modalités enseignement</h3>
          <div className="c-detail-training">{training["modalites-enseignement"]}</div>
        </div>
      ) : (
        ""
      )}

      {getTrainingSessions(training)}
    </>
  );
  return res;
};

const getTrainingSessions = (training) => {
  if (training.sessions) {
    return (
      <div className="c-detail-description">
        <h3 className="c-detail-description-title">Sessions</h3>
        <div className="c-detail-training">
          {training.sessions.map((session, idx) => {
            return (
              <div key={`session${idx}`}>
                Début : {session.debut}
                <br />
                Fin : {session.fin}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return "";
  }
};

export default TrainingDetail;
