import React, { useState } from "react";
import FileDropzone from "components/FileDropzone";

const CandidatureSpontaneeFileDropzone = ({ setFileValue }) => {
  const [fileData, setFileData] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [showUnacceptedFileMessage, setShowUnacceptedFileMessages] = useState(false);

  const onDrop = (files) => {
    console.log("HEY ha ", files);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("HEY ho ", e.target);
      setFileData(e.target.result);
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
      console.log(files[0].name);
      reader.readAsDataURL(files[0]);
    } else {
      setShowUnacceptedFileMessages(true);
      setFileData(null);
    }
  };

  return (
    <>
      {fileLoading ? "Ca charge" : "NOT LOADING"}
      <FileDropzone accept=".pdf,.docx" onDrop={onDrop} maxFiles={1}>
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
      </FileDropzone>
    </>
  );
};

export default CandidatureSpontaneeFileDropzone;
