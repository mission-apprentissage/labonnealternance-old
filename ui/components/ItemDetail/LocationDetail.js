
const LocationDetail = ({ item }) => {

  const kind = item?.ideaType;
  let contactPhone = item?.contact?.phone;
  const title = kind === "formation" ? "Quelques informations sur le centre de formation" : "Quelques informations sur l'établissement"
  return (
    <>
      <div className="c-detail-body c-locationdetail mt-4">
        <div className="c-locationdetail-title">
          {title}
        </div>
        <div className="c-locationdetail-address">
          2 rue truc
        </div>
        <div className="c-locationdetail-distance">
          2km du lieu de recherche
        </div>
        <div>
          Obtenir l'itinéraire
        </div>
        <div>
          En savoir plus
        </div>
      </div>
    </>
  );
};

export default LocationDetail;
