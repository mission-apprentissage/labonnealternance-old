import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { useDropzone } from "react-dropzone";
import dropzoneIco from "public/images/icons/candidature_file_upload.svg";

const CandidatureSpontaneeFileDropzone = ({ setFileValue }) => {
  const [fileData, setFileData] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [showUnacceptedFileMessage, setShowUnacceptedFileMessages] = useState(false);

  const onDrop = (files) => {
    console.log("HEY ha ", files);
    const reader = new FileReader();
    const fileName = null;

    reader.onload = (e) => {
      console.log("HEY ho ", e.target);
      setFileData({ fileName, fileContent: e.target.result });
      setFileValue(fileData);
    };

    reader.onloadstart = (e) => {
      console.log("DEBUT");
      setFileLoading(true);
      setShowUnacceptedFileMessages(false);
    };

    reader.onloadend = (e) => {
      console.log("FINI");
      setTimeout(() => {
        setFileLoading(false);
      }, 2500);
    };

    if (files.length) {
      fileName = files[0].name;
      console.log(fileName);
      reader.readAsDataURL(files[0]);
    } else {
      setShowUnacceptedFileMessages(true);
      setFileData(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: ".docx,.pdf", maxFiles: 1 });

  return fileLoading ? (
    <div className="c-candidature-filedropzone_loading">
      <Spinner /> Chargement du fichier en cours
    </div>
  ) : (
    <div className="c-candidature-filedropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Déposez le fichier ici</p>
      ) : (
        <div className="c-candidature-filedropzone-instruction">

          <div className="float-left mt-2 mr-2">
            <img alt="" src={dropzoneIco} />{" "}
          </div>
          <div className="c-candidature-filedropzone-instruction_title">Chargez votre CV ou déposez le ici</div>
          <div className="c-candidature-filedropzone-instruction_sub">
            Le CV doit être au format PDF ou DOCX et ne doit pas dépasser 3 Mo
          </div>
        </div>
      )}
      {showUnacceptedFileMessage ? "FIchier pas bon, max 1, taille <3mo, docx ou pdf" : ""}
      Afficher le fichier actuellement uploadé (nom + icône) avec handle de suppression
      <br />
      Charter le composant
      <br />
      Faire transiter la data vers le serveur
      <br />
      Ajouter la PJ en copie des emails AR et vers recruteur
      <br />
      Animation LOADING + gel bouton pendant l'upload
      <br />
    </div>
  );
};

export default CandidatureSpontaneeFileDropzone;
