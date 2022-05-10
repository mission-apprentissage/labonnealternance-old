import { capitalizeFirstLetter } from "../../utils/strutils";
import { getPathLink } from "../../utils/tools";
import { round } from "lodash";
import { string_wrapper as with_str } from "../../utils/wrapper_utils";

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


  const getTitle = (oneItem) => {
    const oneKind = oneItem?.ideaType;
    const isMandataire = oneItem?.company?.mandataire
    let res = 'Quelques informations'
    if (oneKind === "formation") {
      res = "Quelques informations sur le centre de formation"
    } else if (oneKind === "matcha" && !isMandataire) {
      res = "Quelques informations sur l'établissement"
    } else if (oneKind === "matcha" && isMandataire) {
      res = "Contactez le CFA pour avoir plus d'informations"
    } else if (oneKind === "peJob") {
      res = "Quelques informations sur l'entreprise"
    }
    return res
  }
  
  const shouldDisplayEmail = (oneItem) => {
    let res = false
    const oneKind = oneItem?.ideaType;
    if (oneKind === "matcha") {
      res = !!item?.company?.mandataire
    } else if (oneKind === "lbb" || oneKind === "lba") {
      res = false
    } else if (oneKind === "peJob") {
      res = false
    } else {
      res = !!item?.contact?.email && !item?.prdvUrl
    }
    if (res) {
      // au cas où : on n'affiche l'email que si il n'est pas chiffré
      res = with_str('@').in(item?.contact?.email)
    }
    return res
  }

  return (
    <>
      <div className="c-detail-body c-locationdetail mt-4">

        <h2 className="c-locationdetail-title mt-2">
          {getTitle(item)}
        </h2>

        <div className="c-locationdetail-address mt-3">
          {item?.place?.fullAddress}
        </div>

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
            <a
              href={getPathLink(item)}
              target="_blank"
              className={`c-detail-googledir-link gtm${capitalizeFirstLetter(kind)} gtmPathLink`}
              rel="noopener noreferrer"
            >
              <span>
                Obtenir l'itinéraire <img className="mt-n1" src="/images/square_link.svg" alt="lien" />
              </span>
            </a>
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
                  <a
                    href={item.company.url}
                    target="_blank"
                    className="c-detail-training-link gtmTrainingLink"
                    rel="noopener noreferrer"
                  >
                    {item.company.url}
                  </a>
              </span>
            </div>
          </>
        ) : (
          ""
        )}

        {shouldDisplayEmail(item) ?  (
          <div className="c-locationdetail-line mt-1">
            <span className="c-locationdetail-imgcontainer">
              <img className="" src="/images/icons/small_email.svg" alt="email" />
            </span>
            <span className="c-detail-sizetext">
              {item.contact.email}
            </span>
          </div>
        ) : (
          ""
        )}

        {item?.contact?.phone ? (
          <div className="c-locationdetail-line mt-1">
            <span className="c-locationdetail-imgcontainer">
              <img className="" src="/images/icons/small_phone.svg" alt="téléphone" />
            </span>
            <span className="c-detail-sizetext">
              {item.contact.phone}
            </span>
          </div>
        ) : (
          ""
        )}

        {
          kind === 'matcha' || kind === 'lbb' || kind === 'lba' ? 
          <>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer">
                <img className="" src="/images/info.svg" alt="info" />
              </span>
              <span className="c-detail-sizetext mb-0">
                En savoir plus sur&nbsp;
                <a
                  href={`https://www.google.fr/search?q=${getGoogleSearchParameters()}`}
                  target="_blank"
                  className="c-detail-google-search gtmGoogleLink"
                  rel="noopener noreferrer"
                >
                    {item.company.name} <img className="mt-n1" src="/images/square_link.svg" alt="lien" />
                </a>
              </span>
            </div>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer">
              </span>
                <span className="c-detail-sizetext c-locationdetail-hint mb-0">
                  Renseignez-vous sur l'établissement pour préparer votre candidature
              </span>
            </div>
            <div className="c-locationdetail-line mt-1">
              <span className="c-locationdetail-imgcontainer">
              </span>
                <span className="c-detail-sizetext">
                  <strong>Taille de l'entreprise :&nbsp;</strong> {companySize}
              </span>
            </div>
          </>
          :
          <></>
        }

      </div>
    </>
  );
};

export default LocationDetail;
