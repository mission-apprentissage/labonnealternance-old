import React, { useEffect, useState } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTrainingsAndSelectedItem } from "store/actions";
import fetchTrainingDetails from "services/fetchTrainingDetails";
import sendTrainingOpenedEventToCatalogue from "services/sendTrainingOpenedEventToCatalogue";
import questionmarkIcon from "public/images/icons/questionmark2.svg";
import clipboardListIcon from "public/images/icons/traning-clipboard-list.svg";
import targetIcon from "public/images/icons/training-target.svg";
import sablierIcon from "public/images/icons/training-sablier.svg";
import { SendTrackEvent } from "utils/gtm";
import academicCapIcon from "public/images/icons/training-academic-cap.svg";
import { formatDate } from "utils/strutils";
import { Spinner } from "reactstrap";

const TrainingDetail = ({ training, seeInfo, setSeeInfo, isCfa }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SendTrackEvent({
      event: `Résultats Affichage formation - Consulter fiche formation`,
      itemId: training.idRcoFormation,
    });

    setLoading(true);
  }, [training.id]);

  const { trainings } = useSelector((state) => state.trainings);

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  useEffect(() => {
    if (window && window.initPrdvWidget) {
      const el = document.getElementsByClassName("widget-prdv");

      if (el.length) {
        async function callWidget() {
          const result = await window.initPrdvWidget();
          if (!result[0].error) {
            SendTrackEvent({
              event: "Prise de rendez-vous - Affichage",
              itemId: training.idRcoFormation,
            });
          }
        }
        callWidget();
      }
    }
  }, [training.idRcoFormation]);

  useEffect(() => {
    if (training && !training.lbfLoaded) {
      loadDataFromLbf();
      sendTrainingOpenedEventToCatalogue(training.idRcoFormation);
    } else {
      setLoading(false);
    }
  }, [training.idRco]);

  const loadDataFromLbf = () => {
    let updatedTrainings = trainings;
    updatedTrainings.forEach(async (v) => {
      if (v.id === training.id) {
        if (!v.lbfLoaded) {
          v.lbfLoaded = true;

          try {
            let trainingDetail = await fetchTrainingDetails(training);

            updateTrainingFromLbf(v, trainingDetail);
            dispatch(setTrainingsAndSelectedItem(updatedTrainings, v));
          } catch (err) {}
        }
        setLoading(false);
      }
    });
  };

  const buildPrdvButton = () => {
    return <div className="widget-prdv gtmPrdv" data-referrer="lba" data-id-rco-formation={training.idRcoFormation} />;
  };

  const kind = training?.ideaType;
  let contactEmail = training?.contact?.email;
  let contactPhone = training?.contact?.phone;
  let companyUrl = training?.company?.url;

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

  const getLoading = () => {
    return loading ? (
      <span className="trainingColor">
        <div className="searchLoading">
          Chargement en cours
          <Spinner />
        </div>
      </span>
    ) : (
      ""
    );
  };

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
      {companyUrl ? (
        <p className="mb-3 text-left">
          <span className="c-detail-sizetext d-block">
            <img className="mt-n1" src="/images/square_link.svg" alt="" />
            <span className="ml-2">Voir le site </span>
            <a
              href={companyUrl}
              target="_blank"
              className="c-detail-training-link gtmTrainingLink"
              rel="noopener noreferrer"
            >
              {companyUrl}
            </a>
          </span>
        </p>
      ) : (
        ""
      )}
      <hr className={"c-detail-header-separator c-detail-header-separator--" + kind} />

      <div className="c-detail-prdv mt-3 ml-3 mb-4 w-75">{buildPrdvButton()}</div>

      {getLoading()}

      {getTrainingDetails(training.training)}

      {training.onisepUrl ? (
        <div className={"c-detail-advice mt-4 c-detail-advice--training c-detail-advice--training-cfa-" + isCfa}>
          <div className="c-detail-advice__figure">
            <img src={questionmarkIcon} alt="point d'interrogation" />
          </div>
          <div className="c-detail-advice__body">
            {
              isCfa ? 

              <div className="c-detail-advice-text">
                <p>
                  <span>Descriptif du {training.title ? training.title : training.longTitle} sur&nbsp;</span>
                  <span className="c-detail-traininglink">
                    <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
                      <img src={gotoIcon} alt="Lien" />
                      &nbsp;le site Onisep
                    </a>
                  </span>
                </p> 
                <p>
                  Vous vous posez des questions sur votre orientation ou votre recherche d’emploi ? Préparez votre premier contact avec un CFA
                  <span className="c-detail-traininglink ml-1">
                    <a href="https://dinum-beta.didask.com/courses/demonstration/60abc18c075edf000065c987" target="_blank" rel="noopener noreferrer" className="">
                      <img src={gotoIcon} alt="Lien" />
                      &nbsp;en cliquant ici
                    </a>
                  </span>
                </p>
              </div>


              :  
              <div className="c-detail-advice-text">
                <span>Descriptif du {training.title ? training.title : training.longTitle} sur&nbsp;</span>
                <span className="c-detail-traininglink">
                  <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
                    <img src={gotoIcon} alt="Lien" />
                    &nbsp;le site Onisep
                  </a>
                </span>
              </div>
            }
          </div>
        </div>
      ) : (
        ""
      )}
      <br />
    </>
  );
};

const updateTrainingFromLbf = (training, detailsFromLbf) => {
  if (training && detailsFromLbf && detailsFromLbf.organisme) {
    training.training = detailsFromLbf;

    // remplacement des coordonnées de contact catalogue par celles de lbf
    const contactLbf = detailsFromLbf.organisme.contact;

    training.contact = training.contact || {};

    training.contact.phone = contactLbf.tel || training.contact.phone;
    training.contact.email = contactLbf.email || training.contact.email;

    training.company.url = contactLbf.url || training.company.url;
  }
};

const getTrainingDetails = (training, loading) => {
  if (!training) return "";

  let res = (
    <>
      {training.description ? (
        <div className="c-detail-description is-first media">
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
        <div className="c-detail-description media">
          <img src={targetIcon} alt="cible" />
          <div className="c-detail-training media-body">
            <h3 className="c-detail-description-title mb-3 mt-0">Objectif</h3>
            {training.objectif}
          </div>
        </div>
      ) : (
        ""
      )}

      {training["duree-indicative"] ? (
        <div className="c-detail-description media">
          <img src={sablierIcon} alt="sablier" />
          <div className="c-detail-training media-body">
            <h3 className="c-detail-description-title mb-3 mt-0">Durée</h3>
            {training["duree-indicative"]}
          </div>
        </div>
      ) : (
        ""
      )}

      {training["sessions"] && training["sessions"].length ? (
        <div className="c-detail-description media">
          <img src={academicCapIcon} alt="cape académique" />
          <div className="c-detail-training media-body">
            <h3 className="c-detail-description-title mb-3 mt-0">Modalités alternance</h3>
            Heures en centre de formation :{" "}
            {training["sessions"][0]["nombre-heures-centre"]
              ? `${training["sessions"][0]["nombre-heures-centre"]}h`
              : "non renseigné"}
            <br />
            Heures en entreprise :{" "}
            {training["sessions"][0]["nombre-heures-entreprise"]
              ? `${training["sessions"][0]["nombre-heures-entreprise"]}h`
              : "non renseigné"}
          </div>
        </div>
      ) : (
        ""
      )}

      {getTrainingSessions(training)}
    </>
  );

  //console.log("res : ",res);

  return res;
};

const getTrainingSessions = (training) => {
  if (training.sessions) {
    let sessions = [];
    let today = new Date().getTime();
    training.sessions.forEach((s) => {
      if (new Date(s.debut).getTime() > today) {
        if (sessions.findIndex((v) => s.debut === v.debut && s.fin === v.fin) < 0) {
          sessions.push({ debut: s.debut, fin: s.fin });
        }
      }
    });

    return sessions.length ? (
      <div className="c-detail-description media">
        <img src={clipboardListIcon} alt="dossier" />
        <div className="c-detail-training media-body">
          <h3 className="c-detail-description-title mb-3 mt-0">Sessions</h3>
          {sessions.map((session, idx) => {
            return (
              <div key={`session${idx}`}>
                Début : {formatDate(session.debut)} - Fin : {formatDate(session.fin)}
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      ""
    );
  } else {
    return "";
  }
};

export default TrainingDetail;
