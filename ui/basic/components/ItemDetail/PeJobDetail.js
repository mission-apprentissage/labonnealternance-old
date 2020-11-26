import React, { useEffect } from "react";
import moment from "moment";
import infoIcon from "../../public/static/icons/info.svg";
import linkIcon from "../../public/static/icons/link.svg";

const PeJobDetail = ({ job }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  return (
    <>
      <div className="itemDetailBody">
        <div className="title">En savoir plus</div>
        <div className="sectionTitle">{job.title}</div>
        <br />
        Publié le {moment(job.job.creationDate).format("DD / MM / YYYY")}
        <br />
        Durée : {job.job.contractDescription}
        <br />
        Rythme : {job.job.duration}
        <br />
        <br />
        <div className="sectionTitle">Description de l'offre</div>
        <div className="description">{job.job.description}</div>
        <br />
        {job.contact ? (
          <>
            <div className="sectionTitle">Postuler</div>
            <div className="description">
              {job.contact.name ? (
                <>
                  {job.contact.name}
                  <br />
                </>
              ) : (
                ""
              )}
              {job.contact.info ? (
                <>
                  {job.contact.info}
                  <br />
                </>
              ) : (
                ""
              )}
              <br />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="sectionTitle">Retrouvez l'offre sur Pôle emploi</div>
        <div className="ellipsisLink">
          <a target="poleemploi" href={job.url} className="gtmLienOffrePE">
            <img className="linkIcon" src={linkIcon} alt="" />
            {job.url}
          </a>
        </div>
        <div className="blueAdvice">
          <div className="floatLeft">
            <img src={infoIcon} alt="" />
          </div>
          <div className="paragraph">
            Optimisez votre recherche en envoyant aussi des candidatures spontanées aux entreprises qui n’ont pas
            diffusé d’offre !
          </div>
        </div>
      </div>
    </>
  );
};

export default PeJobDetail;
