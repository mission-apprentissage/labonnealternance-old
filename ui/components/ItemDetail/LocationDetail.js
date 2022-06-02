import React from "react";
import { capitalizeFirstLetter } from "../../utils/strutils";
import { getPathLink } from "../../utils/tools";
import { round } from "lodash";
import { string_wrapper as with_str } from "../../utils/wrapper_utils";
import ExternalLink from "../externalLink";
import { endsWithNumber } from "../../utils/strutils";

const LocationDetail = ({ item }) => {
  const kind = item?.ideaType;

  const getGoogleSearchParameters = () => {
    return encodeURIComponent(`${item.company.name} ${item.place.address}`);
  };

  let companySize = item?.company?.size?.toLowerCase();
  if (!companySize) {
    companySize = "non renseigné";
  } else if (companySize.startsWith("0")) {
    companySize = "petite entreprise";
  }
  if (endsWithNumber(companySize)) {
    companySize += " salariés";
  }

  const getTitle = (oneItem) => {
    const oneKind = oneItem?.ideaType;
    const isMandataire = item?.company?.mandataire;
    let res = "Quelques informations sur l'entreprise";
    if (oneKind === "formation") {
      res = "Quelques informations sur le centre de formation";
    } else if (oneKind === "matcha" && !isMandataire) {
      res = "Quelques informations sur l'établissement";
    } else if (oneKind === "matcha" && isMandataire) {
      res = "Contactez le CFA pour avoir plus d'informations";
    }
    return res;
  };

  const shouldDisplayEmail = (oneItem) => {
    let res = false;
    const oneKind = oneItem?.ideaType;
    if (oneKind === "matcha") {
      res = !!item?.company?.mandataire;
    } else if (oneKind === "lbb" || oneKind === "lba") {
      res = false;
    } else if (oneKind === "peJob") {
      res = false;
    } else {
      res = !!item?.contact?.email && !item?.prdvUrl;
    }
    if (res) {
      // au cas où : on n'affiche l'email que si il n'est pas chiffré
      res = with_str("@").in(item?.contact?.email);
    }
    return res;
  };

  return (
    <>
      <div className="c-detail-body c-locationdetail mt-4">
        <h2 className="c-locationdetail-title mt-2">{getTitle(item)}</h2>

        {item?.company?.mandataire ? (
          <div className="c-locationdetail-address mt-4">
            Le centre de formation peut vous renseigner sur cette offre d’emploi ainsi que les formations qu’il propose.
          </div>
        ) : (
          ""
        )}

        <div className="c-locationdetail-address mt-4">{item?.place?.fullAddress}</div>

        {item?.place?.distance ? (
          <div className="c-locationdetail-distance">
            {`${round(item.place.distance, 1)} km(s) du lieu de recherche`}
          </div>
        ) : (
          ""
        )}

        <div className="c-locationdetail-line mt-3">
          <span className="c-locationdetail-imgcontainer">
            <img className="" src="/images/icons/small_map_point.svg" alt="point de localisation" />
          </span>
          <span className="c-detail-sizetext">
            <ExternalLink
              className={`c-detail-googledir-link gtm${capitalizeFirstLetter(kind)} gtmPathLink`}
              url={getPathLink(item)}
              title="Obtenir l'itinéraire"
              withPic={<img className="mt-n1" src="/images/square_link.svg" alt="" />}
            />
          </span>
        </div>

        {item?.company?.url ? (
          <>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer">
                <img className="" src="/images/icons/small_info.svg" alt="point info" />
              </span>
              <span className="c-detail-sizetext">
                <span className="">En savoir plus sur &nbsp;</span>
                <ExternalLink
                  className="c-detail-training-link gtmTrainingLink"
                  url={item.company.url}
                  title={item.company.url}
                />
              </span>
            </div>
          </>
        ) : (
          ""
        )}

        {shouldDisplayEmail(item) ? (
          <div className="c-locationdetail-line mt-1">
            <span className="c-locationdetail-imgcontainer">
              <img className="" src="/images/icons/small_email.svg" alt="email" />
            </span>
            <span className="c-detail-sizetext">{item.contact.email}</span>
          </div>
        ) : (
          ""
        )}

        {item?.contact?.phone ? (
          <div className="c-locationdetail-line mt-1">
            <span className="c-locationdetail-imgcontainer c-locationdetail-imgcontainer--smallphone">
              <img className="" src="/images/icons/small_phone.svg" alt="téléphone" />
            </span>
            <span className="c-detail-sizetext">{item.contact.phone}</span>
          </div>
        ) : (
          ""
        )}

        {kind === "matcha" || kind === "lbb" || kind === "lba" ? (
          <>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer">
                <img className="" src="/images/info.svg" alt="info" />
              </span>
              <span className="c-detail-sizetext mb-0">
                En savoir plus sur&nbsp;
                <ExternalLink
                  className="c-detail-google-search gtmGoogleLink"
                  url={`https://www.google.fr/search?q=${getGoogleSearchParameters()}`}
                  title={item.company.name}
                  withPic={<img className="mt-n1" src="/images/square_link.svg" alt="lien" />}
                />
              </span>
            </div>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer"></span>
              <span className="c-detail-sizetext c-locationdetail-hint mb-0">
                Renseignez-vous sur l'établissement pour préparer votre candidature
              </span>
            </div>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer"></span>
              <span className="c-detail-sizetext">
                <strong>Taille de l'entreprise :&nbsp;</strong> {companySize}
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default LocationDetail;
