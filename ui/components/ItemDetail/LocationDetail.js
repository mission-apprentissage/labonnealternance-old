import { capitalizeFirstLetter } from "../../utils/strutils";
import { getPathLink } from "../../utils/tools";
import { round } from "lodash";

const LocationDetail = ({ item }) => {

  const kind = item?.ideaType;
  const title = kind === "formation" ? "Quelques informations sur le centre de formation" : "Quelques informations sur l'établissement"

  return (
    <>
      <div className="c-detail-body c-locationdetail mt-4">

        <div className="c-locationdetail-title">
          {title}
        </div>

        <div className="c-locationdetail-address">
          {item?.place?.fullAddress}
        </div>

        {item?.place?.distance ? (
          <div className="c-locationdetail-distance">
            {`${round(item?.place?.distance, 1)} km(s) du lieu de recherche`} 
          </div>
        ) : (
          ""
        )}

        <div className="c-locationdetail-itinerary">
          <span className="d-block mt-2">
            <span>
              <img className="cardIcon mr-2" src="/images/icons/small_map_point.svg" alt="point de localisation" />
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
          </span>
        </div>

        <div className="c-locationdetail-knowmore">
          En savoir plus
        </div>

      </div>
    </>
  );
};

export default LocationDetail;
