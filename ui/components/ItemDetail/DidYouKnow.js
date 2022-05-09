import TagCandidatureSpontanee from "../../components/ItemDetail/TagCandidatureSpontanee.js";

const DidYouKnow = ({ item }) => {

  
  return (
    <>
        <div className="c-detail-body c-locationdetail mt-4">
          <h2 className="c-locationdetail-title mt-2">
            Le saviez-vous ?
          </h2>
          <p className="c-didyouknow-paragraph">
            Diversifiez vos démarches en envoyant aussi des candidatures spontanées aux entreprises qui n'ont pas diffusé d'offre! Repérez les tags suivants dans la liste de résultats 
          </p>
          <p>
            <TagCandidatureSpontanee/>
          </p>
          <p className="mb-3">
            <span className="d-block">Un employeur vous a proposé un entretien ?</span>
            <span className="d-block">
              <strong><u>On vous donne des conseils pour vous aider à le preparer.</u></strong>  
            </span>
          </p>
        </div>
    </>
  );
};

export default DidYouKnow;
