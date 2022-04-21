import { capitalizeFirstLetter } from "../../utils/strutils";
import { getPathLink } from "../../utils/tools";
import { round } from "lodash";

const LocationDetail = ({ item }) => {

  const kind = item?.ideaType;
  const title = kind === "formation" ? "Quelques informations sur le centre de formation" : "Quelques informations sur l'établissement"

  return (
    <>
      <div className="c-detail-body c-locationdetail mt-4">

        <div className="c-locationdetail-title mt-2">
          {title}
        </div>

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

        {item?.contact?.email && !item?.prdvUrl ? (
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


      </div>
    </>
  );
};

export default LocationDetail;
