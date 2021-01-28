import React, { useEffect } from "react";
import moment from "moment";
import infoIcon from "../../public/images/icons/info.svg";
import linkIcon from "../../public/images/icons/link.svg";
import { get, defaultTo } from "lodash";
import ReactHtmlParser from 'react-html-parser'; 


const PeJobDetail = ({ job }) => {
  useEffect(() => {
    try {
      document.getElementsByClassName("rightCol")[0].scrollTo(0, 0);
    } catch (err) {}
  });

  console.log('the job is..')
  console.log(job)

  const description = get(job, 'job.description', undefined)
  console.log(description)
  const contractDuration = get(job, 'job.contractDescription', undefined)
  const contractRythm = get(job, 'job.duration', undefined)
  const creationDate = job?.job?.creationDate ? moment(job.job.creationDate).format("DD / MM / YYYY") : undefined 

  return (
    <>
      <div className="c-detail-body">
        <div className="c-detail-company">
          {get(job, 'company.nsame', ReactHtmlParser('<em>Entreprise non précisée</em>'))} <span className="c-detail-proposal"> propose actuellement cette offre</span>
        </div>
        <h2 className="c-detail-jobtitle">
          {get(job, 'title', ReactHtmlParser('<em>Titre non précisé</em>'))}
        </h2>        
        <div className="c-detail-meta">
          <div className="c-detail-metadate">
            Publiée le  : {defaultTo(creationDate, ReactHtmlParser('<em>Donnée manquante</em>'))}
          </div>                  
          <div className="c-detail-metaduration">
            Durée  : {defaultTo(contractDuration, ReactHtmlParser('<em>Donnée manquante</em>'))}
          </div>                  
          <div className="c-detail-metarythm">
            Rythme  : {defaultTo(contractRythm, ReactHtmlParser('<em>Donnée manquante</em>'))}
          </div>                  
        </div>        

        {description ? (
          <div className="c-detail-description">
            <h3 className="c-detail-description-title">
              Description de l'offre
            </h3>            
            <p>
              {description}
            </p>
          </div>
        ) : (
          ""
        )}
    
      </div>
    </>
  );
};

export default PeJobDetail;
