import ExternalLink from "../../externalLink";



export const buttonJePostuleShouldBeDisplayed = (oneKind, oneItem) => {
  return oneKind === "peJob" && oneItem?.url;
};

export const buttonPRDVShouldBeDisplayed = (oneItem) => {
  return oneItem?.prdvUrl;
};

export const buildPrdvButton = (training) => {
  return (
    <div
      className="widget-prdv gtmPrdv"
      data-referrer="lba"
      data-id-cle-ministere-educatif={training.cleMinistereEducatif}
      data-id-rco-formation={training.idRcoFormation}
    >
      <ExternalLink className="gtmPrdv" url={training.prdvUrl} title="Prendre rendez-vous" />
    </div>
  );
};
