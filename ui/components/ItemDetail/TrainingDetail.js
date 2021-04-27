import React, { useEffect } from "react";
import gotoIcon from "../../public/images/icons/goto.svg";
import contactIcon from "../../public/images/icons/contact_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTrainings, setSelectedItem } from "store/actions";
import fetchTrainingDetails from "services/fetchTrainingDetails";

const TrainingDetail = ({ training, seeInfo, setSeeInfo }) => {
  const dispatch = useDispatch();

  const { trainings, selectedItem } = useSelector((state) => state.trainings);

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

  useEffect(() => {
    if (training && !training.lbfLoaded) {
      loadDataFromLbf();
    }
  });

  const loadDataFromLbf = () => {
    console.log("loadDataFromLbf ", training.idRco);

    let udpdatedTrainings = trainings;
    let shouldDispatch = false;
    udpdatedTrainings.forEach(async (v) => {
      //Test if projectname  == parameter1. If it is update status
      if (v.idRco === training.idRco && !v.lbfLoaded) {
        v.lbfLoaded = true;
        shouldDispatch = true;
        let trainingDetail = await fetchTrainingDetails(training);

        console.log("trainingDetail : ", trainingDetail);
        updateTrainingFromLbf(v, trainingDetail);
        console.log("v : ", v);
        dispatch(setSelectedItem(v));
      }
    });
    if (shouldDispatch) {
      dispatch(setTrainings(udpdatedTrainings));
    }
  };

  const buildPrdvButton = () => {
    return (
      <div
        className="widget-prdv gtmPrdv"
        data-siret={training.company.siret}
        data-cfd={training.cfd}
        data-referrer="lba"
        data-code-postal={training.place.zipCode}
      />
    );
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
      {training.description ? (
        <div className="c-detail-description">
          <h3 className="c-detail-description-title">Description</h3>
          <div className="c-detail-training">{training.description}</div>
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

const updateTrainingFromLbf = (training, detailsFromLbf) => {
  if (training && detailsFromLbf) {
    training.objectif = detailsFromLbf.objectif;
    training.description = detailsFromLbf.description;
  }
};

export default TrainingDetail;
