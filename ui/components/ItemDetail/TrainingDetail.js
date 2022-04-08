import React, { useEffect, useState } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTrainingsAndSelectedItem } from "../../store/actions";
import fetchTrainingDetails from "../../services/fetchTrainingDetails";
import fetchPrdv from "../../services/fetchPrdv";
import sendTrainingOpenedEventToCatalogue from "../../services/sendTrainingOpenedEventToCatalogue";
import questionmarkIcon from "public/images/icons/questionmark2.svg";
import clipboardListIcon from "public/images/icons/traning-clipboard-list.svg";
import targetIcon from "public/images/icons/training-target.svg";
import sablierIcon from "public/images/icons/training-sablier.svg";
import { SendTrackEvent } from "../../utils/gtm";
import academicCapIcon from "public/images/icons/training-academic-cap.svg";
import { formatDate } from "../../utils/strutils";
import { Spinner } from "reactstrap";

import GoingToContactQuestion, { getGoingtoId } from "./GoingToContactQuestion";

const TrainingDetail = ({ training, isCfa }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SendTrackEvent({
      event: `Résultats Affichage formation - Consulter fiche formation`,
      itemId: training.cleMinistereEducatif,
    });

    setLoading(true);
  }, [training.id]);

  const { trainings } = useSelector((state) => state.trainings);

  useEffect(() => {
    // S'assurer que l'utilisateur voit bien le haut de la fiche au départ
    document.getElementsByClassName("choiceCol")[0].scrollTo(0, 0);
  }, []); // Utiliser le useEffect une seule fois : https://css-tricks.com/run-useeffect-only-once/

  useEffect(() => {
    if (!training.prdvLoaded) {
      fetchPrdv(training).then((result) => {
        if (result) {
          applyDataFromPrdv(result.error === "indisponible" ? "" : result.form_url);
        }
      });
    }
  }, [training.id]);

  useEffect(() => {
    if (training && !training.lbfLoaded) {
      loadDataFromLbf();
      sendTrainingOpenedEventToCatalogue(training.cleMinistereEducatif);
    } else {
      setLoading(false);
    }
  }, [training.cleMinistereEducatif]);

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

  const applyDataFromPrdv = (url) => {
    let updatedTrainings = trainings;
    updatedTrainings.forEach(async (v) => {
      if (v.id === training.id) {
        if (!v.prdvLoaded) {
          v.prdvLoaded = true;

          try {
            v.prdvUrl = url;
            dispatch(setTrainingsAndSelectedItem(updatedTrainings, v));
          } catch (err) {}
        }
        setLoading(false);
      }
    });
  };

  const kind = training?.ideaType;
  let contactEmail = training?.contact?.email;
  let contactPhone = training?.contact?.phone;
  let companyUrl = training?.company?.url;

  let didask = (
    <p>
      Vous vous posez des questions sur votre orientation ou votre recherche d’emploi ?
      <span className="c-detail-traininglink ml-1">
        <a
          href="https://dinum-beta.didask.com/courses/demonstration/60abc18c075edf000065c987"
          target="_blank"
          rel="noopener noreferrer"
          className="gtmDidaskFormation"
        >
          Préparez votre premier contact avec un CFA !&nbsp;
          <img src={gotoIcon} alt="Lien" />
        </a>
      </span>
    </p>
  );

  let contactInfo = (
    <>
      {!training.prdvUrl && contactEmail ? (
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

      {getLoading()}

      {getTrainingDetails(training.training)}

      {training.onisepUrl ? (
        <div className={"c-detail-advice mt-4 c-detail-advice--training c-detail-advice--training-cfa-" + isCfa}>
          <div className="c-detail-advice__figure">
            <img src={questionmarkIcon} alt="point d'interrogation" />
          </div>
          <div className="c-detail-advice__body">
            {isCfa ? (
              <div className="c-detail-advice-text">
                <p className="c-detail-advice-cfatitle">Cet établissement est un CFA d’entreprise.</p>
                <p>La particularité ? Il s’agit d’une formule complète Emploi + Formation !</p>
                <p>Cette formation vous intéresse ? La marche à suivre diffère selon le CFA d'entreprise concerné :</p>
                <ul>
                  <li>commencez par vous inscrire à la formation pour accéder ensuite au contrat,</li>
                  <li>ou commencez par postuler à une offre d'emploi pour être ensuite inscrit en formation.</li>
                </ul>
                <p>Prenez contact avec cet établissement ou consultez son site web pour en savoir + !</p>

                {didask}
              </div>
            ) : (
              <div className="c-detail-advice-text">
                <p>
                  <span>Descriptif du {training.title ? training.title : training.longTitle} sur&nbsp;</span>
                  <span className="c-detail-traininglink">
                    <a href={training.onisepUrl} target="_blank" rel="noopener noreferrer" className="">
                      le site Onisep&nbsp;
                      <img src={gotoIcon} alt="Lien" />
                    </a>
                  </span>
                </p>

                {didask}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      {training?.prdvUrl ? (
        ""
      ) : (
        <GoingToContactQuestion kind={kind} uniqId={getGoingtoId(kind, training)} key={getGoingtoId(kind, training)} />
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

const getTrainingDetails = (training) => {
  if (!training) return "";

  let res = (
    <>
      {training.description ? (
        <div className="c-detail-description is-first media">
          <img src={clipboardListIcon} alt="dossier" />
          <div className="c-detail-training media-body">
            <h3 className="c-detail-description-title mb-3 mt-0">Description de la formation</h3>
            <span className="dont-break-out">{training.description}</span>
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
            <span className="dont-break-out">{training.objectif}</span>
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
