import { get } from "lodash";

export default function getSurtitre ({ selectedItem, kind }) {
  let res = "";

  if (kind === "matcha") {
    res = (
      <p className={`c-detail-activity c-detail-title--entreprise mt-2`}>
        <span className="c-detail-activity__proposal">Le centre de formation&nbsp;</span>
        <span>{`${get(selectedItem, "company.name", "")}`}</span>
        <span className="c-detail-activity__proposal">
          &nbsp;propose actuellement cette offre dans le domaine suivant
        </span>
      </p>
    );
  }

  if (kind === "peJob") {
    res = (
      <p className={`c-detail-activity c-detail-title--entreprise mt-2`}>
        <span>{`${get(selectedItem, "company.name", "Une société ayant souhaité garder l'anonymat")}`}</span>
        <span className="c-detail-activity__proposal">&nbsp;propose actuellement cette offre</span>
      </p>
    );
  }

  if (kind === "lbb" || kind === "lba") {
    res = (
      <p className={`c-detail-activity c-detail-title--entreprise mt-2`}>
        <span>{`${get(selectedItem, "company.name", "")}`}</span>
        <span className="c-detail-activity__proposal">
          &nbsp;a des salariés qui exercent le métier auquel vous vous destinez. Envoyez votre candidature spontanée !
        </span>
      </p>
    );
  }

  if (kind === "formation") {
    res = (
      <p className={`c-detail-activity c-detail-title--formation`}>
        <span>{`${get(selectedItem, "company.name", "")} (${selectedItem.company.place.city})`}</span>
        <span className="c-detail-activity__proposal">&nbsp;propose cette formation</span>
      </p>
    );
  }

  return res;
};
